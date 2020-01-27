import { Component, Vue, Prop } from 'vue-property-decorator';
import Requirement from './Requirement.vue';
import router from '@/router';
import { firebaseService } from '@/services/firebase';

class RequirementClass {
    condition!: (password: string) => boolean;
    label!: string;
    param: string | undefined = undefined;
}

@Component({
    components: {
        Requirement,
    },
})
export default class Register extends Vue {
    private username: string = '';
    private usernameRules = [(v: string) => !!v || this.t('register.requirements.username.empty')];

    private email: string = '';
    private emailRules = [
        (v: string) => !!v || this.t('register.requirements.email.empty'),
        (v: string) => !!v.match(/\S+@\S+\.\S+/) || this.t('register.requirements.email.invalid'),
    ];

    private valid: boolean = false;
    private loading: boolean = false;

    private password: string = '';
    private passwordRequirements: RequirementClass[] = [
        { label: 'length', param: '6', condition: (s: string) => s.length >= 6 },
        { label: 'length', param: '10', condition: (s: string) => s.length >= 10 },
        {
            label: 'case',
            param: undefined,
            condition: (s: string) => s.match(/(?=.*[a-z])(?=.*[A-Z])/g) !== null,
        },
        {
            label: 'number',
            param: undefined,
            condition: (s: string) => s.match(/(?=.*[0-9])/g) !== null,
        },
        {
            label: 'special',
            param: undefined,
            condition: (s: string) => s.match(/(?=.[^A-Za-z0-9])/g) !== null,
        },
    ];
    private passwordRules = [(v: string) => !!v || this.t('register.requirements.password.empty')];
    private passwordStrength: number = 0;
    private passwordStrengthColor: string = '';
    private requirementsMenu: boolean = false;

    private showPassword: boolean = false;

    private error: string = '';
    private errorMessage: string = '';

    private checkPasswordStrength() {
        let strength: number = 0;

        this.passwordRequirements.forEach((requirement: RequirementClass) => {
            if (requirement.condition(this.password)) {
                strength++;
            }
        });

        this.passwordStrength = (strength / this.passwordRequirements.length) * 100;

        if (this.passwordStrength < 50) {
            this.passwordStrengthColor = 'error';
        } else if (this.passwordStrength >= 50 && this.passwordStrength < 75) {
            this.passwordStrengthColor = 'warning';
        } else {
            this.passwordStrengthColor = 'success';
        }
    }

    private async register() {
        if (!(this.$refs.form as any).validate() || this.passwordStrength < 50) {
            return;
        }

        this.loading = true;

        try {
            const credentials = await firebaseService.auth.createUserWithEmailAndPassword(
                this.email,
                this.password
            );

            await firebaseService.auth.signInWithEmailAndPassword(this.email, this.password);

            await firebaseService.db
                .collection('users')
                .doc(credentials.user!.uid)
                .set({ name: this.username });

            router.push({ name: 'home' });
        } catch (error) {
            this.errorMessage = `login.errors.${error.code}`;
            this.loading = false;
        }
    }

    public t(key: string): string {
        return this.$t(key).toString();
    }
}
