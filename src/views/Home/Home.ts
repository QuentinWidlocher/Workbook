import { Component, Vue, Watch } from 'vue-property-decorator';
import Entry from '@/models/entry';
import Edition from '@/components/Edition/Edition.vue';
import ItemList from '@/components/ItemList/ItemList.vue';
import { entriesService as entries, entriesService } from '@/services/entries';
import { globalVariables } from '@/services/globalVariables';
import _ from 'lodash';
import { savingSpinner } from '@/services/savingSpinner';
import { State, Getter } from 'vuex-class';
import { State2Way } from 'vuex-class-state2way';
import Search from '@/components/Search/Search.vue';
import SearchCriterias from '@/models/searchCriterias';
import { loadingSpinner } from '@/services/loadingSpinner';
import { categoriesService } from '@/services/categories';
import EntryMapper from '@/mappers/EntryMapper';
import ListItem from '@/models/listItem';

@Component({
    components: {
        Edition,
        ItemList,
        Search,
    },
})
export default class Home extends Vue {
    originalCurrentEntry!: Entry; // to compare changes

    @State2Way('changeEntryIndex', 'currentEntryIndex') currentEntryIndex!: number;
    @State2Way('setEntries', 'entries') entries!: Entry[];
    @State originalEntries!: Entry[];
    @Getter currentEntry!: Entry;

    itemList: ListItem[] = [];
    selectedItem: number = 0;

    listLoading: boolean = true;

    criterias: SearchCriterias = new SearchCriterias();
    searchOpened: boolean = false;

    autosaveInterval?: number;

    private mounted() {
        loadingSpinner.startSpinning();
        this.listLoading = true;

        entries
            .initializeEntries(false)
            .catch((e) => {
                if (e.fatal) {
                    console.error(e.text);
                }
            })
            .finally(() => {
                return categoriesService.initializeCategories();
            })
            .then(() => {
                this.itemList = EntryMapper.toList(this.entries);
                this.itemList = this.criterias.doSort(this.itemList);
                this.itemList = this.criterias.doGroup(this.itemList);

                loadingSpinner.stopSpinning();
                this.listLoading = false;
            });
        this.initializeAutosaving();
    }

    private async beforeDestroy() {
        try {
            if (!this.currentEntry.id) {
                if (!this.currentEntry.title) {
                    await this.cancelCreation();
                } else {
                    if (this.originalCurrentEntry) {
                        await entriesService.saveCurrentEntry(this.originalCurrentEntry);
                    }
                }
            }
        } catch (e) {
            if (e.fatal) {
                console.error(e.text);
            }
        }

        window.clearInterval(this.autosaveInterval);
    }

    private addEntry() {
        // We prevent the user from adding the entry if he's already creating one
        if (this.currentEntry && !this.currentEntry.id && !this.currentEntry.title) {
            return;
        }

        // We add an empty entry
        entries.addEntry(Entry.newEmpty());
        this.itemList.push(new ListItem(undefined, false, undefined, this.entries.length - 1));

        if (this.currentEntryIndex < 0) this.currentEntryIndex = 0;

        // We select it
        this.selectEntry(this.itemList.length - 1);
    }

    private openSearch() {
        this.currentEntryIndex = -1;
        this.searchOpened = true;
    }

    private closeSearch() {
        this.searchOpened = false;
        if (this.entries.length === 1) {
            this.selectEntryEdition(0);
        }
    }

    private selectEntry(index: number) {
        if (this.searchOpened) {
            this.selectEntrySearch(index);
        } else {
            this.selectEntryEdition(index);
        }
    }

    private selectEntrySearch(index: number) {
        this.searchOpened = false;
        this.currentEntryIndex = index;
    }

    private selectEntryEdition(itemIndex: number) {
        // We get the index of the entry in the **entries** list, not the display one
        const entryIndex = this.itemList[itemIndex].entryIndex;

        if (entryIndex === this.currentEntryIndex) return;

        if (this.currentEntryIndex < 0) {
            this.currentEntryIndex = itemIndex;
        }

        if (!this.currentEntry) {
            this.currentEntryIndex = entryIndex;
            this.selectedItem = itemIndex;
            this.originalCurrentEntry = _.cloneDeep(this.currentEntry);
            return;
        }

        if (!this.currentEntry.id) {
            // if the entry has just been added...
            if (!this.currentEntry.title) {
                // ... and is empty

                // We cancel the creation of the entry
                this.cancelCreation();
            } else {
                // ...and is correct

                // We create the entry
                entries.createEntry(this.currentEntry);
                this.itemList = this.criterias.doSort(this.itemList);
            }
        } else {
            // If the entry already existed...

            if (!this.currentEntry.title) {
                // ... and is empty

                // We prevent the user from opening another one
                return;
            } else {
                // ... and is correct

                // We save the current entry if it's already been loaded
                if (this.originalCurrentEntry) {
                    entries.saveCurrentEntry(this.originalCurrentEntry).catch((e) => {
                        if (e.fatal) {
                            console.error(e.text);
                        }
                    });
                }
            }
        }

        this.currentEntryIndex = entryIndex;
        this.selectedItem = itemIndex;
        this.originalCurrentEntry = _.cloneDeep(this.currentEntry);
    }

    private cancelCreation() {
        return entries.deleteEntry(this.currentEntry);
    }

    private initializeAutosaving() {
        window.addEventListener('beforeunload', (e: Event) => {
            entries.saveCurrentEntry(this.originalCurrentEntry).catch((e) => {
                if (e.fatal) {
                    console.error(e.text);
                }
            });
        });

        this.autosaveInterval = window.setInterval(() => {
            if (globalVariables.autosave.booleanValue) {
                entries
                    .saveCurrentEntry(this.originalCurrentEntry)
                    .then(() => {
                        // The new original entry is the now edited current entry
                        this.originalCurrentEntry = _.cloneDeep(this.currentEntry);
                        this.search(this.criterias);
                    })
                    .catch((e) => {
                        if (e.fatal) {
                            console.error(e.text);
                        }
                    });
            }
        }, globalVariables.autosaveInterval.numberValue);
    }

    @Watch('currentEntry.description')
    @Watch('currentEntry.title')
    @Watch('currentEntry.categories.length')
    private onCurrentEntryChange() {
        if (
            this.currentEntry &&
            this.originalCurrentEntry &&
            !_.isEqual(_.cloneDeep(this.currentEntry), this.originalCurrentEntry)
        ) {
            savingSpinner.pending = true;
            this.onEntriesChange();
        }
    }

    @Watch('entries.length')
    private onEntriesChange() {
        this.search(this.criterias);
    }

    private search(criterias: SearchCriterias) {
        this.itemList = EntryMapper.toList(this.entries);
        this.itemList = criterias.filter(this.itemList);
        this.itemList = criterias.doSort(this.itemList);
        this.itemList = criterias.doGroup(this.itemList);
        this.selectedItem = this.itemList.findIndex((i) => i.entry === this.currentEntry);
    }
}
