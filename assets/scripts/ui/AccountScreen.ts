import AudioManager from '../AudioManager';

const { ccclass, property } = cc._decorator;

type AccountView = 'choice' | 'login' | 'signup';

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

    /** 從外部呼叫：開啟面板 */
    public open(onClose?: () => void) {
        this._onCloseCallback = onClose || null;
        this.node.active = true;
        this._showView('choice');
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
        AudioManager.playEffect('click', 0.7);

        const email    = this.loginEmailInput?.string.trim()    ?? '';
        const password = this.loginPasswordInput?.string.trim() ?? '';

        if (!email || !password) {
            this._setStatus('請填寫所有欄位');
            return;
        }

        this._setLoading(true);
        this._setStatus('登入中…');

        // ── TODO：接 Firebase Auth ────────────────────────
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //   .then(user => { this._onLoginSuccess({ email: user.email }); })
        //   .catch(err => { this._setStatus(err.message); this._setLoading(false); });
        //
        // 目前 UI 測試用：模擬 1 秒後成功
        this.scheduleOnce(() => {
            this._setLoading(false);
            this._onAccountSuccess({ email });
        }, 1);
    }

    // ── 按鈕回呼：SignupView 送出 ─────────────────────────

    onSignupSubmit() {
        if (this._loading) return;
        AudioManager.playEffect('click', 0.7);

        const username = this.signupUsernameInput?.string.trim() ?? '';
        const email    = this.signupEmailInput?.string.trim()    ?? '';
        const password = this.signupPasswordInput?.string.trim() ?? '';

        if (!username || !email || !password) {
            this._setStatus('請填寫所有欄位');
            return;
        }
        if (password.length < 6) {
            this._setStatus('密碼至少 6 個字元');
            return;
        }

        this._setLoading(true);
        this._setStatus('註冊中…');

        // ── TODO：接 Firebase Auth ────────────────────────
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(cred => cred.user.updateProfile({ displayName: username }))
        //   .then(() => { this._onAccountSuccess({ email, username }); })
        //   .catch(err => { this._setStatus(err.message); this._setLoading(false); });
        //
        // 目前 UI 測試用：模擬 1 秒後成功
        this.scheduleOnce(() => {
            this._setLoading(false);
            this._onAccountSuccess({ email, username });
        }, 1);
    }

    // ── 成功後 ────────────────────────────────────────────

    private _onAccountSuccess(user: { email: string; username?: string }) {
        this._setStatus(`歡迎，${user.username ?? user.email}！`);
        this.scheduleOnce(() => { this.close(); }, 1.2);
    }

    // ── 工具方法 ──────────────────────────────────────────

    private _setStatus(msg: string) {
        if (this.statusLabel) this.statusLabel.string = msg;
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
}
