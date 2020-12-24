import gsap from "gsap";
import { ISize } from "pixi.js";
import { Utils } from "../../../../../../utils";
import { Config } from "../../../../misc/config";
import { GameObject, MoveDirections } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { GameObjectView } from "../../../misc/game-object-view";
import { IBulletParams } from "../bullet/bullet";
import { Unit } from "./unit";

export class UnitView extends GameObjectView {
    protected unit: Unit;
    
    public size: ISize = {
        width: 20,
        height: 20
    };

    public spawn: PIXI.AnimatedSprite;
    public explosion: PIXI.AnimatedSprite;
    public skin: PIXI.Sprite;
    
    public init(object: GameObject): void {
        super.init(object);
        this.unit = object as Unit;	
        
        this.initSkin();
        this.initExplosionAnimation();
        this.initSpawnAnimation();        

        this.playTurnAnimation(MoveDirections.Up);
    }

    protected initSkin(): void {
        let textureName: string = 'tank';

        if (this.unit.type === GameObjectTypes.Enemy) {
            textureName = `enemy${Utils.randomInt(1, 3)}`;
        }

        this.skin = new PIXI.Sprite(this.getTexture(Config.assets[textureName]));
        this.skin.anchor.set(0.5);
        this.skin.position = this.center;
        this.skin.visible = false;
        this.display.addChild(this.skin);
    }

    protected initExplosionAnimation(): void {
        this.explosion = new PIXI.AnimatedSprite(this.getSpriteTextures(Config.assets['explode'], 16, 68, 68));
        this.explosion.anchor.set(0.5);
        this.explosion.position = this.center;
        this.explosion.loop = false;
        this.explosion.visible = false;
        this.display.addChild(this.explosion);
    }

    protected initSpawnAnimation(): void {
        this.spawn = new PIXI.AnimatedSprite(this.getSpriteTextures(Config.assets['appear'], 10, 68, 68));
        this.spawn.anchor.set(0.5);
        this.spawn.position = this.center;
        this.spawn.loop = false;
        this.spawn.visible = false;
        this.display.addChild(this.spawn);
    }

    public getBulletParams(): IBulletParams {
        const offset: number = 25;
        let x: number = this.x + this.center.x;
        let y: number = this.y + this.center.y;
        if (this.moveDirection === MoveDirections.Up) y = this.y;    
        if (this.moveDirection === MoveDirections.Down) y = this.y + offset;
        if (this.moveDirection === MoveDirections.Left) x = this.x;  
        if (this.moveDirection === MoveDirections.Right) x = this.x + offset;

        return { owner: this.unit, x, y, moveDirection: this.moveDirection }
    }

    public playTurnAnimation(direction?: MoveDirections): void {
        if (direction && direction !== this.moveDirection) {
            this.moveDirection = direction;
        }

        let angle: number;

        if (this.moveDirection === MoveDirections.Up) {
            if (this.skin.angle === 270) this.skin.angle = -90;
            angle = 0;    
        }    
        if (this.moveDirection === MoveDirections.Down) {
            angle = 180;
        }
        if (this.moveDirection === MoveDirections.Left) { 
            if (this.skin.angle === 0) this.skin.angle = 360;
            angle = 270;   
        }
        if (this.moveDirection === MoveDirections.Right) {
            angle = 90;   
        }
        
        gsap.to(this.skin, { angle, duration: 0.1 });
    }

    public playIdleAnimation(): void {
        gsap.to(this.skin.scale, { duration: 0.1, x: 1, y: 1 });
    }

    public playMoveAnimation(): void {
        gsap.to(this.skin.scale, { duration: 0.1, x: 0.95, y: 0.95 });
    }

    public move(extra: number = 0): void {
        this.playMoveAnimation();
        if (this.moveDirection === MoveDirections.Up) this.display.y -= this.unit.speed + extra;
        if (this.moveDirection === MoveDirections.Down) this.display.y += this.unit.speed + extra;
        if (this.moveDirection === MoveDirections.Left) this.display.x -= this.unit.speed + extra;
        if (this.moveDirection === MoveDirections.Right) this.display.x += this.unit.speed + extra;
    }

    public changeMoveDirectionToOpposite(): void {
        this.moveDirection = this.moveDirection * -1;
    }

    public playBounceBack(): void {
        this.changeMoveDirectionToOpposite();
        this.move(2);
        this.changeMoveDirectionToOpposite();
    }

    public playDeathAnimation(onComplete: Function): void {
        this.playSound(Config.assets['soundExplode']);

        gsap.to(this.skin, { duration: 0.3, alpha: 0 });

        this.explosion.visible = true;
        this.explosion.play();
        this.explosion.onComplete = () => onComplete();
    }

    public playSpawnAnimation(onComplete: Function): void {
        this.spawn.visible = true;
        this.spawn.play();
        this.spawn.onComplete = () => {
            this.spawn.visible = false;
            this.skin.visible = true;
            onComplete();
        };
    }

    public playImmortalAnimation(totalDuration: number, onComplete: Function): void {
        const duration: number = 0.2;
        const repeat: number = totalDuration / duration;
        gsap.fromTo(this.skin, { alpha: 0.6 }, { 
            alpha: 1, 
            duration,
            yoyo: true, 
            repeat, 
            onComplete: () => onComplete() 
        });
    }
}