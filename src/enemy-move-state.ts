import { UnitState } from "./unit-state";
import { Unit, MoveDirections } from "./unit";
import { UnitIdleState } from "./unit-idle-state";
import { Utils } from "./utils";
import { UnitMoveState } from "./unit-move-state";

export class EnemyMoveState extends UnitMoveState {
    public speed = 2;
    private hitsByDirection: any[] = [
        { direction: MoveDirections.Up, hits: 0 },
        { direction: MoveDirections.Down, hits: 0 },
        { direction: MoveDirections.Left, hits: 0 },
        { direction: MoveDirections.Right, hits: 0 },
    ];

    public enter(): void {
        super.enter();

        // setInterval(() => {
        //     this.changeDirectionToRandom();
        // }, 3000);
    }

    public execute(): void {
        //console.log(this.hitsByDirection);
        
        this.move();
    }

    private updateHitsByDirection(): void {
        this.hitsByDirection.map(item => { 
            if (item.direction === this.moveDirection) item.hits++
            return item;
        });
    }

    public handleWallCollision(): void {
        this.updateHitsByDirection();
        super.handleWallCollision();
        this.changeDirectionToOpposite();
    }

    public handleUnitCollision(): void {
        this.updateHitsByDirection();
        super.handleUnitCollision();
        this.changeDirectionToOpposite();
    }

    public changeDirectionToOpposite(): void {

        this.hitsByDirection.sort((a, b) => a.hits - b.hits);
        if (this.hitsByDirection[this.hitsByDirection.length - 1].hits > 2) {
            this.moveDirection = this.hitsByDirection[0].direction;
            this.hitsByDirection = this.hitsByDirection.map(item => ({ ...item, hits: 0 }));
        }
        else {
            this.moveDirection = this.moveDirection * -1;
        }
        
        console.log(this.hitsByDirection);
       
        //this.moveDirection = this.moveDirection * -1;
    }

    public changeDirectionToRandom(): void {
        const key = Utils.randomInt(0, 3);
        if (key === 0) this.moveDirection = MoveDirections.Up;
        if (key === 1) this.moveDirection = MoveDirections.Down;
        if (key === 2) this.moveDirection = MoveDirections.Left;
        if (key === 3) this.moveDirection = MoveDirections.Right;
    }
}