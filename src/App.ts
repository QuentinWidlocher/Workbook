import { Component, Vue } from "vue-property-decorator";
import { entriesService } from './services/entries';
import { savingSpinner } from './services/savingSpinner';
import { loadingSpinner } from './services/loadingSpinner';

@Component
export default class App extends Vue {
    private saveSpinner: boolean = false;
    private savePending: boolean = false;

    private showLoadingSpinner: boolean = true;

    mounted() {
        savingSpinner.onSpinChange((state) => { this.saveSpinner = state });
        savingSpinner.onPendingChange((state) => { this.savePending = state });

        loadingSpinner.onSpinChange((state) => { 
            this.showLoadingSpinner = state 
        });
    }

    private save() {
        // Force saving, even if not useful or if the entry does not yet exist
        entriesService.saveCurrentEntry(undefined, true).catch((e) => console.error(e));
    }
}
