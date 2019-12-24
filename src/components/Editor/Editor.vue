<template>
    <div id="Editor">
        <v-text-field 
            :label="$t('editor.title.label')"
            v-model="entry.title"
        ></v-text-field>
        <v-textarea
          :label="$t('editor.description.label')"
          :auto-grow="true"
          :filled="true"
          v-model="entry.description"
        ></v-textarea>
    </div>
</template>
<style lang="scss" src="./Editor.scss" scoped></style>
<script lang="ts" src="./Editor.ts"></script>
