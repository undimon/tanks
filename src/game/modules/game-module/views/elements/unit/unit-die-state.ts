import { UnitState } from "./unit-state";

export class UnitDieState extends UnitState {
    public enter(): void { 
        super.enter();
        this.unit.canCollide = false;

        this.view.playDeathAnimation(() => {
            this.unit.destroy();
        });
    }

    // Ignoring these actions:
    public shoot(): void {
    }

    public handleCollisionWithOtherUnit(): void {
    } 

    public handleCollisionWithBullet(): void {
    }

    public stop(): void {
    }    

    public move(direction?: number): void {
    }
}