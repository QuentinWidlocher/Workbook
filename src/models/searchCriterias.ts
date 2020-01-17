import Entry from './entry';
import { globalVariables } from '@/services/globalVariables';

export default class SearchCriterias {
    terms?: string;
    matchCase: boolean = false;
    searchInTitle: boolean = true;
    searchInDescription: boolean = false;
    editionDateBefore?: Date;
    editionDateAfter?: Date;
    creationDateBefore?: Date;
    creationDateAfter?: Date;
    matchCategories?: string[];

    sort: string = globalVariables.sort.value;

    public isDefault() {
        return !this.terms &&
        !this.matchCase &&
        this.searchInTitle &&
        !this.searchInDescription &&
        !this.editionDateBefore && !this.editionDateAfter &&
        !this.creationDateBefore && !this.creationDateAfter &&
        !this.matchCategories
    }

    public setToDefault() {
        this.terms = undefined;
        this.matchCase = false;
        this.searchInTitle = true;
        this.searchInDescription = false;
        this.editionDateBefore = undefined;
        this.editionDateAfter = undefined;
        this.creationDateBefore = undefined;
        this.creationDateAfter = undefined;
        this.matchCategories = undefined;
        this.sort = globalVariables.sort.value;
    }

    public filter(entries: Entry[]): Entry[] {
        let filtredEntries: Entry[] = entries;

        if (this.terms) {
            filtredEntries = entries.filter((entry) => {
                let match: boolean = false;

                if (!this.matchCase) {
                    if (this.searchInTitle && entry.title.toLowerCase().includes(this.terms!.toLowerCase())) {
                        match = true;
                    }

                    if (this.searchInDescription && entry.description.toLowerCase().includes(this.terms!.toLowerCase())) {
                        match = true;
                    }
                } else {
                    if (this.searchInTitle && entry.title.includes(this.terms!)) {
                        match = true;
                    }

                    if (this.searchInDescription && entry.description.includes(this.terms!)) {
                        match = true;
                    }
                }

                return match;
            })
        }

        if (this.matchCategories && this.matchCategories.length) {
            filtredEntries = filtredEntries.filter((entry) => {
                if (!entry.categories) return false;
                return (entry.categories.some(c => this.matchCategories!.includes(c)))
            })
        }

        return filtredEntries;
    }

    public doSort(entries: Entry[]) {
        return entries.sort((a: Entry, b: Entry) => {
            if (this.sort === 'alphabetical') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        })
    }
}