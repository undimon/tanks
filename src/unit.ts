import { UnitState } from "./unit-state";
import { UnitIdleState } from "./unit-idle-state";
import { Map } from "./map";
import { UnitMovingState } from "./unit-moving-state";

export enum UnitTypes {
    Player,
    Enemy
}
s
export enum MoveDirections {
    Up = 1,
    Down = -1,
    Left = 2,
    Right = -2
  }

export class Unit extends PIXI.Container {
    public type: UnitTypes;
    public fsm: FSM;
    public state: UnitState;
    public virtualSize: any = {
        width: 36,
        height: 36
    }; 
    public states: any = {
        idle: new UnitIdleState(this),
        moving: new UnitMovingState(this),
    }
    public skin: PIXI.Sprite;
    public handleShoot: Function;

    constructor(type: UnitTypes, texture: PIXI.Texture) {
        super();
        this.type = type;
        this.initView(texture);


        this.changeState(this.states.idle);
    }

    private initView(texture: PIXI.Texture): void {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1);
        
        setInterval(() => {
            this.handleShoot();
        }, 3000);
    }

    public changeState(state: UnitState): void {
        this.state = state;
        this.state.onEnter();
    }

    public handleKeyDown(event: KeyboardEvent): void {
        this.state.handleKeyDown(event);
    }

    public handleKeyUp(event: KeyboardEvent): void {
        this.state.handleKeyUp(event);
    }

    // Used by enemies
    public move(): void {
        //this.state.handleKeyUp(key);
    }

    public handleCollision(direction: MoveDirections): void {

    }

    public handleWallCollision(): void {
        this.state.handleWallCollision();
    }

    public handleUnitCollision(): void {
        this.state.handleUnitCollision();
    }

    public handleBulletCollision(): void {
        //Need to clear interval for bullets
    }

    public update(): void {

    }
}