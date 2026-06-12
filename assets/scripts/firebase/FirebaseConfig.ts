const {ccclass, property} = cc._decorator;

@ccclass
export default class FirebaseConfig extends cc.Component {

    onLoad() {
        if (typeof firebase === 'undefined') {
            console.log("Firebase undefined, loading CDN...");
            this.loadFirebaseScripts(() => {
                void this.initFirebase();
            });
        }
        else {
            void this.initFirebase();
        }
    }

    loadFirebaseScripts(callback: () => void) {
        const urls = [
            "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
            "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js",
            "https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"
        ];

        let loadedCount = 0;
        urls.forEach(url => {
            let script = document.createElement('script');
            script.src = url;
            script.async = false;
            script.onload = () => {
                loadedCount++;
                if (loadedCount === urls.length) {
                    console.log("Firebase CDN successfully loaded");
                    callback();
                }
            };
            document.head.appendChild(script);
        });
    }

    async initFirebase() {
        if ((window as any).__yoBattleFirebaseInitPromise) {
            await (window as any).__yoBattleFirebaseInitPromise;
            return;
        }

        (window as any).__yoBattleFirebaseInitPromise = this.initializeFirebaseRuntime();
        await (window as any).__yoBattleFirebaseInitPromise;
    }

    private async initializeFirebaseRuntime(): Promise<void> {
        const firebaseConfig = {
            apiKey: "AIzaSyBuGBqqZ0XUI4SjSWVLVCnhiqy09lP3NSY",
            authDomain: "yo-battle-9921a.firebaseapp.com",
            databaseURL: "https://yo-battle-9921a-default-rtdb.firebaseio.com",
            projectId: "yo-battle-9921a",
            storageBucket: "yo-battle-9921a.firebasestorage.app",
            messagingSenderId: "11338410793",
            appId: "1:11338410793:web:6024406c092e262af86538",
            measurementId: "G-62530V6NLT"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("Firebase initialized");
        }

        (window as any).__yoBattleAuthReadyPromise = this.configureAuthPersistence();
        await (window as any).__yoBattleAuthReadyPromise;
    }

    private async configureAuthPersistence(): Promise<void> {
        if (typeof firebase === "undefined" || typeof firebase.auth !== "function") {
            return;
        }

        const auth = firebase.auth();

        try {
            await auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

            await new Promise<void>((resolve) => {
                const unsubscribe = auth.onAuthStateChanged(
                    () => {
                        unsubscribe();
                        resolve();
                    },
                    (error) => {
                        console.warn("Failed to initialize Firebase auth state", error);
                        resolve();
                    }
                );
            });
        } catch (error) {
            console.warn("Failed to configure Firebase auth persistence", error);
        }
    }
}
