<template>
    <div id="ItemsSelector">
        <v-container class="pa-0">
            <v-row align="center" justify="start" class="px-2">
                <v-col v-for="(selection, i) in selectedItems" :key="selection" class="shrink pa-1">
                    <v-chip close @click:close="selectedItems.splice(i, 1)">
                        {{ selection }}
                    </v-chip>
                </v-col>

                <v-col v-if="!allSelected" cols="12" class="px-1">
                    <v-text-field v-model="search" outlined dense clearable hide-details>
                        <template #label>
                            <v-icon>mdi-magnify</v-icon>
                            {{ $t('itemsSelector.search') }}
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>

        <v-list v-if="!allSelected" dense>
            <template v-for="(item, i) in filteredItems">
                <v-list-item
                    v-if="!selectedItems.includes(item)"
                    :key="`${i}-${item}`"
                    @click="selectItem(item)"
                >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                    <v-list-item-action v-if="deletion">
                        <v-btn icon x-small @click.native.stop="deleteItem(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-list>

        <v-container v-if="creation" class="pb-0 px-0">
            <v-text-field
                v-model="newItem"
                outlined
                dense
                clearable
                hide-details
                append-outer-icon="mdi-tag-plus"
                @click:append-outer="addItem"
                @keypress.enter="addItem"
            >
                <template #label>
                    {{ $t('itemsSelector.add') }}
                </template>
            </v-text-field>
        </v-container>
    </div>
</template>
<style lang="scss" src="./ItemsSelector.scss"></style>
<script lang="ts" src="./ItemsSelector.ts"></script>
