<template>
  <div></div>
</template>

<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user';
import {useRoute} from 'vue-router';

let $route = useRoute();

SET_TOKEN(JSON.stringify($route.query));
let html:any = document.querySelector('html');
html.style.display = 'none';
</script>

<style scoped></style>
