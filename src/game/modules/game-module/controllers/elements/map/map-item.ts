import { Container, Graphics, IPoint, ISize, Point, Sprite, Texture } from "pixi.js";
import { AppManager } from "../../../../../../framework/core/app-manager";
import { Config } from "../../../../misc/config";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";

export class MapItem extends GameObject {
    public display: Container = new Container();
    protected skin: Sprite;
    public eagleExplosion: PIXI.AnimatedSprite;
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

        let texture: string;
        if (type === GameObjectTypes.BrickWall) {
            texture = 'brickWall';
        }        
        if (type === GameObjectTypes.StoneWall) {
            texture = 'stoneWall';
        }
        if (type === GameObjectTypes.Tree) {
            texture = 'tree';
        }        
        if (type === GameObjectTypes.Water) {
            texture = 'water';
        }  
        if (type === GameObjectTypes.Eagle) {
            texture = 'eagle';
            this.initEagleExplosionAnimation();
        }
        if (type === GameObjectTypes.BonusSpeed) {
            texture = 'bonusSpeed';
        }  
        if (type === GameObjectTypes.BonusSlow) {
            texture = 'bonusSlow';
        }  
        if (type === GameObjectTypes.BonusLife) {
            texture = 'bonusLife';
        }  
        if (type === GameObjectTypes.BonusImmortal) {
            texture = 'bonusImmortal';
        }  

        this.skin = new Sprite(AppManager.getInstance().getTexture(Config.assets[texture]));   
        this.skin.width = this.size.width;     
        this.skin.height = this.size.height;     
        this.display.addChildAt(this.skin, 0);            
    }

    protected initEagleExplosionAnimation(): void {
        this.eagleExplosion = new PIXI.AnimatedSprite(AppManager.getInstance().getSpriteTextures(Config.assets['explode'], 16, 68, 68));
        this.eagleExplosion.anchor.set(0.5);
        this.eagleExplosion.x = this.size.width / 2;
        this.eagleExplosion.y = this.size.height / 2;
        this.eagleExplosion.loop = false;
        this.eagleExplosion.visible = false;
        this.display.addChild(this.eagleExplosion);
    }    

    public playEagleExposioAnimation(onComplete: Function): void {
        this.eagleExplosion.visible = true;
        this.eagleExplosion.play();
        this.eagleExplosion.onComplete = () => onComplete();
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
        if (object.type === GameObjectTypes.Bullet) {
            if (this.type === GameObjectTypes.BrickWall || this.type === GameObjectTypes.Eagle) {
                this.destroy();
            }   
        }

        if (object.type === GameObjectTypes.Player || object.type === GameObjectTypes.Enemy) {
            if (this.type === GameObjectTypes.BonusImmortal || 
                this.type === GameObjectTypes.BonusLife ||
                this.type === GameObjectTypes.BonusSlow||
                this.type === GameObjectTypes.BonusSpeed) {
                this.destroy();
            }
        }
    }

    public destroy(): void {
        if (this.type === GameObjectTypes.Eagle) {
            this.playEagleExposioAnimation(() => {
                super.destroy();
                this.display.destroy({ children: true });
            });
            return;
        }

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