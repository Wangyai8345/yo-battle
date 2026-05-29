export interface AudioEffectOptions {
    volume?: number;
    loop?: boolean;
}

export default class AudioManager {
    private static clipCache: { [resource: string]: cc.AudioClip } = {};
    private static loadingCallbacks: { [resource: string]: Array<(clip: cc.AudioClip) => void> } = {};
    private static currentMusicResource: string = '';

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

    static playEffect(resource: string, options?: AudioEffectOptions): boolean {
        if (!resource) {
            return false;
        }

        const playLoadedClip = (clip: cc.AudioClip) => {
            if (!clip) {
                return;
            }
            const requestedVolume = options && options.volume !== undefined ? options.volume : 1;
            cc.audioEngine.play(clip, !!(options && options.loop), Math.max(0, requestedVolume));
        };

        const cachedClip = AudioManager.clipCache[resource];
        if (cachedClip) {
            playLoadedClip(cachedClip);
            return true;
        }

        AudioManager.preload(resource, playLoadedClip);
        return true;
    }

    static playMusic(resource: string, volume: number = 1, loop: boolean = true) {
        if (!resource) {
            return;
        }

        if (cc.audioEngine.isMusicPlaying() && AudioManager.currentMusicResource === resource) {
            cc.audioEngine.setMusicVolume(volume);
            return;
        }

        const playLoadedClip = (clip: cc.AudioClip) => {
            if (!clip) {
                return;
            }
            AudioManager.currentMusicResource = resource;
            cc.audioEngine.playMusic(clip, loop);
            cc.audioEngine.setMusicVolume(volume);
        };

        const cachedClip = AudioManager.clipCache[resource];
        if (cachedClip) {
            playLoadedClip(cachedClip);
            return;
        }

        AudioManager.preload(resource, playLoadedClip);
    }
}