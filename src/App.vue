<script setup lang="ts">
import { Scene } from "phaser";
import PhaserGame from "./PhaserGame.vue";

// Event emitted from the PhaserGame component
const currentScene = (scene: Scene) => {
  console.warn("⚠️ Changed scene");
  console.log(scene);
  console.log("------");
  console.log("");
};
</script>

<template>
  <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
</template>
