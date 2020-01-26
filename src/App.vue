<template>
    <v-app>
        <v-app-bar app dense color="primary" dark>
            <v-toolbar-title>
                <v-icon left>mdi-notebook</v-icon>
                Workbook
            </v-toolbar-title>
            <v-spacer />
            <template v-if="isUserLoggedIn()">
                <v-btn icon :to="{ name: 'settings' }">
                    <v-icon>mdi-settings</v-icon>
                </v-btn>
                <v-btn icon :loading="saveSpinner" @click="save">
                    <v-icon>{{ savePending ? 'mdi-content-save-alert' : 'mdi-content-save' }}</v-icon>
                </v-btn>
            </template>
        </v-app-bar>

        <v-content>
            <v-container>
                <transition name="fade" mode="out-in">
                    <router-view :key="$route.fullPath"></router-view>
                </transition>
            </v-container>
        </v-content>

        <v-overlay :value="showLoadingSpinner" color="primary">
            <v-progress-circular indeterminate color="white"></v-progress-circular>
        </v-overlay>
    </v-app>
</template>
<style lang="scss" src="./App.scss" scoped></style>
<style lang="scss">
html {
    overflow-y: hidden !important;
}
</style>
<script lang="ts" src="./App.ts"></script>
