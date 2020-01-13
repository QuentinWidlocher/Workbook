import { Component, Vue, Prop } from "vue-property-decorator";
import { State2Way } from 'vuex-class-state2way';
import Entry from '@/models/entry';
import { State } from 'vuex-class';
import SearchCriterias from '@/models/searchCriterias';

@Component
export default class Search extends Vue {
    @Prop({ default: new SearchCriterias()}) criterias!: SearchCriterias;

    showCreationDateBefore: boolean = false;
    showCreationDateAfter: boolean = false;
    showEditionDateBefore: boolean = false;
    showEditionDateAfter: boolean = false;

    private search() {
        this.$emit('search', this.criterias);
    }

    private clearSearch() {
        this.criterias = new SearchCriterias();
        this.search();
    }
}
