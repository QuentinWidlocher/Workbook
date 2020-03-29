<template>
    <div id="Edition" v-if="entry">
        <v-text-field
            class="field-title"
            :label="$t('edition.title.label')"
            v-model="entry.title"
        ></v-text-field>

        <Editor class="editor" v-model="entry.description" />

        <v-row class="mt-3 btn-line" dense justify="end">
            <v-col cols="auto">
                <v-btn color="error" depressed outlined @click="deleteDialog = true">{{
                    $t('edition.actions.delete.button')
                }}</v-btn>
            </v-col>
        </v-row>

        <DeleteDialog
            v-model="deleteDialog"
            :title="$t('edition.actions.delete.title')"
            :content="$t('edition.actions.delete.description', { title: entry.title })"
            :deleteButtonLabel="$t('edition.actions.delete.confirm')"
            :cancelButtonLabel="$t('edition.actions.delete.cancel')"
            @confirm="deleteEntry"
        />
    </div>
</template>
<style lang="scss" src="./Edition.scss" scoped></style>
<script lang="ts" src="./Edition.ts"></script>
