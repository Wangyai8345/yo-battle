import GroundMonkController from "./GroundMonkController";
import NetworkManager from "./NetworkManager";
import PlayerController from "./PlayerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ground_monk_hitbox extends cc.Component {

    // @property(cc.Node)
    // player: cc.Node = null;


    // isOtherPlayer(otherCollider: cc.Collider){
    //     return otherCollider.node.name !== this.player.name && 
    //            otherCollider.node.group === "player";
    // }

    // otherPlayerSessionId(otherCollider: cc.Collider){
    //     return otherCollider.getComponent(PlayerController).sessionId;
    // }


    // onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
    //     // if(otherCollider.node.name === "enemy"){
            
    //     if(this.isOtherPlayer(otherCollider)){
    //         const controller = this.player.getComponent(GroundMonkController);
            
    //         const facingDir = controller.getFacingDir();
    //         const comboStep = controller.getComboStep();
            
    //         switch(selfCollider.node.name){
    //             case "normalAttackHitBox":
    //                 NetworkManager.instance.attack(
    //                     "groundMonkNormalAttack",
    //                     this.otherPlayerSessionId(otherCollider),
    //                     otherCollider.node.x,
    //                     otherCollider.node.y
    //                 );

    //                 if(facingDir === 1) this.knockback(otherCollider.node,200,0)
    //                 else this.knockback(otherCollider.node,-200,0)
    //             break;

    //             case "defendHitBox":
    //                 if(facingDir === 1) this.knockback(otherCollider.node,50,0)
    //                 else this.knockback(otherCollider.node,-50,0)
    //             break;

    //             case "specialAttackHitBox":
    //                 NetworkManager.instance.attack(
    //                     "groundMonkSpecialAttack",
    //                     this.otherPlayerSessionId(otherCollider),
    //                     otherCollider.node.x,
    //                     otherCollider.node.y
    //                 );

    //                 if(facingDir === 1) this.knockback(otherCollider.node,50,200)
    //                 else this.knockback(otherCollider.node,-50,200)
    //             break;

    //             case "airAttackHitBox":
    //                 NetworkManager.instance.attack(
    //                     "groundMonkAirAttack",
    //                     this.otherPlayerSessionId(otherCollider),
    //                     otherCollider.node.x,
    //                     otherCollider.node.y
    //                 );

    //                 if(facingDir === 1) this.knockback(otherCollider.node,0,-200)
    //                 else this.knockback(otherCollider.node,0,-200)
    //             break;
    //         }
    //     }
    // }

    // knockback(enemyNode: cc.Node, knockbackX: number, knockbackY: number) {
    //     const rb = enemyNode.getComponent(cc.RigidBody);

    //     if (!rb) return;

    //     rb.linearVelocity = cc.v2(
    //         (knockbackX === 0)? rb.linearVelocity.x : knockbackX,
    //         (knockbackY === 0)? rb.linearVelocity.y : knockbackY,
    //     );
    // }
}
