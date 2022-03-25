import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../config/config';

const Firebase = firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth()

export default Firebase;

