import { State } from "../../../../../../framework/core/fsm/state";
import { GameObject } from "../../../misc/game-object";
import { Unit, UnitStates } from "./unit";
import { UnitView } from "./unit-view";

export class UnitState extends State {
    public unit: Unit;
    
    constructor(args: any) {
        super(args);
        this.unit = args;
    }

    public get view(): UnitView {
        return this.unit.view as UnitView;
    }

    public enter(): void {
        this.unit.canCollide = true;
    }

    public stop(): void {
        this.unit.fsm.transition(UnitStates.Idle);
    }

    public move(direction?: number): void {
        this.unit.fsm.transition(UnitStates.Move);
    }

    public shoot(): void {
        this.unit.onShoot(this.view.getBulletParams());
    }    

    public handleCollisionWithMapItem(object: GameObject): void {
    } 

    public handleCollisionWithOtherUnit(object: GameObject): void {
    } 

    public handleCollisionWithBullet(bullet: GameObject): void {
        // Prevent enemies from killing each other
        if (bullet.owner.type === this.unit.type) return;
        
        this.unit.fsm.transition(UnitStates.Die);
    }    
}