<template>
  <div id="Edition" v-if="entry">
    <v-text-field
      class="field-title"
      :label="$t('edition.title.label')"
      v-model="entry.title"
    ></v-text-field>

    <Editor class="editor" v-model="entry.description" />

    <div class="mt-3 d-flex justify-end">
      <v-btn color="error" depressed outlined @click="deleteDialog = true">{{
        $t("edition.actions.delete.button")
      }}</v-btn>
    </div>

    <DeleteDialog
      v-model="deleteDialog"
      :title="$t('edition.actions.delete.title')"
      :content="$t('edition.actions.delete.description', { title: entry.title })"
      :deleteButtonLabel="$t('edition.actions.delete.confirm')"
      :cancelButtonLabel="$t('edition.actions.delete.cancel')"
      @confirm="deleteEntry"
    ></DeleteDialog>

  </div>
</template>
<style lang="scss" src="./Edition.scss" scoped></style>
<script lang="ts" src="./Edition.ts"></script>
