import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

export class FirebaseService {
    public db: firebase.firestore.Firestore;
    public auth: firebase.auth.Auth;
    public storage: firebase.storage.Reference;

    public constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDpyamqPGlSGU9T37tm-YkfwfQSKD2Ud9I",
            authDomain: "lazard-workbook.firebaseapp.com",
            databaseURL: "https://lazard-workbook.firebaseio.com",
            projectId: "lazard-workbook",
            storageBucket: "lazard-workbook.appspot.com",
            messagingSenderId: "762605221788",
            appId: "1:762605221788:web:84535c9d437a807d6ffa59"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage().ref();

        this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    public getCurrentUser(): Promise<any> {
        return new Promise<any>(rslv => {
            const unsubscribe = this.auth.onAuthStateChanged((user: any) => {
                unsubscribe();
                rslv(user);
            });
        });
    }
}

export const firebaseService: FirebaseService = new FirebaseService();