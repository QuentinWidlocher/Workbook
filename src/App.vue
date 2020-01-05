<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <v-toolbar-title>
        <v-icon left>mdi-notebook</v-icon>
        Workbook
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<style lang="scss" src="./App.scss" scoped></style>
<style lang="scss">
html {
  overflow-y: hidden !important;
}
</style>
<script lang="ts" src="./App.ts"></script>
