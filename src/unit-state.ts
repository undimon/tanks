import { Unit, MoveDirections } from "./unit";
import { State } from "./state";

export class UnitState extends State {
    public unit: Unit;

    constructor(args: any) {
        super(args);
        this.unit = args;
    }

    public enter(): void {
    }

    public execute(): void {

    }
}