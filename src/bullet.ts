import { UnitState } from "./unit-state";
import { UnitIdleState } from "./unit-idle-state";
import { Map } from "./map";
//import { UnitMovingState } from "./unit-move-state";
import { Unit, UnitTypes, MoveDirections } from "./unit";

export class Bullet extends PIXI.Container {
    public owner: Unit;
    public moveDirection: MoveDirections;
    public speed = 8;
    public virtualSize: any = {
        width: 5,
        height: 5
    }; 

    public skin: PIXI.Sprite;

    constructor(unit: Unit, texture: PIXI.Texture) {
        super();
        this.owner = unit;
        //this.moveDirection = this.owner.states.moving.moveDirection;
        this.initView(texture);

    }

    private initView(texture: PIXI.Texture): void {
        this.skin = new PIXI.Sprite(texture);
        this.skin.anchor.set(0.5);
        this.addChild(this.skin);
        this.pivot.set(this.virtualSize.width / 2 * -1, this.virtualSize.height / 2 * -1)        
    }

    public handleWallCollision(): void {
       
    }

    public handleUnitCollision(): void {
        
    }

    public update(): void {
        if (this.moveDirection === MoveDirections.Up) this.y -= this.speed;
        if (this.moveDirection === MoveDirections.Down) this.y += this.speed;
        if (this.moveDirection === MoveDirections.Left) this.x -= this.speed;
        if (this.moveDirection === MoveDirections.Right) this.x += this.speed;
    }
}