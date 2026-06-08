export default class AudioManager {
    private static clipCache: { [resource: string]: cc.AudioClip } = {};
    private static loadingCallbacks: { [resource: string]: Array<(clip: cc.AudioClip) => void> } = {};
    private static currentMusicResource: string = '';
    private static _sfxVolume: number = 0.5;

    static initVolumes() {
        try {
            const bgmStr = cc.sys.localStorage.getItem('vol_bgm');
            const sfxStr = cc.sys.localStorage.getItem('vol_sfx');
            const bgm = (bgmStr !== null && bgmStr !== '') ? parseFloat(bgmStr) : NaN;
            const sfx = (sfxStr !== null && sfxStr !== '') ? parseFloat(sfxStr) : NaN;
            cc.audioEngine.setMusicVolume(isNaN(bgm) ? 0.5 : bgm);
            AudioManager.setSfxVolume(isNaN(sfx) ? 0.5 : sfx);
        } catch (e) {
            cc.audioEngine.setMusicVolume(0.5);
            AudioManager.setSfxVolume(0.5);
        }
    }

    static setSfxVolume(vol: number) {
        AudioManager._sfxVolume = Math.max(0, Math.min(1, vol));
        cc.audioEngine.setEffectsVolume(AudioManager._sfxVolume);
    }

    static preload(resource: string, onLoaded?: (clip: cc.AudioClip) => void) {
        if (!resource) {
            return;
        }

        const cachedClip = AudioManager.clipCache[resource];
        if (cachedClip) {
            if (onLoaded) {
                onLoaded(cachedClip);
            }
            return;
        }

        if (onLoaded) {
            if (!AudioManager.loadingCallbacks[resource]) {
                AudioManager.loadingCallbacks[resource] = [];
            }
            AudioManager.loadingCallbacks[resource].push(onLoaded);
        }

        if (AudioManager.loadingCallbacks[resource] && AudioManager.loadingCallbacks[resource].length > 1) {
            return;
        }

        cc.loader.loadRes(resource, cc.AudioClip, (err: Error, clip: cc.AudioClip) => {
            const callbacks = AudioManager.loadingCallbacks[resource] || [];
            delete AudioManager.loadingCallbacks[resource];

            if (err || !clip) {
                cc.warn(`[AudioManager] Failed to load audio: ${resource}`, err);
                callbacks.forEach((callback) => callback && callback(null));
                return;
            }

            AudioManager.clipCache[resource] = clip;
            callbacks.forEach((callback) => callback && callback(clip));
        });
    }


    static playEffect(resource: string, volume: number = 1, loop: boolean = false): boolean {
        if (!resource) {
            console.log('DEBUG: NO RESOURCE');
            return false;
        }

        const playLoadedClip = (clip: cc.AudioClip) => {
            if (!clip) {
                return;
            }
            cc.audioEngine.play(clip, loop, Math.max(0, volume) * AudioManager._sfxVolume);
        };

        const cachedClip = AudioManager.clipCache[resource];
        if (cachedClip) {
            playLoadedClip(cachedClip);
            return true;
        }

        AudioManager.preload(resource, playLoadedClip);
        return true;
    }


    static stopMusic() {
        cc.audioEngine.stopMusic();
        AudioManager.currentMusicResource = '';
    }

    static playMusic(resource: string, loop: boolean = true) {
        if (!resource) {
            return;
        }

        if (cc.audioEngine.isMusicPlaying() && AudioManager.currentMusicResource === resource) {
            return;
        }

        const playLoadedClip = (clip: cc.AudioClip) => {
            if (!clip) {
                return;
            }
            AudioManager.currentMusicResource = resource;
            cc.audioEngine.playMusic(clip, loop);
        };

        const cachedClip = AudioManager.clipCache[resource];
        if (cachedClip) {
            playLoadedClip(cachedClip);
            return;
        }

        AudioManager.preload(resource, playLoadedClip);
    }
}
