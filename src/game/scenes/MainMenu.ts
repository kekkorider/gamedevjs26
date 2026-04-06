import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    button: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(this.scale.width / 2, 384, 'background');

        this.logo = this.add.image(this.scale.width / 2, 300, 'logo').setDepth(100);

        this.button = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 30,
            'Start Game',
            {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                align: 'center',
                backgroundColor: '#000000',
            }
        )
        .setOrigin(0.5)
        .setDepth(100)
        .setPadding(16);

        this.button.setInteractive({ useHandCursor: true });

        this.button.on('pointerdown', () => {
            this.changeScene();
        })

        EventBus.emit('current-scene-ready', this);
    }

    changeScene (){
        this.scene.start('Game');
    }
}
