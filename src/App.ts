import { Component, Vue } from "vue-property-decorator";
import { entriesService } from './services/entries';
import { savingSpinner } from './services/savingSpinner';
import { loadingSpinner } from './services/loadingSpinner';
import { globalVariables } from './services/globalVariables';

@Component
export default class App extends Vue {
    private saveSpinner: boolean = false;
    private savePending: boolean = false;

    private showLoadingSpinner: boolean = false;

    beforeMount() {
        savingSpinner.onSpinChange((state) => { this.saveSpinner = state });
        savingSpinner.onPendingChange((state) => { this.savePending = state });

        loadingSpinner.onSpinChange((state) => { 
            this.showLoadingSpinner = state 
        });
    }

    mounted() {
        this.initializeSettings();
    }

    private save() {
        // Force saving, even if not useful or if the entry does not yet exist
        entriesService.saveCurrentEntry(undefined, true).catch((e) => console.error(e));
    }

    private initializeSettings() {
        this.$vuetify.theme.dark = globalVariables.darkMode.booleanValue;
        this.$vuetify.theme.currentTheme.primary = globalVariables.themeColor.value;
        this.$vuetify.lang.current = globalVariables.lang.value;
        this.$i18n.locale = globalVariables.lang.value;
    }
}
