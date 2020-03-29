import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Entry from '@/models/entry';
import { entriesService as entries } from '@/services/entries';
import Editor from './Editor/Editor.vue';
import DeleteDialog from '@/components/DeleteDialog/DeleteDialog.vue';
import { Getter, State } from 'vuex-class';
import { State2Way } from 'vuex-class-state2way';
import { categoriesService } from '@/services/categories';

@Component({
    components: {
        Editor,
        DeleteDialog,
    },
})
export default class Edition extends Vue {
    private deleteDialog: boolean = false;

    @Getter('currentEntry') entry!: Entry;
    @State categories!: string[];

    private deleteEntry() {
        entries.deleteEntry(entries.currentEntry);
        this.deleteDialog = false;
    }

    @Watch('categoriesDialog')
    onCategoriesDialogChange() {
        categoriesService.mergeCategories(this.categories);
    }
}
