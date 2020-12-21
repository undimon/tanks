import { Container, ISize } from "pixi.js";
import { AppManager } from "../../../../framework/core/app-manager";
import { FSM } from "../../../../framework/core/fsm/fsm";
import { GameObjectTypes } from "./game-object-types";
import { GameObjectView } from "./game-object-view";

export class GameObject {
    public type: GameObjectTypes;
    public owner: GameObject; 
    public fsm: FSM;
    public view: GameObjectView;

    public canCollide: boolean = true;
    public isDestroyed: boolean = false;

    public onDestroy: Function;

    /**
     * Place to initialize view and other properties
     */
    public init(args?: any): void {  
    }

    public initView(viewClass: typeof GameObjectView, object: GameObject): void {
        this.view = new viewClass();
        this.view.init(object);
    }

    public destroy(): void {
        this.onDestroy();
        if (this.view) {
            this.view.destroy();
        }
        this.isDestroyed = true;
    }

    public update() {
    }
    
    public get size(): ISize {
        return this.view.size;
    }

    public get x(): number {
        return this.view.x;
    }

    public get y(): number {
        return this.view.y;
    }

    public set x(value: number) {
        this.view.x = value;
    }

    public set y(value: number) {
        this.view.y = value;
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public addToStage(holder: Container): void {
        holder.addChild(this.view.display);
    }

    protected getInput(): any {
        return AppManager.getInstance().keys;
    }

    /**
     * Checks for collision with other object. If true - calls both objects collision handler methods
     */
    public checkCollisionWith(object: GameObject): void {
        // Object can be destoryed but still present in current update list
        if (this.isDestroyed || object.isDestroyed) return;
        // Object can be in state when he is not collidable (dying, spawning etc)
        if (!this.canCollide || !object.canCollide) return;
        // No need to check collision btween the same object
        if (this === object) return;

        // Checks for collision, true means there is no collision 
        if (this.y > object.y + object.size.height || this.x + this.size.width < object.x || this.y + this.size.height < object.y || this.x > object.x + object.size.width) {
            return;
        }
        
        this.handleCollisionWith(object);
        object.handleCollisionWith(this);
    }
    
    /**
     * Called when there is a collision with other object
     */
    public handleCollisionWith(object: GameObject) {
    }
}

export enum MoveDirections {
    Up = 1,
    Down = -1,
    Left = 2,
    Right = -2
}