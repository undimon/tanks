import { UnitState } from "./unit-state";
import { UnitIdleState } from "./unit-idle-state";
import { Map } from "./map";
import { UnitMoveState } from "././unit-move-state";
import { FSM } from "./fsm";
import { Bullet } from "./bullet";

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

    public lookDirection: MoveDirections = MoveDirections.Up;
    public isHitTheWall: Function;
    public isHitTheUnit: Function;
    public isHitTheBullet: Function;
    public shoot: Function;
    public skin: PIXI.Sprite;
    
    constructor(texture: PIXI.Texture) {
        super();
        this.initView(texture);
    }

    private initView(texture: PIXI.Texture): void {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1);
    }

    public setBulletInitialPosition(bullet: Bullet): void {
        bullet.x = this.x + this.virtualSize.width / 2;
        bullet.y = this.y + this.virtualSize.height / 2;
        if (this.lookDirection === MoveDirections.Up) bullet.y = this.y;    
        if (this.lookDirection === MoveDirections.Down) bullet.y = this.y + this.virtualSize.height;
        if (this.lookDirection === MoveDirections.Left) bullet.x = this.x;  
        if (this.lookDirection === MoveDirections.Right) bullet.x = this.x + this.virtualSize.width;
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