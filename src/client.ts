import {initializeApp} from 'firebase/app';
import {connectFirestoreEmulator, getFirestore, collection, getDocs} from 'firebase/firestore';
import {connectAuthEmulator, getAuth, signInAnonymously} from 'firebase/auth';
import config from './config';

const getConfig = () => {
  if (config.FIREBASE_USE_EMULATOR) {
    return {
      apiKey: 'fake-api-key',
      projectId: config.FIREBASE_EMULATOR_PROJECT
    };
  } else {
    return {
      apiKey: 'AIzaSyBGRQhxXTFc-z_UB81xGziP6YUajLhqT3E',
      authDomain: 'my-playground-project-391323.firebaseapp.com',
      projectId: 'my-playground-project-391323',
      storageBucket: 'my-playground-project-391323.appspot.com',
      messagingSenderId: '71830756335',
      appId: '1:71830756335:web:48be7de96cd98f4c8ff41a',
      measurementId: 'G-CJ08F2GTJV'
    };
  }
};

const app = initializeApp(getConfig());
const auth = getAuth(app);
const firestore = getFirestore(app);

if (config.FIREBASE_USE_EMULATOR) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(firestore, '127.0.0.1', 9100);
}

export const createAnonymousUser = async () => {
  const credentials = await signInAnonymously(auth);
  const user = credentials.user;
  const token = await user.getIdToken();

  return {user, token};
};

export const accessTodoItems = async () => {
  const snapshot = await getDocs(collection(firestore, 'todo_items'));
  return snapshot.docs.map(s => s.data());
};

export const accessInvoices = async () => {
  const snapshot = await getDocs(collection(firestore, 'invoices'));
  return snapshot.docs.map(s => s.data());
};
