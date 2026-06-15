const { ccclass, property } = cc._decorator;

@ccclass
export default class Damageable extends cc.Component {
    // @property
    // maxHp: number = 100;

    // @property
    // autoDestroyOnDeath: boolean = false;

    // @property
    // debugName: string = 'Enemy';

    // private hp: number = 0;
    // private dead: boolean = false;

    // onLoad() {
    //     this.hp = this.maxHp;
    // }

    // takeDamage(amount: number) {
    //     if (this.dead || amount <= 0) {
    //         return;
    //     }

    //     this.hp = Math.max(0, this.hp - amount);
    //     cc.log(`[Damageable] ${this.debugName} hp=${this.hp}/${this.maxHp}`);

    //     if (this.hp <= 0) {
    //         this.dead = true;
    //         this.node.emit('dead', this.node);

    //         if (this.autoDestroyOnDeath) {
    //             this.node.destroy();
    //         }
    //     }
    // }

    // getHpRatio(): number {
    //     if (this.maxHp <= 0) {
    //         return 0;
    //     }
    //     return this.hp / this.maxHp;
    // }

    // isDead(): boolean {
    //     return this.dead;
    // }
}
