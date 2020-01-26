<template>
    <div id="Login">
        <form v-on:submit.prevent="login">
            <h1>{{ $t('login.title') }}</h1>

            <v-text-field v-model="username" :label="$t('login.email')"></v-text-field>

            <v-text-field
                v-model="password"
                :label="$t('login.password')"
                autocomplete="current-password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
            ></v-text-field>

            <div class="bottom-row">
                <v-alert dense outlined type="error" v-if="errorMessage">
                    {{ $t(errorMessage) }}
                </v-alert>
                <v-btn depressed type="submit" :loading="loading" color="primary">
                    <v-icon left>mdi-account-arrow-right</v-icon> {{ $t('login.login') }}
                </v-btn>
            </div>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped src="./Login.scss"></style>
