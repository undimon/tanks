import { UnitState } from "./unit-state";
import { Unit } from "./unit";
export class UnitMoveState extends UnitState {
    
    public enter(): void {
        super.enter();
        this.view.playTurnAnimation();
    }

    public move(direction?: number): void {
        this.view.playTurnAnimation(direction);
        this.view.move();
    }

    public handleCollisionWithMapItem(): void {
        this.handleCollision();
    }

    public handleCollisionWithOtherUnit(): void {
        this.handleCollision();
    } 

    // Bounce back
    protected handleCollision(): void {
        this.view.playBounceBack();
        this.stop();
    }
}