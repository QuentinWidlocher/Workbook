import { Vue } from "vue-property-decorator";

export class SavingSpinner extends Vue {
    public startSpinning() {
        this.$emit('savingSpinner', true);
    }

    public stopSpinning() {
        this.$emit('savingSpinner', false);
    }

    public onSpinChange(callback: (state: boolean) => void) {
        this.$on('savingSpinner', (state: boolean) => callback(state));
    }
}

export const savingSpinner: SavingSpinner = new SavingSpinner();