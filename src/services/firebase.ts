import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { globalVariables } from './globalVariables';

export class FirebaseService {
    public db: firebase.firestore.Firestore;
    public auth: firebase.auth.Auth;
    public storage: firebase.storage.Reference;

    public constructor() {
        const firebaseConfig = {
            apiKey: 'AIzaSyDpyamqPGlSGU9T37tm-YkfwfQSKD2Ud9I',
            authDomain: 'lazard-workbook.firebaseapp.com',
            databaseURL: 'https://lazard-workbook.firebaseio.com',
            projectId: 'lazard-workbook',
            storageBucket: 'lazard-workbook.appspot.com',
            messagingSenderId: '762605221788',
            appId: '1:762605221788:web:84535c9d437a807d6ffa59',
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage().ref();

        this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        this.db.enablePersistence();
    }

    public getCurrentUser(): firebase.User | null {
        const user = this.auth.currentUser;
        if (user) {
            globalVariables.user.id = user.uid;
            this.getUserName().then((name: string) => (globalVariables.user.name = name));
        }
        return user;
    }

    public async getUserName(): Promise<string> {
        if (globalVariables.user.isAnonymous) {
            return 'Guest';
        } else {
            return this.db
                .collection('users')
                .doc(globalVariables.user.id)
                .get()
                .then((snap) => {
                    return (snap.data() as any).name;
                });
        }
    }

    public isUserLoggedIn(): boolean {
        return !!this.getCurrentUser();
    }
}

export const firebaseService: FirebaseService = new FirebaseService();
