# ts-firebase

## Run with emulator

- Create `.env` file
```sh
cp .env.template .env
```

- Start emulators
```sh
cd firebase/
./start_emulators.sh
```

- Start the app
```sh
npm ci
npm start
```

## Deploy Security Rules and Indexes

```sh
cd firebase/
./deploy.sh --project <PROJECT_NAME>
```

Where `<PROJECT_NAME>` is the name of the Firebase project.

## Run without emulator

- Go to Firebase console `Project Settings -> Service accounts` and generate new private key,
save it as `serviceAccountKey.json` in the project root

- Create `.env` file
```sh
cp .env.template .env
```

- Change `FIREBASE_USE_EMULATOR="true"` to `false` inside `.env` file

- Start the app
```sh
npm ci
npm start
```
