<template>
    <div id="ItemList">
        <v-list dense shaped ref="list">
            <template v-for="(item, index) in items">
                <v-list-item
                    v-if="!item.isSubheader"
                    color="primary"
                    :key="`${index}-${item.name}`"
                    :input-value="index == selected"
                    @click="selectItem(index)"
                >
                    <v-list-item-content>
                        <v-list-item-title :class="{ dark: $vuetify.theme.dark }"
                            >{{
                                item.name
                                    ? item.name
                                    : item.entry.id
                                    ? $t('itemList.labels.emptyEntryTitle')
                                    : $t('itemList.labels.newEntry')
                            }}
                            <v-icon small v-if="!item.entry.id && !item.name">mdi-alert-decagram</v-icon>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-subheader v-else :key="`${index}-${item.name}`" class="ml-1 text-uppercase">{{
                    item.name
                }}</v-subheader>
            </template>

            <v-skeleton-loader v-if="loading" type="list-item@11"></v-skeleton-loader>
        </v-list>
    </div>
</template>
<style lang="scss" src="./ItemList.scss" scoped></style>
<script lang="ts" src="./ItemList.ts"></script>
