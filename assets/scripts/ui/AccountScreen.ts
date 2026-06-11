import AudioManager from '../AudioManager';


const { ccclass, property } = cc._decorator;

type AccountView = 'choice' | 'login' | 'signup'| 'LoggedIn';

/**
 * AccountScreen
 *
 * 節點結構：
 *  AccountScreen  ← 掛此腳本，預設 active = false
 *  └── Panel
 *      ├── CloseBtn        (右上角 X → onCloseClick)
 *      ├── StatusLabel     (錯誤 / 成功訊息)
 *      ├── ChoiceView      (active=true，含自己的 Title "ACCOUNT")
 *      │   ├── BackBtn         → onCloseClick（回 MainMenu）
 *      │   ├── LoginChoiceBtn  → onLoginChoiceClick
 *      │   └── SignupChoiceBtn → onSignupChoiceClick
 *      ├── LoginView       (active=false，含自己的 Title "LOGIN")
 *      │   ├── EmailEditBox
 *      │   ├── PasswordEditBox
 *      │   ├── SubmitBtn   → onLoginSubmit
 *      │   └── BackBtn     → onBackClick（回 ChoiceView）
 *      └── SignupView      (active=false，含自己的 Title "SIGN UP")
 *          ├── UsernameEditBox
 *          ├── EmailEditBox
 *          ├── PasswordEditBox
 *          ├── SubmitBtn   → onSignupSubmit
 *          └── BackBtn     → onBackClick（回 ChoiceView）
 */
@ccclass
export default class AccountScreen extends cc.Component {

    // ── 三個子 View ──────────────────────────────────────
    @property(cc.Node)
    choiceView: cc.Node = null;

    @property(cc.Node)
    loginView: cc.Node = null;

    @property(cc.Node)
    signupView: cc.Node = null;
    // ── 已登入的畫面──────────────────────────────────────
    @property(cc.Node)
    LoggedIn: cc.Node = null;

    @property(cc.EditBox)
    usernameEditBox: cc.EditBox = null;

    @property(cc.Label)
    userGamePlayed: cc.Label = null;

    @property(cc.Label)
    userWinRate: cc.Label = null;
    // ── 共用 ─────────────────────────────────────────────
    @property(cc.Label)
    statusLabel: cc.Label = null;

    // ── LoginView 的欄位 ─────────────────────────────────
    @property(cc.EditBox)
    loginEmailInput: cc.EditBox = null;

    @property(cc.EditBox)
    loginPasswordInput: cc.EditBox = null;

    // ── SignupView 的欄位 ────────────────────────────────
    @property(cc.EditBox)
    signupUsernameInput: cc.EditBox = null;

    @property(cc.EditBox)
    signupEmailInput: cc.EditBox = null;

    @property(cc.EditBox)
    signupPasswordInput: cc.EditBox = null;

    // ── 送出按鈕（loading 時 disable）───────────────────
    @property(cc.Button)
    loginSubmitBtn: cc.Button = null;

    @property(cc.Button)
    signupSubmitBtn: cc.Button = null;

    // ─────────────────────────────────────────────────────
    private _loading: boolean = false;
    private _onCloseCallback: (() => void) | null = null;
    private _firebaseErrorToEnglish(code: string): string {
        const errorMap: Record<string, string> = {
            'auth/invalid-email': 'Invalid email format',
            'auth/user-disabled': 'This account has been disabled',
            'auth/user-not-found': 'Account not found',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'This email is already registered',
            'auth/weak-password': 'Password is too weak',
            'auth/invalid-credential': 'Invalid email or password',
        };
        if (errorMap[code]) {
            return errorMap[code];
        }
        switch (code) {
            case 'auth/invalid-email':
                return '信箱格式錯誤';
            case 'auth/user-disabled':
                return '此帳號已被停用';
            case 'auth/user-not-found':
                return '找不到此帳號';
            case 'auth/wrong-password':
                return '密碼錯誤';
            case 'auth/email-already-in-use':
                return '此信箱已經被註冊';
            case 'auth/weak-password':
                return '密碼強度太弱';
            case 'auth/invalid-credential':
                return '信箱或密碼錯誤';
            default:
                return '操作失敗：' + code;
        }
    }

    /** 從外部呼叫：開啟面板 */
    public open(onClose?: () => void) {
        this._onCloseCallback = onClose || null;
        this.node.active = true;
        const fb = (window as any).firebase;
        const user = fb.auth().currentUser;
        if (user) {
            this._showView('LoggedIn');
        } 
        else {
            this._showView('choice');
        }

        this._setStatus('');
    }

    /** 從外部呼叫：關閉面板 */
    public close() {
        this.node.active = false;
        this._clearInputs();
        if (this._onCloseCallback) {
            this._onCloseCallback();
            this._onCloseCallback = null;
        }
    }

    // ── View 切換 ─────────────────────────────────────────

    private _showView(view: AccountView) {
        if (this.choiceView) this.choiceView.active = (view === 'choice');
        if (this.loginView)  this.loginView.active  = (view === 'login');
        if (this.signupView) this.signupView.active = (view === 'signup');
        if (this.LoggedIn) this.LoggedIn.active = (view === 'LoggedIn');
        this._setStatus('');
    }

    // ── 按鈕回呼：ChoiceView ──────────────────────────────

    onLoginChoiceClick() {
        AudioManager.playEffect('click', 0.7);
        this._showView('login');
    }

    onSignupChoiceClick() {
        AudioManager.playEffect('click', 0.7);
        this._showView('signup');
    }

    // ── 按鈕回呼：Back（LoginView / SignupView → ChoiceView）

    onBackClick() {
        AudioManager.playEffect('click', 0.7);
        this._showView('choice');
    }

    // ── 按鈕回呼：Close（ChoiceView Back / X → 關閉面板）──

    onCloseClick() {
        AudioManager.playEffect('click', 0.7);
        this.close();
    }

    // ── 按鈕回呼：LoginView 送出 ──────────────────────────

    onLoginSubmit() {
        if (this._loading) return;
        console.log("Login button clicked");
        AudioManager.playEffect('click', 0.7);

        const email    = this.loginEmailInput?.string.trim()    ?? '';
        const password = this.loginPasswordInput?.string.trim() ?? '';

        if (!email || !password) {
            this._setStatus('Please fill in all fields');
            return;
        }

        this._setLoading(true);
        this._setStatus('Logging in...');

       console.log("Start login:", email);

        const fb = (window as any).firebase;

        console.log("fb =", fb);

        fb.auth()
            .signInWithEmailAndPassword(email, password)
            .then((cred) => {

                console.log("Login success:", cred.user);

                this._setLoading(false);

                this._onAccountSuccess({
                    email: cred.user?.email || email,
                    username: cred.user?.displayName || undefined
                });

            })
            .catch((err) => {

                console.error(
                    "Login error:",
                    err.code,
                    err.message
                );

                this._setLoading(false);
                this._setStatus(this._firebaseErrorToEnglish(err.code));

            });
    }

    // ── 按鈕回呼：SignupView 送出 ─────────────────────────

    onSignupSubmit() {
        if (this._loading) return;
        console.log("sign up button clicked");
        AudioManager.playEffect('click', 0.7);

        const username = this.signupUsernameInput?.string.trim() ?? '';
        const email    = this.signupEmailInput?.string.trim()    ?? '';
        const password = this.signupPasswordInput?.string.trim() ?? '';

        if (!username || !email || !password) {
            this._setStatus('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            this._setStatus('Password must be at least 6 characters');
            return;
        }

        this._setLoading(true);
        this._setStatus('Signing up...');

        const fb = (window as any).firebase;

        fb.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
            const uid = cred.user.uid;
            return Promise.all([
                cred.user.updateProfile({
                    displayName: username
                }),
                fb.database()
                .ref("users/" + uid)
                .set({
                    username: username,
                    email: email,
                    wins: 0,
                    losses: 0,
                    createdAt: Date.now()
                })

            ]);

        })
        .then(() => {

            this._setLoading(false);

            this._onAccountSuccess({
                email,
                username
            });

        })
        .catch((err) => {

            console.log("Signup error code:", err.code);
            console.log("Signup error message:", err.message);

            this._setLoading(false);
            this._setStatus(this._firebaseErrorToEnglish(err.code));

        });
    }

    // ── 成功後 ────────────────────────────────────────────

    private _onAccountSuccess(user: { email: string; username?: string }) {
        this._setStatus(`Welcome, ${user.username ?? user.email}!`);
        this.loadPlayerStats();
        this.scheduleOnce(() => { this.close(); }, 1.2);
    }

    // ── 工具方法 ──────────────────────────────────────────

    private _setStatus(msg: string) {
         console.log("Set status:", msg, "label =", this.statusLabel);
        if (this.statusLabel) {
            this.statusLabel.string = msg;
            this.statusLabel.node.active = true;
        }
        else {
            console.warn("statusLabel is null");
        }
    }

    private _setLoading(loading: boolean) {
        this._loading = loading;
        if (this.loginSubmitBtn)  this.loginSubmitBtn.interactable  = !loading;
        if (this.signupSubmitBtn) this.signupSubmitBtn.interactable = !loading;
    }

    private _clearInputs() {
        if (this.loginEmailInput)     this.loginEmailInput.string     = '';
        if (this.loginPasswordInput)  this.loginPasswordInput.string  = '';
        if (this.signupUsernameInput) this.signupUsernameInput.string = '';
        if (this.signupEmailInput)    this.signupEmailInput.string    = '';
        if (this.signupPasswordInput) this.signupPasswordInput.string = '';
    }

    // firebase tool ──────────────────────────────────────────
    private getUserName():string {
        const fb = (window as any).firebase;
        const user = fb.auth().currentUser;
        let username:string = "";
        if (user) {
            fb.database()
                .ref("users/" + user.uid + "/username")
                .once("value")
                .then((snapshot) => {
                    username = snapshot.val();
                    console.log("username =", username);
                });
        }
        return username;
    }
    
    public onChangeUsernameClick() {
        const newName = this.usernameEditBox.string.trim();
        if (!newName) {
            this._setStatus("Please enter a name");
            return;
        }
        const fb = (window as any).firebase;
        const user = fb.auth().currentUser;
        if (!user) {
            this._setStatus("Not logged in");
            return;
        }
        Promise.all([
            user.updateProfile({
                displayName: newName
            }),
            fb.database()
                .ref("users/" + user.uid)
                .update({
                    username: newName
                })
        ])
        .then(() => {
            this._setStatus("Name updated successfully");
        })
        .catch((err) => {
            console.error(err);
            this._setStatus("Failed to update name");
        });
    }

    private loadPlayerStats() {
        const fb = (window as any).firebase;
        const user = fb.auth().currentUser;
        if (!user) return;
        fb.database()
            .ref("users/" + user.uid)
            .once("value")
            .then((snapshot) => {
                const data = snapshot.val();
                const username = data.username || "";
                const wins = data.wins || 0;
                const losses = data.losses || 0;
                const gamesPlayed = wins + losses;
                const winRate = gamesPlayed > 0? (wins / gamesPlayed * 100).toFixed(1) : "0.0";
                // Label
                this.userGamePlayed.string =
                    `Games Played: ${gamesPlayed}`;
                this.userWinRate.string =
                    `Win Rate: ${winRate}%`;
                // EditBox
                this.usernameEditBox.string = username;
            });
    }
}
