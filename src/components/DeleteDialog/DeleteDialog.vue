<template>
    <v-dialog v-model="value_" max-width="500">
      <v-card>
        <v-card-title class="error white--text">
          <v-icon color="white" class="mr-3">{{ titleIcon }}</v-icon>{{ title }}
        </v-card-title>
        <v-card-text class="mt-5 pb-0">
          <p
            v-html="
              content
            "
          ></p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            depressed
            color="error"
            class="mr-auto"
            @click="onDeleteConfirm()"
          >
            <v-icon left>mdi-delete-forever</v-icon>
            {{ deleteButtonLabel }}
          </v-btn>

          <v-btn 
            depressed 
            color="error" 
            outlined
            @click="onCancel()">{{
            cancelButtonLabel
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<style lang="scss" src="./DeleteDialog.scss"></style>
<script lang="ts" src="./DeleteDialog.ts"></script>
