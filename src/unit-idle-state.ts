import { UnitState } from "./unit-state";
import { Unit } from "./unit";
import { UnitMovingState } from "./unit-moving-state";

export class UnitIdleState extends UnitState {

    public onEnter(): void {
        this.unit.scale.set(1);
    }

    public handleKeyUp(key: any): void {
        this.onEnter();
    }

    public handleKeyDown(key: any): void {
        this.unit.changeState(this.unit.states.moving);
        this.unit.state.handleKeyDown(key);
    }

    public move(): void {
        this.unit.changeState(this.unit.states.moving);
        //this.unit.state = new UnitMovingState(this.unit);
        this.unit.state.move();
    }

    public update(): void {
    }
}