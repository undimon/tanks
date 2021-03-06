import { Container, ISize, Point, Texture } from "pixi.js";
import { GameObject, MoveDirections } from './game-object';
import { MVCEntity } from '../../../../framework/core/mvc/mvc-entity';

export class GameObjectView extends MVCEntity {
    protected owner: GameObject;
    public display: Container = new Container();
    public size: ISize;
    public speed = 0;
    public moveDirection: MoveDirections;

    public init(object: GameObject): void {
        this.owner = object;
    }

    /**
     * Place to clean up when object is being destoryed
     */
    public destroy(): void {
        this.display.destroy({ children:true });
    }
    
    public get x(): number {
        return this.display.x;
    }

    public get y(): number {
        return this.display.y;
    }    

    public set x(value: number) {
        if (!this.display) return;
        this.display.x = value;
    }

    public set y(value: number) {
        this.display.y = value;
    }

    public get center(): Point {
        return new Point(this.size.width / 2, this.size.height / 2);
    }
}