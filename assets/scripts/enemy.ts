const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    moveSpeed: number = 0;

    @property
    maxHP: number = 3;

    @property(cc.Node)
    leftCheck: cc.Node = null;

    @property(cc.Node)
    rightCheck: cc.Node = null;

    @property
    knockbackX: number = 300;

    @property
    knockbackY: number = 150;

    private rb: cc.RigidBody = null;

    private moveDir: number = -1;
    private hp: number = 0;
    private isKnockback: boolean = false;

    onLoad() {
        this.rb = this.getComponent(cc.RigidBody);
        this.hp = this.maxHP;
        cc.log("enemy group =", this.node.group);
    }

    update(dt) {
        if (!this.rb) return;

        if (!this.isKnockback) {
            this.rb.linearVelocity = cc.v2(
                0,
                this.rb.linearVelocity.y
            );
        }

        if (this.moveDir > 0) {
            this.node.scaleX = 1;
        }
        else {
            this.node.scaleX = -1;
        }
    }

    turnAround() {
        this.moveDir *= -1;
    }

    takeDamage(dmg: number) {

        this.hp -= dmg;

        cc.log("Enemy HP =", this.hp);

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 0.3);
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        cc.log("enemy contact:", otherCollider.node.group);
        if (otherCollider.node.group === "Wall") {
            this.turnAround();
        }
        if (otherCollider.node.name === "leftAttackHitBox"){
            console.log("left hit");
            this.knockback(-1, 1);
        }
        else if (otherCollider.node.name === "rightAttackHitBox"){
            console.log("right hit");
            this.knockback(1, 1);
        }
        else if (otherCollider.node.name === "upAttackHitBox"){
            console.log("top hit");
            this.knockback(0, 1);
        }
        else if (otherCollider.node.name === "downAttackHitBox"){
            console.log("down hit");
            this.knockback(0, -1);
        }
        else if (otherCollider.node.name === "rightJumpAttackHitBox"){
            console.log("right jump hit");
            this.knockback(0.5, 3);
        }
        else if (otherCollider.node.name === "leftJumpAttackHitBox"){
            console.log("left jump hit");
            this.knockback(-0.5, 3);
        }
    }

    knockback(dirX: number, dirY: number) {
        if (!this.rb) return;

        this.isKnockback = true;

        this.rb.linearVelocity = cc.v2(
            dirX * this.knockbackX,
            dirY * this.knockbackY
        );

        this.scheduleOnce(() => {
            this.isKnockback = false;
        }, 0.2);
    }


}