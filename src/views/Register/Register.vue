<template>
    <div id="Register">
        <div class="form-wrap mx-3">
            <v-form class="ma-auto" ref="form" v-model="valid">
                <h1 class="display-1 mb-4">{{ $t('register.title') }}</h1>

                <v-alert dense outlined type="error" v-if="errorMessage">
                    {{ $t(errorMessage) }}
                </v-alert>

                <v-text-field
                    v-model="username"
                    :label="$t('register.username')"
                    :rules="usernameRules"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :label="$t('register.email')"
                    :rules="emailRules"
                    type="email"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :label="$t('register.password')"
                    autocomplete="current-password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    @input="checkPasswordStrength"
                    required
                    :loading="password.length > 0"
                    class="mb-5"
                    @focus="requirementsMenu = true"
                    @blur="requirementsMenu = false"
                >
                    <template v-slot:progress>
                        <transition :name="'fade-transition'">
                            <v-progress-linear
                                :value="passwordStrength"
                                :color="passwordStrengthColor"
                                :indeterminate="false"
                                absolute
                            ></v-progress-linear>
                        </transition>
                    </template>
                </v-text-field>

                <transition name="slide-y-transition" mode="in-out">
                    <v-card class="pa-3 mb-5" v-if="requirementsMenu">
                        <span>{{ $t('register.requirements.title', { number: 3 }) }}</span>
                        <Requirement
                            v-for="(requirement, i) in passwordRequirements"
                            :key="`requirement-${i}-${requirement.label}`"
                            :condition="requirement.condition(password)"
                            :label="
                                $t('register.requirements.password.' + requirement.label, {
                                    number: requirement.param,
                                })
                            "
                        />
                    </v-card>
                </transition>

                <v-btn :loading="loading" type="button" block color="primary" class="mx-0" @click="register">
                    {{ $t('register.register') }}
                </v-btn>

                <v-btn
                    :loading="loading"
                    type="button"
                    block
                    outlined
                    color="primary"
                    :to="{ name: 'login' }"
                    class="mt-3"
                >
                    {{ $t('register.toLogin') }}
                </v-btn>
            </v-form>
        </div>
    </div>
</template>
<style lang="scss" scoped src="./Register.scss"></style>
<script lang="ts" src="./Register.ts"></script>
