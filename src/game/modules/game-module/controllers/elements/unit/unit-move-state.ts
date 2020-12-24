import { UnitState } from "./unit-state";
export class UnitMoveState extends UnitState {

    protected collisionsWithOtherUnit: number = 0;
    protected collisionsToStartIgnoreBounce: number = 3;
    protected collisionsToStopIgnoreBounce: number = 60;
    
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
        this.collisionsWithOtherUnit++;
        if (this.collisionsWithOtherUnit > this.collisionsToStopIgnoreBounce) {
            this.collisionsWithOtherUnit = 0;
        }

        if (this.collisionsWithOtherUnit < this.collisionsToStartIgnoreBounce) {
            this.handleCollision();
        }
    } 

    // Bounce back
    protected handleCollision(): void {
        this.view.playBounceBack();
        this.stop();
    }
}