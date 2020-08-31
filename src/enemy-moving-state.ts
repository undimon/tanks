import { UnitState } from "./unit-state";
import { Unit, MoveDirections } from "./unit";
import { UnitIdleState } from "./unit-idle-state";
import { Utils } from "./utils";
import { UnitMoveState } from "././unit-move-state

export class EnemyMoveState extends UnitMoveState {
    public speed = 2;

    public execute(): void {
        this.move();
    }

    // public onEnter(): void {
    //     super.onEnter();
        
    //     setInterval(() => {
    //         this.changeDirectionToRandom();
    //     }, 3000);
    // }

    public handleWallCollision(): void {
        super.handleWallCollision();
        this.changeDirectionToOpposite();
    }

    public handleUnitCollision(): void {
        super.handleUnitCollision();
        this.changeDirectionToOpposite();
    }

    public changeDirectionToOpposite(): void {
        this.moveDirection = this.moveDirection * -1;
    }

    public changeDirectionToRandom(): void {
        const key = Utils.randomInt(0, 3);
        if (key === 0) this.moveDirection = MoveDirections.Up;
        if (key === 1) this.moveDirection = MoveDirections.Down;
        if (key === 2) this.moveDirection = MoveDirections.Left;
        if (key === 3) this.moveDirection = MoveDirections.Right;
    }

    // public update(): void {

    // }
}