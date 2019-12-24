import { Component, Vue, Prop } from "vue-property-decorator";
import Entry from '@/models/entry';

@Component
export default class Editor extends Vue {
    @Prop() entry!: Entry;
}