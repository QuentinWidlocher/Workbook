import { Component, Vue, Prop } from 'vue-property-decorator';
import SearchCriterias, { SortType, GroupType } from '@/models/searchCriterias';
import { globalVariables } from '@/services/globalVariables';
import { State } from 'vuex-class';
import ItemsSelector from '@/components/ItemsSelector/ItemsSelector.vue';

@Component({
    components: {
        ItemsSelector,
    },
})
export default class Search extends Vue {
    @Prop({ default: new SearchCriterias() }) criterias!: SearchCriterias;

    showCreationDateBefore: boolean = false;
    showCreationDateAfter: boolean = false;
    showEditionDateBefore: boolean = false;
    showEditionDateAfter: boolean = false;

    @State categories!: string[];

    public get sortValues(): { value: SortType; text: string }[] {
        return [
            { value: SortType.Alphabeticaly, text: this.$t('search.sorts.alphabetical').toString() },
            // { value: 'creationDate', text: this.$t('search.sorts.creationDate').toString() },
            // { value: 'editionDate', text: this.$t('search.sorts.editionDate').toString() },
        ];
    }

    public get groupValues(): { value: GroupType; text: string }[] {
        return [
            { value: GroupType.None, text: this.$t('search.groups.none').toString() },
            { value: GroupType.Alphabeticaly, text: this.$t('search.groups.alphabetical').toString() },
            // { value: 'creationDate', text: this.$t('search.sorts.creationDate').toString() },
            // { value: 'editionDate', text: this.$t('search.sorts.editionDate').toString() },
        ];
    }

    private sortSelectChange(value: SortType) {
        globalVariables.sort.value = value.toString();
    }

    private groupSelectChange(value: GroupType) {
        globalVariables.group.value = value.toString();
    }

    private search(close: boolean = false) {
        this.$emit('search', this.criterias);
        this.$emit('update:criterias', this.criterias);

        if (close) {
            this.$emit('close');
        }
    }

    private clearSearch() {
        this.criterias.setToDefault();
        this.search(true);
    }
}
