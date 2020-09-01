import { UnitState } from "./unit-state";
import { Unit, UnitTypes } from "./unit";
import { FSM } from "./fsm";
import { EnemyIdleState } from "./enemy-idle-state";
import { EnemyMoveState } from "./enemy-move-state";

export class Enemy extends Unit {
    constructor(type: UnitTypes, texture: PIXI.Texture) {
        super(type, texture);
        this.fsm = new FSM({
            idle: new EnemyIdleState(this),
            move: new EnemyMoveState(this)
        });
    }
}