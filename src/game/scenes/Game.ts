import { EventBus } from '../EventBus';
import { Player } from '../gameObjects/Player';
import * as Phaser from 'phaser';

export class Game extends Phaser.Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    stars: Phaser.Physics.Arcade.Group;
    bombs: Phaser.Physics.Arcade.Group;
    player: Player;
    score: number = 0;
    scoreText: Phaser.GameObjects.Text;
    gameOver: boolean = false;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main as Phaser.Cameras.Scene2D.Camera;
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'sky');

        this.createLevel();
        this.createPlayer();
        this.createStars();
        this.createBombGroup();

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.player.update()
    }

    createLevel() {
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(this.scale.width / 2, this.scale.height - 40, 'ground').setScale(3).refreshBody();
        this.platforms.create(600, 550, 'ground');
        this.platforms.create(50, 450, 'ground');
        this.platforms.create(750, 400, 'ground');
    }

    createPlayer() {
        this.player = new Player(this, 300, 450);
        this.physics.add.collider(this.player, this.platforms);
    }

    createStars() {
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {
                x: 450,
                y: 650,
                stepX: 50
            }
        });

        this.stars.children.forEach(child => {
            (child as Phaser.Physics.Arcade.Sprite).body!.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.physics.add.collider(this.platforms, this.stars);
        this.physics.add.overlap(this.player, this.stars, this.collect, undefined, this);
    }

    createBombGroup() {
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
    }

    collect(player: Player, star: Phaser.Physics.Arcade.Sprite) {
        star.disableBody(true, true);

        this.scoreText.setText(`Score: ${++this.score}`);

        if(this.stars.countActive() === 0) {
            this.stars.children.forEach(child => {
                (child as Phaser.Physics.Arcade.Sprite).enableBody(true, child.x, 0, true, true);
            })

            const bombX = this.player.x < this.scale.width / 2 ?
                            Phaser.Math.Between(this.scale.width / 2, this.scale.width) :
                            Phaser.Math.Between(0, this.scale.width / 2);

            const bomb = this.bombs.create(bombX, 16, 'bomb');
            bomb.setBounce(1)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.setCollideWorldBounds(true);
        }
    }

    hitBomb(player: Player, bomb: Phaser.Physics.Arcade.Sprite) {
        this.physics.pause()
        this.player.setTint(0xff0000)
        this.player.anims.play('idle')
        this.gameOver = true
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}
