<template>
  <v-row>
    <v-col class="col-entry-list" :cols="3">
      <EntryList :entries="entries" @select="selectEntry"/>
      <v-btn 
        depressed
        block
        color="primary" 
        @click="addEntry()" 
        class="btn-add mt-3"
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t("entryList.actions.addEntry") }}
      </v-btn>

    </v-col>

    <v-col class="col-editor" :cols="9">
      <Edition></Edition>
      <div class="empty-zone" v-if="!currentEntry">
        <div class="ma-auto d-flex flex-column align-center">
          <v-icon color="primary" size="200">mdi-notebook</v-icon>
          <h1 class="display-2 font-weight-light primary--text">Workbook</h1>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
