import * as Phaser from 'phaser';

import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const baseConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    pixelArt: true,
    parent: 'wavedash-target',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

let rexUIPluginPromise: Promise<typeof Phaser.Plugins.ScenePlugin> | null = null;

const loadRexUIPlugin = async () => {
    if (!rexUIPluginPromise) {
        // rexUI expects a global Phaser symbol at module evaluation time.
        (globalThis as typeof globalThis & { Phaser?: typeof Phaser }).Phaser = Phaser;
        rexUIPluginPromise = import('phaser3-rex-plugins/templates/ui/ui-plugin.js')
            .then((module) => module.default as typeof Phaser.Plugins.ScenePlugin);
    }
    return rexUIPluginPromise;
};

const StartGame = async (parent: string) => {
    const RexUIPlugin = await loadRexUIPlugin();
    return new Phaser.Game({
        ...baseConfig,
        parent,
        plugins: {
            scene: [
                {
                    key: 'rexUI',
                    plugin: RexUIPlugin,
                    mapping: 'rexUI'
                }
            ]
        }
    });
};

export default StartGame;
