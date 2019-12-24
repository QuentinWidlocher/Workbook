import { Component, Vue } from "vue-property-decorator";
import Entry from '@/models/entry';
import Editor from '@/components/Editor/Editor.vue';
import EntryList from '@/components/EntryList/EntryList.vue';

@Component({
    components: {
        Editor,
        EntryList,
    }
})
export default class Home extends Vue {
    entries: Entry[] = [
        { title: "Entrée 01", description: "" },
        { title: "Entrée 02", description: "" },
        { title: "Entrée 03", description: "" },
        { title: "Entrée 04", description: "" },
    ];

    currentEntryIndex: number = 0;
}