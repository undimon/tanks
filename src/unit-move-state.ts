import { UnitState } from "./unit-state";
import { MoveDirections } from "./unit";
import gsap from "gsap"; 
import { GameManager } from "./Index";

export class UnitMoveState extends UnitState {
    public moveDirection: MoveDirections = MoveDirections.Down;
    public speed = 2;

    public enter(): void {
        this.unit.scale.set(0.95);
    }

    public execute(): void {
        super.execute();
        const keys = GameManager.getInstance().keys;
        if (!(keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'])) {
            this.unit.fsm.transition('idle');
            return;
        }

        if (keys['ArrowUp']) this.moveDirection = MoveDirections.Up;
        if (keys['ArrowDown']) this.moveDirection = MoveDirections.Down;
        if (keys['ArrowLeft']) this.moveDirection = MoveDirections.Left;
        if (keys['ArrowRight']) this.moveDirection = MoveDirections.Right;
        
        this.move();
    }

    public move(): void {
        this.turnTo();
        this.moveTo();
        if (this.unit.isHitTheWall()) this.handleWallCollision();        
        if (this.unit.isHitTheUnit()) this.handleUnitCollision();        
    }

    public handleWallCollision(): void {
        // Bounce back
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    }

    public handleUnitCollision(): void {
        // Bounce back
        this.moveDirection = this.moveDirection * -1;
        this.moveTo();
        this.moveDirection = this.moveDirection * -1;
    }

    public turnTo(): void {
        let angle: number;
        if (this.moveDirection === MoveDirections.Up) {
            angle = 0;
            if (this.unit.lookDirection === MoveDirections.Left) {
                angle = 300;
            }     
        }    
        if (this.moveDirection === MoveDirections.Down) angle = 180;
        if (this.moveDirection === MoveDirections.Left) angle = 270;   
        if (this.moveDirection === MoveDirections.Right) angle = 90;   
        gsap.to(this.unit.skin, { angle, duration: 0.3 });

        this.unit.lookDirection = this.moveDirection;
    }

    public moveTo(): void {
        if (this.moveDirection === MoveDirections.Up) this.unit.y -= this.speed;
        if (this.moveDirection === MoveDirections.Down) this.unit.y += this.speed;
        if (this.moveDirection === MoveDirections.Left) this.unit.x -= this.speed;
        if (this.moveDirection === MoveDirections.Right) this.unit.x += this.speed;
    }
}