import SharedHeroController from './SharedHeroController';
import Damageable from './Damageable';

const { ccclass, property } = cc._decorator;

@ccclass
export default class AttackHitbox extends cc.Component {
    // @property(SharedHeroController)
    // owner: SharedHeroController = null;

    // @property
    // damagePerHit: number = 20;

    // @property
    // debugLogHit: boolean = false;

    // private hitCache: { [key: string]: number } = {};

    // onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
    //     if (!this.owner || !this.owner.getIsAttacking()) {
    //         return;
    //     }

    //     const targetNode = otherCollider.node;
    //     const target = targetNode.getComponent(Damageable);
    //     if (!target || target.isDead()) {
    //         return;
    //     }

    //     const attackToken = this.owner.getAttackToken();
    //     const targetId = String(targetNode.uuid);
    //     if (this.hitCache[targetId] === attackToken) {
    //         return;
    //     }

    //     this.hitCache[targetId] = attackToken;
    //     target.takeDamage(this.damagePerHit);

    //     if (this.debugLogHit) {
    //         cc.log(`[AttackHitbox] hit ${targetNode.name} dmg=${this.damagePerHit} token=${attackToken}`);
    //     }
    // }
}
