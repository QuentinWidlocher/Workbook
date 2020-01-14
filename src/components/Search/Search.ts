import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import SearchCriterias from '@/models/searchCriterias';
import { globalVariables } from "@/services/globalVariables";

@Component
export default class Search extends Vue {
    criterias: SearchCriterias = new SearchCriterias();

    showCreationDateBefore: boolean = false;
    showCreationDateAfter: boolean = false;
    showEditionDateBefore: boolean = false;
    showEditionDateAfter: boolean = false;

    public get sortValues(): {value: string, text: string}[] {
        return [
            { value: 'alphabetical', text: this.$t('search.sorts.alphabetical').toString()},
            // { value: 'creationDate', text: this.$t('search.sorts.creationDate').toString() },
            // { value: 'editionDate', text: this.$t('search.sorts.editionDate').toString() },
        ]
    }

    private sortSelectChange(value: any) {
        globalVariables.sort.value = value;
    }

    private search(close: boolean = false) {
        this.$emit('search', this.criterias);
        this.$emit('update:criterias', this.criterias);

        if (close) {
            this.$emit('close');
        }
    }

    private clearSearch() {
        this.criterias = new SearchCriterias();
        this.search(true);
    }

}
