import { Component, Vue, Watch } from 'vue-property-decorator';
import { globalVariables } from '@/services/globalVariables';
import { firebaseService } from '@/services/firebase';
import router from '@/router';
import { entriesService } from '@/services/entries';

@Component
export default class Settings extends Vue {
    private get userName(): string {
        return globalVariables.username;
    }

    private get darkMode(): boolean {
        return globalVariables.darkMode.booleanValue;
    }
    private set darkMode(state: boolean) {
        this.$vuetify.theme.dark = state;
        this.$vuetify.theme.currentTheme.primary = globalVariables.themeColor.value;
        globalVariables.darkMode.booleanValue = state;
    }

    colors = [
        ['#e91e63', '#9c27b0', '#673ab7'],
        ['#1976d2', '#00bcd4', '#009688'],
        ['#4caf50', '#8bc34a', '#cddc39'],
        ['#ffc107', '#ff9800', '#f44336'],
        ['#795548', '#9e9e9e', '#607d8b'],
    ];
    private get themeColor(): string {
        return globalVariables.themeColor.value;
    }
    private set themeColor(color: string) {
        this.$vuetify.theme.currentTheme.primary = color;
        globalVariables.themeColor.value = color;
    }

    private get autosave(): boolean {
        return globalVariables.autosave.booleanValue;
    }
    private set autosave(state: boolean) {
        globalVariables.autosave.booleanValue = state;
    }

    public get availableLanguages(): { value: string; text: string }[] {
        return [
            { value: 'fr', text: 'Français' },
            { value: 'en', text: 'English' },
        ];
    }
    private get lang(): string {
        return globalVariables.lang.value;
    }
    private set lang(lang: string) {
        this.$vuetify.lang.current = lang;
        this.$i18n.locale = lang;
        globalVariables.lang.value = lang;
    }

    private clearPreferences() {
        globalVariables.autosave.setToDefault();
        globalVariables.autosaveInterval.setToDefault();
        globalVariables.darkMode.setToDefault();
        globalVariables.themeColor.setToDefault();

        this.$vuetify.theme.dark = this.darkMode;
        this.$vuetify.theme.currentTheme.primary = this.themeColor;
    }

    private async disconnect() {
        await firebaseService.auth.signOut();
        router.push({ name: 'login' });
    }
}
