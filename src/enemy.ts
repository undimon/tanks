import { UnitState } from "./unit-state";
import { Unit, UnitTypes } from "./unit";
import { FSM } from "./framework/core/fsm/fsm";
import { EnemyIdleState } from "./enemy-idle-state";
import { EnemyMoveState } from "./enemy-move-state";

export class Enemy extends Unit {
    private shootingInterval: any;

    constructor(texture: PIXI.Texture) {
        super(texture);
        this.type = UnitTypes.Enemy;
        this.fsm = new FSM({
            idle: new EnemyIdleState(this),
            move: new EnemyMoveState(this)
        });

        this.shootingInterval = setInterval(() => {
            this.shoot();
        }, 3000);
    }

    
    public update(): void {
        super.update();

        if (this.isHitTheBullet()) {
            console.log('enemy died');
            clearInterval(this.shootingInterval);
        }
    }
}