import { Component, Vue } from 'vue-property-decorator';
import { firebaseService } from '@/services/firebase';
import router from '@/router';
import { globalVariables } from '@/services/globalVariables';
import { entriesService } from '@/services/entries';

@Component
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';
    private showPassword: boolean = false;

    private loading: boolean = false;

    private errorMessage: string = '';

    private login() {
        this.loading = true;

        firebaseService.auth
            .signInWithEmailAndPassword(this.username, this.password)
            .then(async (credentials: firebase.auth.UserCredential) => {
                globalVariables.userId = credentials.user!.uid;
                router.push({ name: 'home' });
                this.clearPage();
            })
            .catch((error: any) => {
                this.loading = false;
                this.errorMessage = `login.errors.${error.code}`;
            });
    }

    private clearPage() {
        this.loading = false;
        this.username = '';
        this.password = '';
        this.showPassword = false;
        this.errorMessage = '';
    }
}
