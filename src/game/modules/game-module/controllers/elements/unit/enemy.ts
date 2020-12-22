import { Unit, UnitStates } from "./unit";
import { EnemyMoveState } from "./enemy-move-state";
import { UnitDieState } from "./unit-die-state";
import { UnitIdleState } from "./unit-idle-state";
import { UnitSpawnState } from "./unit-spawn-state";
import { UnitView } from "./unit-view";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { MoveDirections } from "../../../misc/game-object";

export class Enemy extends Unit {

    public init(): void {
        super.init();

        this.type = GameObjectTypes.Enemy;
        this.shootingDelay = 2;
        this.speed = 2;

        this.initView(UnitView, this);

        this.fsm.registerStates({
            [UnitStates.Spawn]: new UnitSpawnState(this),
            [UnitStates.Idle]: new UnitIdleState(this),
            [UnitStates.Move]: new EnemyMoveState(this),
            [UnitStates.Die]: new UnitDieState(this)
        });    
    }    

    public update(): void {
        super.update();
        this.shoot();
        this.move();
    }
}