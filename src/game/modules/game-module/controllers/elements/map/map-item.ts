import gsap from "gsap";
import { Container, ISize, Sprite } from "pixi.js";
import { Config } from "../../../../misc/config";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";

export class MapItem extends GameObject {
    public display: Container = new Container();
    protected skin: Sprite;
    public explosion: PIXI.AnimatedSprite;
    protected _size: ISize = {
        width: 32,
        height: 32
    }

    constructor(type: GameObjectTypes, x: number, y: number) {
        super();
        this.type = type;   

        this.display.x = x * this.size.width;
        this.display.y = y * this.size.height;

        if (type === GameObjectTypes.EnemySpawnPoint || type === GameObjectTypes.PlayerSpawnPoint) {
            return;
        };

        if (type === GameObjectTypes.BrickWall) {
            this.initSkin('brickWall');
        }        
        if (type === GameObjectTypes.StoneWall) {
            this.initSkin('stoneWall');
        }
        if (type === GameObjectTypes.Tree) {
            this.initSkin('tree');
        }        
        if (type === GameObjectTypes.Water) {
            this.initSkin('water');
        }  
    }

    protected initSkin(texture: string): void {
        this.skin = new Sprite(this.getTexture(Config.assets[texture]));   
        this.skin.width = this.size.width;     
        this.skin.height = this.size.height;     
        this.display.addChildAt(this.skin, 0); 
    }

    // Check collisions only with these types
    public checkCollisionWith(object: GameObject): void {
        if (object.type === GameObjectTypes.Bullet || 
            object.type === GameObjectTypes.Player || 
            object.type === GameObjectTypes.Enemy) {
            super.checkCollisionWith(object);
        }
    }   
    
    public handleCollisionWith(object: GameObject): void {
        if (this.type === GameObjectTypes.BrickWall && object.type === GameObjectTypes.Bullet) {
            this.destroy();
        }
    }

    public destroy(): void {
        super.destroy();
        this.display.destroy({ children: true });
    }

    public addToStage(holder: Container): void {
        holder.addChild(this.display);
    }

    public get size(): ISize {
        return this._size;
    }

    public get x(): number {
        return this.display.x;
    }

    public get y(): number {
        return this.display.y;
    }
}