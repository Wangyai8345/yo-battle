// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ground_monk_hitbox extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.name === "enemy"){
            const playerController = this.player.getComponent("ground_monk_pctrl") as any;
            const facingDir = playerController.getFacingDir();
            const comboStep = playerController.getComboStep();
            switch(selfCollider.node.name){
                case "ground_monk":
                    playerController.takeDamage(1);
                break;
                case "normalHitBox":
                    if(facingDir === 1) this.knockback(otherCollider.node,200,0)
                    else this.knockback(otherCollider.node,-200,0)
                break;
                case "defendHitBox":
                    if(facingDir === 1) this.knockback(otherCollider.node,50,0)
                    else this.knockback(otherCollider.node,-50,0)
                break;
                case "specialAttackHitBox":
                    console.log("special");
                    if(facingDir === 1) this.knockback(otherCollider.node,50,200)
                        else this.knockback(otherCollider.node,-50,200)
                break;
                case "airAttackHitBox":
                    if(facingDir === 1) this.knockback(otherCollider.node,0,-200)
                        else this.knockback(otherCollider.node,0,-200)
                break;

            }
        }
    }
     knockback(enemyNode: cc.Node, knockbackX: number, knockbackY: number) {
        const rb = enemyNode.getComponent(cc.RigidBody);

        if (!rb) return;

        rb.linearVelocity = cc.v2(
            (knockbackX === 0)? rb.linearVelocity.x : knockbackX,
            (knockbackY === 0)? rb.linearVelocity.y : knockbackY,
        );
    }
}
