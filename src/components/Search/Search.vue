<template>
    <div id="Search">
        <v-row class="align-content-start">
            <v-col :cols="12">
                <v-text-field
                    outlined
                    clearable
                    dense
                    hide-details
                    v-model="criterias.terms"
                    @keypress.enter="search(true)"
                >
                    <template #label>
                        <v-icon>mdi-magnify</v-icon>
                        {{$t('search.search')}}
                    </template>
                </v-text-field>
            </v-col>

            <v-col :cols="6">
                <v-checkbox
                    color="primary"
                    class="mt-0"
                    hide-details
                    :label="$t('search.criterias.searchIn.title')"
                    v-model="criterias.searchInTitle"
                />
            </v-col>
            <v-col :cols="6">
                <v-checkbox
                    color="primary"
                    class="mt-0"
                    hide-details
                    :label="$t('search.criterias.searchIn.description')"
                    v-model="criterias.searchInDescription"
                />
            </v-col>

            <v-col :cols="6">
                <v-checkbox
                    color="primary"
                    class="mt-0"
                    hide-details
                    :label="$t('search.criterias.matchCase')"
                    v-model="criterias.matchCase"
                />
            </v-col>

            <v-col v-if="false" :cols="12">
                <v-expansion-panels flat>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <div>
                                <v-icon left>mdi-calendar-search</v-icon>
                                {{$t('search.criterias.dates.searchByDates')}}
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                
                                <v-col :cols="6">
                                    <v-menu
                                        v-model="showCreationDateAfter"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="criterias.creationDateAfter"
                                            :label="$t('search.criterias.dates.creationDateAfter')"
                                            prepend-icon="mdi-calendar-arrow-left"
                                            readonly
                                            clearable
                                            :hint="$t('search.criterias.dates.format')"
                                            persistent-hint
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="criterias.creationDateAfter" 
                                            @input="showCreationDateAfter = false"
                                            color="primary"
                                        />
                                    </v-menu>
                                </v-col>

                                <v-col :cols="6">
                                    <v-menu
                                        v-model="showCreationDateBefore"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="criterias.creationDateBefore"
                                            :label="$t('search.criterias.dates.creationDateBefore')"
                                            prepend-icon="mdi-calendar-arrow-right"
                                            readonly
                                            clearable
                                            :hint="$t('search.criterias.dates.format')"
                                            persistent-hint
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="criterias.creationDateBefore" 
                                            @input="showCreationDateBefore = false"
                                            color="primary"
                                        />
                                    </v-menu>
                                </v-col>

                                <v-col :cols="6">
                                    <v-menu
                                        v-model="showEditionDateAfter"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="criterias.editionDateAfter"
                                            :label="$t('search.criterias.dates.editionDateAfter')"
                                            prepend-icon="mdi-calendar-arrow-left"
                                            readonly
                                            :hint="$t('search.criterias.dates.format')"
                                            persistent-hint
                                            clearable
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="criterias.editionDateAfter" 
                                            @input="showEditionDateAfter = false"
                                            color="primary"
                                        />
                                    </v-menu>
                                </v-col>

                                <v-col :cols="6">
                                    <v-menu
                                        v-model="showEditionDateBefore"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="criterias.editionDateBefore"
                                            :label="$t('search.criterias.dates.editionDateBefore')"
                                            prepend-icon="mdi-calendar-arrow-right"
                                            readonly
                                            clearable
                                            :hint="$t('search.criterias.dates.format')"
                                            persistent-hint
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker 
                                            v-model="criterias.editionDateBefore" 
                                            @input="showEditionDateBefore = false"
                                            color="primary"
                                        />
                                    </v-menu>
                                </v-col>

                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>

            <v-col :cols="6">
            </v-col>
            <v-col :cols="6">
                <v-select
                    :label="$t('search.sorts.sort')"
                    prepend-inner-icon="mdi-sort"
                    outlined
                    dense
                    @change="sortSelectChange"
                    v-model="criterias.sort"
                    :items="sortValues"
                />
            </v-col>

        </v-row>
        <div class="d-flex justify-end">
            <div class="mt-auto">
                <v-btn
                    color="error"
                    class="mr-2"
                    outlined
                    depressed
                    @click="clearSearch"
                >
                    <v-icon left>mdi-close-circle</v-icon>
                    {{$t('search.actions.clearSearch')}}
                </v-btn>
                <v-btn
                    color="primary"
                    depressed
                    @click="search(false)"
                >
                    <v-icon left>mdi-magnify</v-icon>
                    {{$t('search.actions.search')}}
                </v-btn>
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="./Search.scss" scoped></style>
<script lang="ts" src="./Search.ts"></script>
