import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.userUid = null;
    }

    setUserUid = (uid) => this.userUid = uid;

    signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    logOut = () => this.auth.signOut();

    getUserCardsRef = () => this.database.ref(`/cards/${this.userUid}`);

    getUserCurrentCardRef = (id) => this.database.ref(`/cards/${this.userUid}/${id}`);
}

export default Firebase;