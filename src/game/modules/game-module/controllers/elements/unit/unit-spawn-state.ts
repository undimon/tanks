import { UnitState } from "./unit-state";

export class UnitSpawnState extends UnitState {
    public enter(): void { 
        super.enter();
        this.unit.canCollide = false;

        this.view.playSpawnAnimation(() => {
            this.stop();
        });
    }

    // Ignoring these actions:
    public shoot(): void {
    }

    public handle(): void {
    } 

    public handleCollisionWithBullet(): void {
    }

    public move(direction?: number): void {
    }    
}