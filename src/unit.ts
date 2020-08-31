import { UnitState } from "./unit-state";
import { UnitIdleState } from "./unit-idle-state";
import { Map } from "./map";
import { UnitMoveState } from "././unit-move-state
import { FSM } from "./fsm";

export enum UnitTypes {
    Player,
    Enemy
}

export enum MoveDirections {
    Up = 1,
    Down = -1,
    Left = 2,
    Right = -2
  }

export class Unit extends PIXI.Container {
    public type: UnitTypes;
    public fsm: FSM;
    public virtualSize: any = {
        width: 36,
        height: 36
    }; 

    public isHitTheWall: Function;
    public isHitTheUnit: Function;
    public shoot: Function;
    public skin: PIXI.Sprite;
    
    constructor(type: UnitTypes, texture: PIXI.Texture) {
        super();
        this.type = type;
        this.initView(texture);
        this.fsm = new FSM('idle', {
            idle: new UnitIdleState(this),
            move: new UnitMoveState(this)
        });
    }

    private initView(texture: PIXI.Texture): void {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1);
        
        setInterval(() => {
            this.shoot();
        }, 3000);
    }

    // Used by enemies
    public move(): void {
        //this.state.handleKeyUp(key);
    }

    // public isHitTheWall(): void {

    // }

    public handleCollision(direction: MoveDirections): void {

    }

    // public handleWallCollision(): void {
    //     this.state.handleWallCollision();
    // }

    public handleUnitCollision(): void {
        //this.state.handleUnitCollision();
    }

    public handleBulletCollision(): void {
        //Need to clear interval for bullets
    }

    public update(): void {
        this.fsm.step();    
    }
}