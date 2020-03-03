import { Component, Vue, Watch } from 'vue-property-decorator';
import { globalVariables } from '@/services/globalVariables';
import { firebaseService } from '@/services/firebase';
import router from '@/router';
import { entriesService } from '@/services/entries';
import DeleteDialog from '@/components/DeleteDialog/DeleteDialog.vue';
import { pack, unpack } from 'jsonpack';

@Component({
    components: {
        DeleteDialog,
    },
})
export default class Settings extends Vue {
    public deleteDialog = {
        visible: false,
        title: '',
        content: '',
        deleteButtonLabel: '',
        cancelButtonLabel: '',
        confirm: () => {},
        showConfirm: false,
        confirmMessage: '',
    };

    public loadDataLoading = false;

    private get userName(): string {
        if (globalVariables.user.isAnonymous) {
            return this.$t('login.guest')
                .toString()
                .toLocaleLowerCase();
        } else {
            return globalVariables.user.name;
        }
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
        await entriesService.deleteAllEntries();
        router.push({ name: 'login' });
    }

    private saveData() {
        const data = pack(JSON.stringify(entriesService.entries));
        const filename = `workbook-backup-${new Date().toISOString().split('T')[0]}.wrkbk`;

        var file = new Blob([data], { type: 'wrkbk' });
        if (window.navigator.msSaveOrOpenBlob)
            // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            // Others
            var a = document.createElement('a'),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    private openFileUpload() {
        const fileInput = (this.$refs as any).fileInput;
        fileInput.click();
    }

    private async loadData(e: any) {
        this.deleteDialog.title = this.$t('settings.general.loadDataWarning.title').toString();
        this.deleteDialog.content = this.$t('settings.general.loadDataWarning.content').toString();
        this.deleteDialog.deleteButtonLabel = this.$t(
            'settings.general.loadDataWarning.deleteButtonLabel'
        ).toString();
        this.deleteDialog.cancelButtonLabel = this.$t(
            'settings.general.loadDataWarning.cancelButtonLabel'
        ).toString();

        this.deleteDialog.confirm = async () => {
            this.loadDataLoading = true;

            const file: any = e.originalTarget.files[0];
            const fileType = file.name.split('.').pop();

            if (fileType !== 'wrkbk') return;

            const data = unpack(await file.text()) as any[];

            entriesService.entries = data;
            await entriesService.saveAllEntries();

            this.deleteDialog.confirmMessage = this.$t('settings.general.loadDataWarning.confirmMessage', {
                nb: data.length,
            }).toString();

            this.loadDataLoading = false;
            this.deleteDialog.showConfirm = true;
        };
        this.deleteDialog.visible = true;
    }
}
