import gsap from "gsap";
import { FSM } from "../../../../../../framework/core/fsm/fsm";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { UnitState } from "./unit-state";
import { UnitView } from './unit-view';

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
    
    public maxSpeed: number = 6;
    public minSpeed: number = 2;
    public immortalityDuration: number = 10;

    public speed: number;
    public life: number = 1;
    public isImmortal: boolean = false;

    public onShoot: Function;
    public onHitOrHeal: Function;

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
        if (object.type === GameObjectTypes.Water) {
            this.state.handleDeath(object);
        }
        if (object.type === GameObjectTypes.BrickWall || object.type === GameObjectTypes.StoneWall) {
            this.state.handleCollisionWithMapItem(object);
        }
        if (object.type === GameObjectTypes.BonusLife) {
            this.handleBonusLife();
        }                
        if (object.type === GameObjectTypes.BonusSlow) {
            this.handleBonusSpeed();
        }                
        if (object.type === GameObjectTypes.BonusSpeed) {
            this.handleBonusSlow();
        }
        if (object.type === GameObjectTypes.BonusImmortal) {
            this.handleBonusImmortal();
        }        
    }

    protected handleBonusLife(): void {
        this.life++;
        this.onHitOrHeal();
    }

    protected handleBonusSpeed(): void {
        if (this.speed > this.minSpeed) {
            this.speed--;
        }
    }

    protected handleBonusSlow(): void {
        if (this.speed < this.maxSpeed) {
            this.speed++;
        }
    }

    protected handleBonusImmortal(): void {
        if (this.isImmortal) return;
        this.isImmortal = true;
        
        (this.view as UnitView).playImmortalAnimation(this.immortalityDuration, () => {
            this.isImmortal = false;
        });
    }

    public update(): void {
        this.fsm.step();
    }
    
    public setPosition(x: number, y: number): void {
        this.x = x + 6;
        this.y = y + 6;
    }    
}