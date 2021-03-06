import { Component, Vue } from 'vue-property-decorator';
import { firebaseService } from '@/services/firebase';
import router from '@/router';
import { globalVariables } from '@/services/globalVariables';
import { loadingSpinner } from '@/services/loadingSpinner';

@Component
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';
    private showPassword: boolean = false;

    private loading: boolean = false;

    private errorMessage: string = '';

    mounted() {
        loadingSpinner.startSpinning();
        firebaseService.auth.onAuthStateChanged((user: firebase.User | null) => {
            loadingSpinner.stopSpinning();
            if (user) {
                globalVariables.user.isAnonymous = user.isAnonymous;
                router.replace({ name: 'home' });
            }
        });
    }

    private async login(anonymous: boolean = false): Promise<void> {
        this.loading = true;

        let credentials: firebase.auth.UserCredential;

        try {
            if (anonymous) {
                credentials = await firebaseService.auth.signInAnonymously();
                globalVariables.user.isAnonymous = true;
            } else {
                credentials = await firebaseService.auth.signInWithEmailAndPassword(
                    this.username,
                    this.password
                );
                globalVariables.user.id = credentials.user!.uid;
                globalVariables.user.isAnonymous = false;
            }
            router.push({ name: 'home' });
        } catch (error) {
            this.loading = false;
            this.errorMessage = `login.errors.${error.code}`;
        }
    }
}
