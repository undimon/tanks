import { UnitState } from "./unit-state";
import { Unit, MoveDirections } from "./unit";
import { UnitIdleState } from "./unit-idle-state";
import { Utils } from "./utils";
import { UnitMovingState } from "./unit-moving-state";

export class EnemyMovingState extends UnitMovingState {
    public speed = 2;

    public onEnter(): void {
        super.onEnter();
        
        setInterval(() => {
            this.changeDirectionToRandom();
        }, 3000);
    }

    public handleKeyUp(key: any): void {  
    }

    public handleKeyDown(key: any): void {
    }

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

    public update(): void {

    }
}