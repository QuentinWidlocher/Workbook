<template>
    <v-container>
        <v-row>
        <v-col :cols="3">
            <EntryList
                :entries="entries"
                :currentEntryIndex.sync="currentEntryIndex"
            ></EntryList>
        </v-col>
        
        <v-col :cols="9">
            <Editor :entry="entries[currentEntryIndex]"></Editor>
        </v-col>

    </v-row>

    </v-container>
</template>
<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
