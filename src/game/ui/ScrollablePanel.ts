import { Scene, GameObjects } from 'phaser';
import { ScrollablePanel, FixWidthSizer } from 'phaser3-rex-plugins/templates/ui/ui-components';

export type ButtonConfigType = {
  width: number;
  height: number;
}

export class ScrollablePanelUI {
  scene: Scene;
  panel: ScrollablePanel;
  items: Array<any> = [];
  buttonSizer: FixWidthSizer;
  buttonConfig: ButtonConfigType = {
    width: 100,
    height: 40
  };

  constructor(scene: Scene, x: number, y: number, width: number, height: number, buttonConfig?: ButtonConfigType) {
    this.scene = scene;

    this.createPanel(x, y, width, height)

    buttonConfig && (this.buttonConfig = buttonConfig)
  }

  private createPanel(x: number, y: number, width: number, height: number) {
    this.panel = this.scene.rexUI.add.scrollablePanel({
      x,
      y,
      width,
      height,
      scrollMode: 0,
      background: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 8, 0xff0ff0, 0.4),
      panel: {
        child: this.createGrid(),
        mask: true
      },
      mouseWheelScroller: {
        focus: false,
        speed: 0.4
      }
    })
    .setOrigin(0)
    .layout()
  }

  private createGrid() {
    const sizer: FixWidthSizer = this.scene.rexUI.add.fixWidthSizer({
      space: {
        left: 8,
        right: 8,
        top: 8,
        bottom: 8,
        item: 8,
        line: 8
      }
    })

    return sizer
  }

  createGridButton(item: any) {
    const label = this.scene.rexUI.add.label({
      orientation: 'x',
      width: this.buttonConfig.width,
      height: this.buttonConfig.height,
      background: this.scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, 0xaa0000),
      text: this.scene.add.text(0, 0, item.label, { fontSize: '16px', color: '#fff' }),
      align: 'left',
      space: {
          left: 20,
          right: 20
      },
      wrapText: true,
    })

    label.setInteractive({ useHandCursor: true })

    return label
  }

  addItem(item: any, callback?: () => void) {
    this.items.push(item);

    const button = this.createGridButton(item)

    callback && button.on('pointerdown', callback)

    const panel = this.panel.getElement('panel') as FixWidthSizer
    panel.add(button)
  }

  removeItem(item: any) {
    this.items.splice(this.items.indexOf(item), 1);

    const panel = this.panel.getElement('panel') as FixWidthSizer
    const button = panel.getChildren().find((child: any) => child.text === item.label) as GameObjects.GameObject

    panel.remove(button, true)
    panel.layout()
  }

  getItem(item: any) {
    return this.items.find((i: any) => i === item);
  }

  getItems() {
    return this.items;
  }
}
