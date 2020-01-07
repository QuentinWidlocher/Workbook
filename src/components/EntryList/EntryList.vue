<template>
  <div id="EntryList">
    <v-list dense shaped>
      <v-list-item
        v-for="(entry, index) in entries"
        :key="`${index}-${entry.title}`"
        color="primary"
        :input-value="index == currentEntryIndex"
        @click="selectEntry(index)"
      >
        <v-list-item-content>
          <v-list-item-title>{{
            entry.title ?
              entry.title :
                entry.id ? 
                  $t("entryList.labels.emptyEntry") : 
                  $t("entryList.labels.newEntry")
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<style lang="scss" src="./EntryList.scss" scoped></style>
<script lang="ts" src="./EntryList.ts"></script>
