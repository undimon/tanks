import { UnitState } from "./unit-state";

export class UnitIdleState extends UnitState {
    
    public enter(): void {
        super.enter();
        this.view.playIdleAnimation();
    }

    public handleCollisionWithMapItem(): void {
    }
    
    public handleCollisionWithOtherUnit(): void {
    }

    public stop(): void {
    }
}