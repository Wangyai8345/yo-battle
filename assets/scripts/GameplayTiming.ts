const TARGET_GAMEPLAY_HZ = 120;
const MIN_SAMPLED_DT = 1 / 240;
const MAX_SAMPLED_DT = 1 / 30;
const FRAME_DT_SMOOTHING = 0.15;

let smoothedFrameDt = 1 / TARGET_GAMEPLAY_HZ;
let hasTimingSample = false;

function clampSampledDt(dt: number): number {
    if (!Number.isFinite(dt) || dt <= 0) {
        return smoothedFrameDt;
    }

    return cc.misc.clampf(dt, MIN_SAMPLED_DT, MAX_SAMPLED_DT);
}

export function updateGameplayTiming(dt: number): void {
    const sampledDt = clampSampledDt(dt);
    if (!hasTimingSample) {
        smoothedFrameDt = sampledDt;
        hasTimingSample = true;
        return;
    }

    smoothedFrameDt = cc.misc.lerp(smoothedFrameDt, sampledDt, FRAME_DT_SMOOTHING);
}

export function getGameplayFrameScale(): number {
    if (!hasTimingSample) {
        return 1;
    }

    return cc.misc.clampf(smoothedFrameDt * TARGET_GAMEPLAY_HZ, 0.5, 4);
}

export function getScaledGameplayDt(dt: number): number {
    return Math.max(0, dt) * getGameplayFrameScale();
}
