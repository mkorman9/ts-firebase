# ts-firebase

## Run with emulator

```sh
cp .env.template .env
cd firebase/
firebase emulators:start
```

## Deploy Security Rules and Indexes

```sh
cd firebase/
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Run without emulator

- Go to Firebase console `Project Settings -> Service accounts` and generate new private key,
save it as `serviceAccountKey.json` in the project root

- Setup `.env` file
```sh
cp .env.template .env
```

- Change `FIREBASE_USE_EMULATOR="true"` to `false` inside `.env` file
