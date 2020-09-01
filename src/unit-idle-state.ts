import { UnitState } from "./unit-state";
import { GameManager } from "./Index";

export class UnitIdleState extends UnitState {
    public enter(): void {
        this.unit.scale.set(1);
    }

    public execute(): void {
        const keys = GameManager.getInstance().keys;
       
        if (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight']) {
            this.unit.fsm.transition('move');
        }


    }
}