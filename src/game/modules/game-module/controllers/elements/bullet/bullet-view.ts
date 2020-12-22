import { ISize, Sprite } from 'pixi.js';
import { Config } from "../../../../misc/config";
import { AppManager } from "../../../../../../framework/core/app-manager";
import { GameObject, MoveDirections } from "../../../misc/game-object";
import { GameObjectView } from '../../../misc/game-object-view';
import { IBulletParams } from './bullet';

export class BulletView extends GameObjectView {

    public speed = 8;
    public size: ISize = {
        width: 5,
        height: 5
    }; 
    
    protected skin: Sprite;
    public explosion: PIXI.AnimatedSprite;
    
    public init(object: GameObject): void {
        super.init(object);
    }

    public createBullet(params: IBulletParams): void {
        //const bulletName: string = this.unit.type === UnitTypes.Player ? Config.assets['bullet'] : Config.assets['enemyBullet'];
        const bulletName: string = Config.assets['bullet'];
        this.skin = new Sprite(AppManager.getInstance().getTexture(bulletName));
        this.skin.anchor.set(0.5);
        this.skin.scale.set(0.5);
        this.display.addChild(this.skin);        

        this.display.x = params.x;
        this.display.y = params.y;
        this.moveDirection = params.moveDirection;
        
        this.initExplosionAnimation();
    }

    public playExplosionAnimation(onComplete: Function): void {
        this.skin.visible = false;
        this.speed = 0;
        this.explosion.x = this.skin.x;
        this.explosion.y = this.skin.y;
        this.explosion.visible = true;
        this.explosion.play();
        this.explosion.onComplete = () => {
            onComplete();
        }
    }

    protected initExplosionAnimation(): void {
        this.explosion = new PIXI.AnimatedSprite(AppManager.getInstance().getSpriteTextures(Config.assets['explode'], 16, 68, 68));
        this.explosion.anchor.set(0.5);
        this.explosion.scale.set(0.5);
        this.explosion.loop = false;
        this.explosion.visible = false;
        this.display.addChild(this.explosion);
    }

    protected move(): void {
        if (this.moveDirection === MoveDirections.Up) this.y -= this.speed;
        if (this.moveDirection === MoveDirections.Down) this.y += this.speed;
        if (this.moveDirection === MoveDirections.Left) this.x -= this.speed;
        if (this.moveDirection === MoveDirections.Right) this.x += this.speed;
    }

    public update(): void {
        this.move();
    }  
}