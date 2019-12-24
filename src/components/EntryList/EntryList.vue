<template>
    <v-list :dense="true" :shaped="true">
        <v-list-item-group>
            <v-list-item
                v-for="(entry, index) in entries"
                :key="entry.title"
                @click="selectEntry(index)"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ entry.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>
<style lang="scss" src="./EntryList.scss" scoped></style>
<script lang="ts" src="./EntryList.ts"></script>