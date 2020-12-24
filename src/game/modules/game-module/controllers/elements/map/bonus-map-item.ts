import gsap from "gsap";
import { Config } from "../../../../misc/config";
import { GameObject } from "../../../misc/game-object";
import { GameObjectTypes } from "../../../misc/game-object-types";
import { MapItem } from "./map-item";

export class BonusMapItem extends MapItem {
    
    protected destroyDelay: number = 10;
    protected blinkDelay: number = 6;

    constructor(type: GameObjectTypes, x: number, y: number) {
        super(type, x, y);

        if (type === GameObjectTypes.BonusSpeed) {
            this.initSkin('bonusSpeed');
        }  
        if (type === GameObjectTypes.BonusSlow) {
            this.initSkin('bonusSlow');
        }  
        if (type === GameObjectTypes.BonusLife) {
            this.initSkin('bonusLife');
        }  
        if (type === GameObjectTypes.BonusImmortal) {
            this.initSkin('bonusImmortal');
        }

        gsap.delayedCall(this.destroyDelay, () => this.destroy());
        gsap.delayedCall(this.blinkDelay, () => this.playBlinkAnimation());
    }
   
    public handleCollisionWith(object: GameObject): void {
        if (object.type === GameObjectTypes.Player || object.type === GameObjectTypes.Enemy) {
            if (this.type === GameObjectTypes.BonusImmortal || 
                this.type === GameObjectTypes.BonusLife ||
                this.type === GameObjectTypes.BonusSlow||
                this.type === GameObjectTypes.BonusSpeed) {
                this.playSound(Config.assets['soundBonus']);
                this.destroy();
            }
        }
    }

    public playBlinkAnimation(): void {
        gsap.fromTo(this.skin, { alpha: 0.4 }, { 
            alpha: 1, 
            duration: 0.2,
            yoyo: true, 
            repeat: -1
        });
    }    
}