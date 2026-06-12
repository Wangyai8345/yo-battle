export function configurePhysicsTiming(): void {
    const physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;

    // Keep physics simulation running at a fixed 120 Hz so gameplay
    // stays consistent across 60 Hz and 120 Hz displays.
    physicsManager.enabledAccumulator = true;
    cc.PhysicsManager.FIXED_TIME_STEP = 1 / 120;
    cc.PhysicsManager.MAX_ACCUMULATOR = 1 / 10;
}
