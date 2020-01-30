import Entry from './entry';

export default class ListItem {
    constructor(
        public name: string = '',
        public isSubheader: boolean = false,
        public entry?: Entry,
        public entryIndex: number = 0
    ) {}
}
