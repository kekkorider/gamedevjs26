import { Scene } from 'phaser';
import { ExpBar } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { EventBus } from '../EventBus';
import { EVENTS } from '../Constants';

export type ProgressAnimationCompletedEventType = {
  level: number;
  exp: number;
}

export class ResultBar {
    scene: Scene;
    bar: ExpBar;

    constructor(scene: Scene) {
      this.scene = scene;

      this.createBar()
    }

    private createBar() {
      const config: ExpBar.IConfig = {
        x: this.scene.scale.width * 0.5,
        y: this.scene.scale.height * 0.8,
        width: this.scene.scale.width - 40,
        height: 20,
        origin: 0.5,
        valueText: this.scene.add.text(0, 0, 'Result', { fontSize: '20px', color: '#fff' }),
        valueTextFormatCallback: (value: number) => {
          return `${Math.floor(value * 100)}%`;
        },
        bar: {
          barColor: 0x00ff00,
          trackColor: 0xffffff50,
          height: 12,
          valuechangeCallback: (value: number) => {
            // console.log(value);
          }
        },
        space: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
        align: {
          title: 'center',
        },
        levelCounter: {
          table: (level: number) => {
            return level
          },
          maxLevel: 1
        },
        easeDuration: 1000
      }

      this.bar = this.scene.rexUI.add.expBar(config)

      this.bar.on('levelup.complete', () => {
        const data: ProgressAnimationCompletedEventType = {
          level: this.bar.getLevel(),
          exp: this.bar.getExp()
        }

        EventBus.emit(EVENTS.PROGRESS_ANIMATION_COMPLETED, data);
      })

      this.bar.layout();
    }

    hide() {
      this.bar.setVisible(false);
    }

    show() {
      this.bar.setVisible(true);
    }

    gainExp(exp: number) {
      this.bar.gainExp(exp);
    }

    reset() {
      this.bar.resetExp(0);
    }

    getExp() {
      return this.bar.getExp();
    }

    getLevel() {
      return this.bar.getLevel();
    }
}
