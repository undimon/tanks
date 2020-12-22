import { UnitIdleState } from "./unit-idle-state";
import { UnitDieState } from "./unit-die-state";
import { UnitMoveState } from "./unit-move-state";
import { UnitSpawnState } from "./unit-spawn-state";
import { UnitView } from "./unit-view";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { Unit, UnitStates } from "./unit";
import { MoveDirections } from "../../../misc/game-object";

export class Player extends Unit {

    public init(): void {
        super.init();

        this.type = GameObjectTypes.Player;
        this.shootingDelay = 0.5;
        this.speed = 2;

        this.initView(UnitView, this);

        this.fsm.registerStates({
            [UnitStates.Spawn]: new UnitSpawnState(this),
            [UnitStates.Idle]: new UnitIdleState(this),
            [UnitStates.Move]: new UnitMoveState(this),
            [UnitStates.Die]: new UnitDieState(this)
        });    
    }

    protected handleInput(): void {
        const keys = this.getInput();

        if (keys['Space']) {
            this.shoot();
        }
        else {
            this.canShoot = true;
        }

        if (!(keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'])) {
            this.state.stop();
        }

        if (keys['ArrowUp']) { 
            this.state.move(MoveDirections.Up);
        }
        else if (keys['ArrowDown']) { 
            this.state.move(MoveDirections.Down);
        }
        else if (keys['ArrowLeft']) { 
            this.state.move(MoveDirections.Left);
        }
        else if (keys['ArrowRight']) { 
            this.state.move(MoveDirections.Right);
        }
    }

    public update(): void {
        super.update();
        this.handleInput();
    }
}