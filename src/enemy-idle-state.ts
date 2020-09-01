import { UnitIdleState } from "./unit-idle-state";

export class EnemyIdleState extends UnitIdleState {
    public execute(): void {
        this.unit.fsm.transition('move');
    }
}