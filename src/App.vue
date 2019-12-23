<template>
  <v-app>
    <router-view :key="$route.fullPath"></router-view>
  </v-app>
</template>
<style lang="scss" src="./App.scss" scoped></style>
<script lang="ts" src="./App.ts"></script>
