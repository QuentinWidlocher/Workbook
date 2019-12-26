<template>
  <div id="Editor" v-if="entry">
    <v-text-field
      :label="$t('editor.title.label')"
      v-model="entry.title"
    ></v-text-field>
    <v-textarea
      :label="$t('editor.description.label')"
      auto-grow
      filled
      v-model="entry.description"
    ></v-textarea>
    <v-btn
      color="error"
      depressed
      outlined
      @click="deleteDialog = true"
    >{{$t('editor.actions.delete.button')}}</v-btn>

    <v-dialog
      v-model="deleteDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="error white--text">{{$t('editor.actions.delete.title')}}</v-card-title>
        <v-card-text class="mt-5">
          <p v-html="$t('editor.actions.delete.description', {title: entry.title})"></p>
        </v-card-text>
        <v-card-actions>

          <v-btn 
            depressed
            outlined
            color="error" 
            class="mr-auto"
            @click="deleteEntry"
          >{{
            $t('editor.actions.delete.confirm')
          }}</v-btn>

          <v-btn 
            depressed
            color="error"
            @click="deleteDialog = false">{{
              $t('editor.actions.delete.cancel')
          }}</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<style lang="scss" src="./Editor.scss" scoped></style>
<script lang="ts" src="./Editor.ts"></script>
