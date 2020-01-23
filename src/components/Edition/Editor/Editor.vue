<template>
    <div id="Editor">
        <v-card>
            <EditorMenuBar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
                <v-toolbar
                    flat
                    dense
                    :class="{ 'grey lighten-4': !$vuetify.theme.dark, 'grey darken-2': $vuetify.theme.dark }"
                >
                    <component
                        v-for="(button, i) in topRowButtons"
                        :key="`btn-${i}-${button}`"
                        :is="button + 'Action'"
                        :commands="commands"
                        :isActive="isActive"
                        :getMarkAttrs="getMarkAttrs"
                    />

                    <v-spacer />

                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn icon small @click="extendedToolbar = !extendedToolbar" v-on="on">
                                <v-icon>mdi-chevron-{{ extendedToolbar ? 'up' : 'down' }}</v-icon>
                            </v-btn>
                        </template>

                        <span>{{
                            $t('edition.editor.actions.see' + (extendedToolbar ? 'Less' : 'More'))
                        }}</span>
                    </v-tooltip>

                    <template v-if="extendedToolbar" #extension>
                        <component
                            v-for="(button, i) in bottomRowButtons"
                            :key="`btn-${i}-${button}`"
                            :is="button + 'Action'"
                            :commands="commands"
                            :isActive="isActive"
                            :getMarkAttrs="getMarkAttrs"
                        />
                    </template>
                </v-toolbar>
            </EditorMenuBar>

            <v-card-text class="v-card__text" :style="extendedToolbar ? '--extended: 2' : '--extended: 1'">
                <EditorContent id="content" :editor="editor"></EditorContent>
            </v-card-text>
        </v-card>
    </div>
</template>
<style lang="scss" src="./Editor.scss"></style>
<script lang="ts" src="./Editor.ts"></script>
