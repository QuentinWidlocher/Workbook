<template>
    <div id="Settings">
        <h1 class="mb-2" v-if="userName">{{ $t('settings.welcome', { name: userName }) }}</h1>
        <v-expansion-panels flat>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <div>
                        <v-icon left>mdi-wrench</v-icon>
                        {{ $t('settings.general.label') }}
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-switch color="primary" :label="$t('settings.general.autosave')" v-model="autosave" />

                    <v-select
                        :label="$t('settings.general.language')"
                        outlined
                        dense
                        v-model="lang"
                        :items="availableLanguages"
                    />

                    <v-btn color="primary" depressed class="mr-3" @click="saveData">
                        {{ $t('settings.general.saveData') }}
                    </v-btn>

                    <input ref="fileInput" type="file" accept=".wrkbk" hidden @change="loadData" />

                    <v-btn
                        color="primary"
                        outlined
                        depressed
                        @click="openFileUpload"
                        :loading="loadDataLoading"
                    >
                        {{ $t('settings.general.loadData') }}
                    </v-btn>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>
                    <div>
                        <v-icon left>mdi-palette</v-icon>
                        {{ $t('settings.theme.label') }}
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-switch color="primary" :label="$t('settings.theme.darkMode')" v-model="darkMode" />

                    <v-label>{{ $t('settings.theme.themeColor') }}</v-label>
                    <v-color-picker
                        hide-canvas
                        hide-inputs
                        hide-mode-switch
                        show-swatches
                        :swatches="colors"
                        v-model="themeColor"
                    ></v-color-picker>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-row justify="end" class="mt-auto">
            <v-col cols="auto" class="mr-auto">
                <v-btn color="error" depressed outlined @click="disconnect">
                    {{ $t('settings.actions.disconnect') }}
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn color="error" depressed @click="clearPreferences">
                    {{ $t('settings.actions.clearPreferences') }}
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn color="primary" depressed :to="{ name: 'home' }">
                    {{ $t('settings.actions.goBack') }}
                </v-btn>
            </v-col>
        </v-row>

        <DeleteDialog
            v-model="deleteDialog.visible"
            :title="deleteDialog.title"
            :content="deleteDialog.content"
            :deleteButtonLabel="deleteDialog.deleteButtonLabel"
            :cancelButtonLabel="deleteDialog.cancelButtonLabel"
            @confirm="deleteDialog.confirm"
        />
        <v-snackbar v-model="deleteDialog.showConfirm" color="primary">
            {{ deleteDialog.confirmMessage }}
        </v-snackbar>
    </div>
</template>
<style lang="scss" src="./Settings.scss" scoped></style>
<script lang="ts" src="./Settings.ts"></script>
