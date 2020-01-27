<template>
    <div id="Login">
        <form v-on:submit.prevent="login(false)">
            <h1>{{ $t('login.title') }}</h1>

            <v-alert dense outlined type="error" v-if="errorMessage">
                {{ $t(errorMessage) }}
            </v-alert>

            <v-text-field v-model="username" :label="$t('login.email')"></v-text-field>

            <v-text-field
                v-model="password"
                :label="$t('login.password')"
                autocomplete="current-password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn depressed block type="submit" :loading="loading" color="primary">
                <v-icon left>mdi-account-arrow-right</v-icon>
                {{ $t('login.login') }}
            </v-btn>

            <v-divider class="my-3" />

            <h1>{{ $t('login.noAccount') }}</h1>

            <v-btn outlined block color="primary" @click="login(true)">
                <v-icon left>mdi-incognito</v-icon>
                {{ $t('login.loginAsAnon') }}
            </v-btn>

            <v-btn outlined block color="primary" :to="{ name: 'register' }" class="mt-3">
                {{ $t('login.toRegister') }}
            </v-btn>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped src="./Login.scss"></style>
