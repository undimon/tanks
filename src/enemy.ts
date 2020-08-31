import { UnitState } from "./unit-state";
import { Unit, MoveDirections } from "./unit";
import { Utils } from "./utils";
import { Map } from "./map";
import { EnemyMovingState } from "./enemy-moving-state";
import { UnitIdleState } from "./unit-idle-state";

export class Enemy extends Unit {

    public states: any = {
        idle: new UnitIdleState(this),
        moving: new EnemyMovingState(this),
    }

    public update(): void {
        this.state.move(); 
    }
}