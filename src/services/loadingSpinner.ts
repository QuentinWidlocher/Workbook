import { Vue } from "vue-property-decorator";

export class LoadingSpinner extends Vue {
    spinning: boolean = false;

    public startSpinning() {
        this.spinning = true;
        this.emitSpinning();
    }

    public stopSpinning() {
        this.spinning = false;
        this.emitSpinning();
    }

    public onSpinChange(callback: (state: boolean) => void) {
        this.$on('loadingSpinnerSpinChange', (state: boolean) => callback(state));
    }

    private emitSpinning() {
        this.$emit('loadingSpinnerSpinChange', this.spinning);
    }
    
}

export const loadingSpinner: LoadingSpinner = new LoadingSpinner();