import { AppManager } from "./framework/core/app-manager";
import { UnitState } from "./unit-state";

export class UnitIdleState extends UnitState {
    public enter(): void {
        this.unit.scale.set(1);
    }

    public execute(): void {
        const keys = AppManager.getInstance().keys;
       
        if (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']) {
            this.unit.fsm.transition('move');
        }
    }
}