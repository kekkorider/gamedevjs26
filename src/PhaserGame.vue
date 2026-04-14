<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { EventBus } from "./game/EventBus";
import { EVENTS } from "./game/Constants";
import StartGame from "./game/main";
import * as Phaser from "phaser";

// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits([EVENTS.CURRENT_ACTIVE_SCENE]);

onMounted(() => {
  game.value = StartGame("wavedash-target");

  EventBus.on(EVENTS.CURRENT_SCENE_READY, (scene_instance: Phaser.Scene) => {
    emit(EVENTS.CURRENT_ACTIVE_SCENE, scene_instance);

    scene.value = scene_instance;
  });
});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
    game.value = null;
  }
});

defineExpose({ scene, game });
</script>

<template>
  <div id="wavedash-target"></div>
</template>
