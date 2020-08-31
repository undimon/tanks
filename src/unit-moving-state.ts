import { UnitState } from "./unit-state";
import { MoveDirections } from "./unit";
import { UnitIdleState } from "./unit-idle-state";
import gsap from "gsap"; 
import { MapItemType } from "./map";

export class UnitMovingState extends UnitState {
    public moveDirection: MoveDirections = MoveDirections.Down;
    public speed = 5;

    public onEnter(): void {
        this.unit.scale.set(0.95);
    }

    public handleKeyDown(event: KeyboardEvent): void {

        if (event.key === 'ArrowUp') this.moveDirection = MoveDirections.Up
        if (event.key === 'ArrowDown') this.moveDirection = MoveDirections.Down;
        if (event.key === 'ArrowLeft') this.moveDirection = MoveDirections.Left;
        if (event.key === 'ArrowRight') this.moveDirection = MoveDirections.Right;
        this.move();
    }

    public handleKeyUp(key: any): void {
        this.unit.changeState(this.unit.states.idle);
        this.unit.state.handleKeyUp(key);
    }

    public move(): void {
        this.turnTo();
        this.moveTo();
        // if (this.hasHitTheWall) {
        //     this.handleCollision();
        // }
    }

    public handleWallCollision(): void {
        // Bounce back from wall
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    }

    public handleUnitCollision(): void {
        // Bounce back from wall
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    }

    public turnTo(): void {
        let angle: number;
        if (this.moveDirection === MoveDirections.Up) angle = 0;    
        if (this.moveDirection === MoveDirections.Down) {
            angle = -180;
            //if (this.moveDirection === MoveDirections.Right) angle = 180;     
        }
        if (this.moveDirection === MoveDirections.Left) angle = -90;   
        if (this.moveDirection === MoveDirections.Right) angle = 90;   
        gsap.to(this.unit.skin, { angle, duration: 0.3 });
    }

    public moveTo(): void {
        if (this.moveDirection === MoveDirections.Up) this.unit.y -= this.speed;
        if (this.moveDirection === MoveDirections.Down) this.unit.y += this.speed;
        if (this.moveDirection === MoveDirections.Left) this.unit.x -= this.speed;
        if (this.moveDirection === MoveDirections.Right) this.unit.x += this.speed;
    }

    // public isHitTheWall(): boolean {
    //     let isHit: boolean = false;
    //     this.unit.map.items.forEach(wall => {
    //         if (wall.type === MapItemType.EnemySpawnPoint) return;
    //         // let a = this.unit.getBounds();
    //         // let b = wall.getBounds();
    //         let a = this.unit;
    //         let b = wall;

    //         if (Math.abs(a.x - b.x) <= 25 && Math.abs(a.y - b.y) <= 25) { 
    //         //if (a.x + a.virtualSize.width > b.x && a.x < b.x + b.virtualSize.width && a.y + a.virtualSize.height > b.y && a.y < b.y + b.virtualSize.height) { 
    //             isHit = true;
    //             return;
    //         }
    //     });
    //     return isHit;
    // }

    public update(): void {

    }
}