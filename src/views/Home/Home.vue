<template>
    <v-row>
        <v-slide-x-transition leave-absolute>
            <v-col class="col-search" v-if="searchOpened" :cols="9">
                <Search @search="search" @close="closeSearch()" :criterias.sync="criterias" />
            </v-col>
        </v-slide-x-transition>

        <v-col class="col-entry-list" key="col-entry-list" :cols="3">
            <v-slide-y-transition>
                <v-btn
                    depressed
                    block
                    color="primary"
                    @click="openSearch()"
                    class="btn-add mb-3"
                    v-if="!searchOpened"
                >
                    <v-icon left>mdi-magnify</v-icon>
                    {{
                        criterias.isDefault()
                            ? $t('itemList.actions.openSearch')
                            : $t('itemList.actions.editSearch')
                    }}
                </v-btn>
            </v-slide-y-transition>

            <ItemList
                :items="itemList"
                :selected="selectedItem"
                :loading="listLoading"
                @select="selectEntry"
            />

            <v-slide-y-reverse-transition>
                <v-btn
                    depressed
                    block
                    color="primary"
                    @click="addEntry()"
                    class="btn-add mt-3"
                    v-if="!searchOpened"
                >
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('itemList.actions.addEntry') }}
                </v-btn>
            </v-slide-y-reverse-transition>
        </v-col>

        <v-slide-x-reverse-transition>
            <v-col class="col-editor" key="col-editor" v-if="!searchOpened" :cols="9">
                <Edition />
                <div class="empty-zone" v-if="!currentEntry">
                    <div class="ma-auto d-flex flex-column align-center">
                        <v-icon color="primary" size="200">mdi-notebook</v-icon>
                        <h1 class="display-2 font-weight-light primary--text">Workbook</h1>
                    </div>
                </div>
            </v-col>
        </v-slide-x-reverse-transition>
    </v-row>
</template>
<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
