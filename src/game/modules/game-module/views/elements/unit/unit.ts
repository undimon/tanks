import gsap from "gsap";
import { FSM } from "../../../../../../framework/core/fsm/fsm";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { UnitState } from "./unit-state";

export enum UnitStates {
    Spawn,
    Idle,
    Move,
    Die
}

export class Unit extends GameObject {
    protected shootingDelay: number;
    protected canShoot: boolean = true;
    protected shootingDelayTween: GSAPTween;
    public speed: number;

    public onShoot: Function;

    public init(): void {
        this.fsm = new FSM();
    }

    protected get state(): UnitState {
        return this.fsm.state as UnitState;
    }

    protected shoot(): void {
        if (!this.canShoot) return;
        this.canShoot = false;

        this.state.shoot();
        
        if (this.shootingDelayTween) {
            this.shootingDelayTween.kill();
        }
        this.shootingDelayTween = gsap.delayedCall(this.shootingDelay, () => {
            this.canShoot = true;
        });
    }

    public move(): void {
        this.state.move();
    }

    public handleCollisionWith(object: GameObject): void {
        if (this.type === GameObjectTypes.Player && object.type === GameObjectTypes.Enemy) {
            this.state.handleCollisionWithOtherUnit(object);
        }
        if (object.type === GameObjectTypes.Bullet) {
            this.state.handleCollisionWithBullet(object);
        }
        if (object.type === GameObjectTypes.BrickWall || object.type === GameObjectTypes.StoneWall) {
            this.state.handleCollisionWithMapItem(object);
        }        
    }

    public update(): void {
        this.fsm.step();
    } 
}