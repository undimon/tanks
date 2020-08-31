import { Unit, MoveDirections } from "./unit";

export class UnitState {
    public unit: Unit;

    constructor(unit: Unit) {
        this.unit = unit;
    }

    public onEnter(): void {
    }

    public handleKeyDown(event: KeyboardEvent): void {
    }

    public handleKeyUp(event: KeyboardEvent): void {
    }

    public move(): void {
    }

    public update(): void {
    }

    public handleWallCollision(): void {
    }

    public handleUnitCollision(): void {
    }
}