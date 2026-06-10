// TODO: 換成你自己的 Firebase API Key
const API_KEY = 'YOUR_API_KEY_HERE';

// TODO: 換成你自己的 Realtime Database URL
const DB_URL  = 'https://YOUR_PROJECT-default-rtdb.firebaseio.com';

export interface UserInfo {
    uid: string;
    email: string;
    idToken: string;
    username: string;
}

function httpPost(url: string, body: object): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            if (data.error) reject(new Error(data.error.message));
            else resolve(data);
        };
        xhr.onerror = () => reject(new Error('網路錯誤'));
        xhr.send(JSON.stringify(body));
    });
}

function httpGet(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(new Error('網路錯誤'));
        xhr.send();
    });
}

function httpPut(url: string, body: object): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(new Error('網路錯誤'));
        xhr.send(JSON.stringify(body));
    });
}

export default class FirebaseService {

    static currentUser: UserInfo = null;

    static async register(email: string, password: string, username: string): Promise<UserInfo> {
        const data = await httpPost(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            { email, password, returnSecureToken: true }
        );
        const user: UserInfo = { uid: data.localId, email: data.email, idToken: data.idToken, username };
        FirebaseService.currentUser = user;
        // 儲存 username 到資料庫
        await httpPut(`${DB_URL}/users/${user.uid}.json?auth=${user.idToken}`, { username });
        return user;
    }

    static async login(email: string, password: string): Promise<UserInfo> {
        const data = await httpPost(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            { email, password, returnSecureToken: true }
        );
        const user: UserInfo = { uid: data.localId, email: data.email, idToken: data.idToken, username: '' };
        // 從資料庫讀取 username
        const userData = await httpGet(`${DB_URL}/users/${user.uid}.json`);
        user.username = (userData && userData.username) ? userData.username : email.split('@')[0];
        FirebaseService.currentUser = user;
        return user;
    }

    // TODO: 呼叫時需傳入分數（number），currentUser 必須已登入才會儲存
    // 這個是會員系統
    static async saveScore(score: number): Promise<void> {
        const user = FirebaseService.currentUser;
        if (!user) return;
        const username = user.username || user.email.split('@')[0];
        // 只保留最高分，若新分數較低則不覆蓋
        const existing = await httpGet(`${DB_URL}/scores/${user.uid}.json`);
        if (existing && typeof existing.score === 'number' && existing.score >= score) return;
        await httpPut(
            `${DB_URL}/scores/${user.uid}.json?auth=${user.idToken}`,
            { username, score }
        );
    }

    // TODO: 排行榜主要用這個函式，回傳 { username, score }[] 陣列，已按分數高到低排序
    // Firebase Realtime Database rule 需設定 scores 的 ".read": true 才能讀取
    static async getLeaderboard(): Promise<{ username: string; score: number }[]> {
        const data = await httpGet(`${DB_URL}/scores.json`);
        if (!data || data.error) return [];
        return Object.values(data as Record<string, any>)
            .filter(e => e && typeof e === 'object' && typeof e.score === 'number')
            .map(e => ({ username: e.username || '???', score: e.score }))
            .sort((a, b) => b.score - a.score);
    }
}
