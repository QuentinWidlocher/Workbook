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
        {{ $t("entryList.actions.addEntry") }}
      </v-btn>

    </v-col>

    <v-col class="col-editor" :cols="9">
      <Edition></Edition>
    </v-col>
  </v-row>
</template>
<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
