import { UnitState } from "./unit-state";
import { Unit, MoveDirections, UnitTypes } from "./unit";
import { Utils } from "./utils";
import { Map } from "./map";
// import { EnemyMovingState } from "./enemy-moving-state";
import { UnitIdleState } from "./unit-idle-state";
import { FSM } from "./fsm";
import { UnitMoveState } from "./unit-move-state";
import { EnemyMoveState } from "./enemy-moving-state";

export class Enemy extends Unit {

    constructor(type: UnitTypes, texture: PIXI.Texture) {
        super(type, texture);
        this.fsm = new FSM('idle', {
            idle: new UnitIdleState(this),
            move: new EnemyMoveState(this)
        });
    }

    // public states: any = {
    //     idle: new UnitIdleState(this),
    //     moving: new EnemyMovingState(this),
    // }

    // public update(): void {
    //     this.state.move(); 
    // }
}