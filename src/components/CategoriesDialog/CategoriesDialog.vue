<template>
    <v-dialog v-model="value_" max-width="500">
      <v-card>

        <ItemsSelector
          :items="items"
          :selectedItems.sync="selectedItems"
          :creation="true"
          :deletion="true"
        />  

        <v-divider />

        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn 
            depressed 
            color="error" 
            outlined
            @click="onCancel()">
            {{$t('edition.actions.categories.cancel')}}
          </v-btn>

          <v-btn 
            depressed 
            color="primary"
            @click="onConfirm()">
            {{$t('edition.actions.categories.confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<style lang="scss" src="./CategoriesDialog.scss"></style>
<script lang="ts" src="./CategoriesDialog.ts"></script>
