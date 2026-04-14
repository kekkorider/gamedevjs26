import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';
import { Button } from '../ui/Button';

export class MainMenu extends Scene {
    logo: GameObjects.Image;
    button: GameObjects.Text;

    constructor () {
        super('MainMenu');
    }

    create () {
        this.logo = this.add.image(this.scale.width / 2, 300, 'logo').setDepth(100);

        this.button = new Button(
            this,
            this.scale.width / 2,
            this.scale.height / 2 + 30,
            'Start Game',
            this.changeScene.bind(this)
        );

        EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
    }

    changeScene() {
        this.scene.start('Game');
    }
}
