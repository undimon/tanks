import gsap from "gsap";
import { Config } from "../../../../misc/config";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { MapItem } from "./map-item";

export class EagleMapItem extends MapItem {
    
    public explosion: PIXI.AnimatedSprite;

    constructor(type: GameObjectTypes, x: number, y: number) {
        super(type, x, y);  
        this.initSkin('eagle');
        this.initExplosionAnimation();         
    }

    protected initExplosionAnimation(): void {
        this.explosion = new PIXI.AnimatedSprite(this.getSpriteTextures(Config.assets['explode'], 16, 68, 68));
        this.explosion.anchor.set(0.5);
        this.explosion.x = this.size.width / 2;
        this.explosion.y = this.size.height / 2;
        this.explosion.loop = false;
        this.explosion.visible = false;
        this.display.addChild(this.explosion);
    }    

    public playExplosioAnimation(onComplete: Function): void {
        this.playSound(Config.assets['soundExplode']);

        gsap.to(this.skin, { duration: 0.3, alpha: 0 });

        this.explosion.visible = true;
        this.explosion.play();
        this.explosion.onComplete = () => onComplete();
    }
   
    public handleCollisionWith(object: GameObject): void {
        if (object.type === GameObjectTypes.Bullet) {
            this.destroy();   
        }
    }

    public destroy(): void {
        this.playExplosioAnimation(() => {
            super.destroy();
        });
    }
}