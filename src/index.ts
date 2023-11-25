import config from './config';
import './hooks';

import * as firebase from 'firebase-admin';
import {accessInvoices, accessTodoItems, createAnonymousUser} from './client';

const resolveFirebaseCredentials = () => {
  if (config.FIREBASE_CREDENTIALS) {
    const credentialsObject = JSON.parse(config.FIREBASE_CREDENTIALS);
    return firebase.credential.cert(credentialsObject);
  } else if (config.FIREBASE_CREDENTIALS_PATH) {
    return firebase.credential.cert(config.FIREBASE_CREDENTIALS_PATH);
  } else {
    return firebase.credential.applicationDefault();
  }
};

const createFirebaseApp = () => {
  if (config.FIREBASE_USE_EMULATOR) {
    console.log('Firebase integration is set up to use an Emulator');

    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
    process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:9100';
    return firebase.initializeApp({
      projectId: config.FIREBASE_EMULATOR_PROJECT
    });
  } else {
    console.log('Firebase integration is set up to use a Service Account');

    return firebase.initializeApp({
      credential: resolveFirebaseCredentials()
    });
  }
};

const app = createFirebaseApp();

(async () => {
  const todoItemsCollection = app.firestore().collection('todo_items');
  await todoItemsCollection.add({
    content: 'Hello world'
  });

  const items = await todoItemsCollection.get();

  console.log(`(Admin) Todo items: ${items.docs.map(s => s.data().content)}`);

  console.log(`(Client) Todo items: ${(await accessTodoItems()).map(i => i.content)}`);
})();

(async () => {
  const invoicesCollection = app.firestore().collection('invoices');
  await invoicesCollection.add({
    invoiceNumber: '2023/AAA/123'
  });

  const invoices = await invoicesCollection.get();

  console.log(`(Admin) Invoices: ${invoices.docs.map(s => s.data().invoiceNumber)}`);

  try {
    console.log(`(Client) Invoices: ${(await accessInvoices()).map(i => i.invoiceNumber)}`);
  } catch (e) {
    console.log('(Client) Could not access invoices');
  }
})();

(async () => {
  const {user, token} = await createAnonymousUser();
  console.log(`Created user ${user.uid}`);

  const tokenAuthResult = await app.auth().verifyIdToken(token);
  console.log(`Authorized user ${tokenAuthResult.uid}`);
})();
