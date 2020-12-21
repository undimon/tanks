import { MoveDirections } from "../../../misc/game-object";
import { UnitMoveState } from "./unit-move-state";

export class EnemyMoveState extends UnitMoveState {
    
    // Collects the number of collisions with other objects for each direction
    protected hitsByDirection: any[] = [
        { direction: MoveDirections.Up, hits: 0 },
        { direction: MoveDirections.Down, hits: 0 },
        { direction: MoveDirections.Left, hits: 0 },
        { direction: MoveDirections.Right, hits: 0 },
    ];

    protected handleCollision(): void {
        this.updateHitsByDirection();
        super.handleCollision();
        this.changeDirectionToOpposite();
    }
    
    protected updateHitsByDirection(): void {
        this.hitsByDirection.map(item => { 
            if (item.direction === this.view.moveDirection) item.hits++
            return item;
        });
    }

    protected changeDirectionToOpposite(): void {
        this.hitsByDirection.sort((a, b) => a.hits - b.hits);
        
        if (this.hitsByDirection[this.hitsByDirection.length - 1].hits > 2) {
            this.view.moveDirection = this.hitsByDirection[0].direction;
            this.hitsByDirection = this.hitsByDirection.map(item => ({ ...item, hits: 0 }));
        }
        else {
            this.view.changeMoveDirectionToOpposite();
        }

        this.view.playTurnAnimation();
    }
}