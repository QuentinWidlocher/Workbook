import Entry from './entry';

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

    public isDefault() {
        return !this.terms &&
        !this.matchCase &&
        this.searchInTitle &&
        !this.searchInDescription &&
        !this.editionDateBefore && !this.editionDateAfter &&
        !this.creationDateBefore && !this.creationDateAfter &&
        !this.matchCategories
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

        return filtredEntries;
    }
}