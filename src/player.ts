import { UnitState } from "./unit-state";
import { UnitIdleState } from "./unit-idle-state";
import { Map } from "./map";
import { UnitMoveState } from "./unit-move-state";
import { FSM } from "./framework/core/fsm/fsm";
import { Bullet } from "./bullet";
import { UnitTypes, Unit } from "./unit";
import { AppManager } from "./framework/core/app-manager";

export class Player extends Unit {

    constructor(texture: PIXI.Texture) {
        super(texture);
        this.type = UnitTypes.Player;
        this.fsm = new FSM({
            idle: new UnitIdleState(this),
            move: new UnitMoveState(this)
        });
    }

    public update(): void {
        super.update();

        if (this.isHitTheBullet()) {
            console.log('player died');
        }

        const keys = AppManager.getInstance().keys;
        //console.log(keys);
        
        if (keys['Space']) {
            this.shoot();
            //this.unit.fsm.transition('idle');
            return;
        }
        
    }
}