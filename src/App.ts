import { Component, Vue } from "vue-property-decorator";
import { entriesService } from './services/entries';
import { savingSpinner } from './services/savingSpinner';

@Component
export default class App extends Vue {
    private saveSpinner: boolean = false;

    mounted() {
        savingSpinner.onSpinChange((state) => { this.saveSpinner = state });
    }

    private save() {
        entriesService.saveCurrentEntry();
    }
}
