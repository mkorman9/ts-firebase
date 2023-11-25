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

## Service Account credentials resolving

The app tries to resolve Service Account credentials the following way:

- First it tries to read `FIREBASE_CREDENTIALS` environment variable, which is expected to contain
a raw JSON with the content of `serviceAccountKey.json`. This is the best way on platforms that
don't allow defining custom filesystem mount points, such as Amazon ECS or Azure Container Apps. 
It can be defined as:

```sh
export FIREBASE_CREDENTIALS=$(cat serviceAccountKey.json | jq -r tostring)
```

- Then it tries to read credentials from a file specified by `FIREBASE_CREDENTIALS_PATH`
environment variable. Its value defaults to `./serviceAccountKey.json`.

- If the above methods fail, the app defaults to resolving the
[Default Credentials](https://firebase.google.com/docs/admin/setup#initialize-sdk).
These are predefined on Google environments with the correct Service Account assigned, such as Goole Cloud Run.
