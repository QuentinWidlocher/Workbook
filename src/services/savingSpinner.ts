import { Vue } from "vue-property-decorator";

export class SavingSpinner extends Vue {
    spinning: boolean = false;
    pending_: boolean = false;

    public startSpinning() {
        this.spinning = true;
        this.emitSpinning();
    }

    public stopSpinning() {
        this.spinning = false;
        this.emitSpinning();
    }

    public get pending(): boolean {
        return this.pending_;
    }

    public set pending(state: boolean) {
        this.pending_ = state;
        this.emitPending();
    }

    public onSpinChange(callback: (state: boolean) => void) {
        this.$on('savingSpinnerSpinChange', (state: boolean) => callback(state));
    }

    public onPendingChange(callback: (state: boolean) => void) {
        this.$on('savingSpinnerPendingChange', (state: boolean) => callback(state));
    }

    private emitSpinning() {
        this.$emit('savingSpinnerSpinChange', this.spinning);
    }

    private emitPending() {
        this.$emit('savingSpinnerPendingChange', this.pending_);
    }
}

export const savingSpinner: SavingSpinner = new SavingSpinner();