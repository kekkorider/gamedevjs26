<script setup lang="ts">
import { Scene } from "phaser";
import PhaserGame from "./PhaserGame.vue";

// Event emitted from the PhaserGame component
const currentScene = (scene: Scene) => {
    // Do stuff
};
</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
</template>
