import { globalVariables } from '@/services/globalVariables';
import ListItem from './listItem';
import EntryMapper from '@/mappers/EntryMapper';

export enum SortType {
    Alphabeticaly,
}

export enum GroupType {
    None,
    Alphabeticaly,
    Categories,
}

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

    sort: SortType = globalVariables.sort.numberValue;
    group: GroupType = globalVariables.group.numberValue;

    public isDefault() {
        return (
            !this.terms &&
            !this.matchCase &&
            this.searchInTitle &&
            !this.searchInDescription &&
            !this.editionDateBefore &&
            !this.editionDateAfter &&
            !this.creationDateBefore &&
            !this.creationDateAfter &&
            !this.matchCategories
        );
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
        this.sort = globalVariables.sort.numberValue;
        this.group = globalVariables.group.numberValue;
    }

    public filter(items: ListItem[]): ListItem[] {
        let filtredEntries: ListItem[] = items;

        if (this.terms) {
            filtredEntries = items.filter((item: ListItem) => {
                if (item.isSubheader) return true;

                let match: boolean = false;

                if (!this.matchCase) {
                    if (
                        this.searchInTitle &&
                        item.entry!.title.toLowerCase().includes(this.terms!.toLowerCase())
                    ) {
                        match = true;
                    }

                    if (
                        this.searchInDescription &&
                        item.entry!.description.toLowerCase().includes(this.terms!.toLowerCase())
                    ) {
                        match = true;
                    }
                } else {
                    if (this.searchInTitle && item.entry!.title.includes(this.terms!)) {
                        match = true;
                    }

                    if (this.searchInDescription && item.entry!.description.includes(this.terms!)) {
                        match = true;
                    }
                }

                return match;
            });
        }

        if (this.matchCategories && this.matchCategories.length) {
            filtredEntries = filtredEntries.filter((item: ListItem) => {
                if (!item.entry!.categories) return false;
                return item.entry!.categories.some((c) => this.matchCategories!.includes(c));
            });
        }

        return filtredEntries;
    }

    public doSort(items: ListItem[]): ListItem[] {
        const list = items.sort((a: ListItem, b: ListItem) => {
            switch (this.sort) {
                case SortType.Alphabeticaly:
                    if (a.entry && (!a.entry.id || !a.entry.title)) {
                        return 1;
                    }

                    return a.name.localeCompare(b.name);

                default:
                    return 0;
            }
        });

        return list;
    }

    public doGroup(items: ListItem[]): ListItem[] {
        if (!items.length) return items;

        // Remove all subheaders
        items = items.filter((item: ListItem) => !item.isSubheader);

        switch (this.group) {
            case GroupType.None:
                return items;

            case GroupType.Alphabeticaly:
                this.sort = SortType.Alphabeticaly;
                items = this.doSort(items);

                const groupedList: ListItem[] = [];
                let previousLetter: string | undefined;

                items.reverse().forEach((item: ListItem) => {
                    if (item.entry && (!item.entry.id || !item.entry.title)) {
                        groupedList.unshift(item);
                    } else if (!previousLetter) {
                        previousLetter = item.name[0];
                        groupedList.unshift(item);
                    } else if (item.name[0].toUpperCase() === previousLetter) {
                        groupedList.unshift(item);
                    } else {
                        groupedList.unshift(new ListItem(previousLetter, true));
                        groupedList.unshift(item);
                        previousLetter = item.name[0].toUpperCase();
                    }
                });

                if (previousLetter) {
                    groupedList.unshift(new ListItem(previousLetter, true));
                }

                return groupedList;

            default:
                return [];
        }
    }
}
