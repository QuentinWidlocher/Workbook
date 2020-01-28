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
                    <v-list-item-title :class="{ dark: $vuetify.theme.dark }"
                        >{{
                            entry.title
                                ? entry.title
                                : entry.id
                                ? $t('entryList.labels.emptyEntryTitle')
                                : $t('entryList.labels.newEntry')
                        }}
                        <v-icon small v-if="!entry.id && !entry.title">mdi-alert-decagram</v-icon>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-skeleton-loader v-if="loading" type="list-item@10"></v-skeleton-loader>
        </v-list>
    </div>
</template>
<style lang="scss" src="./EntryList.scss" scoped></style>
<script lang="ts" src="./EntryList.ts"></script>
