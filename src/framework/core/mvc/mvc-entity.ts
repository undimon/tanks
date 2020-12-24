import { Mvc } from "./mvc";
import { AppManager } from '../app-manager';
import { Texture } from "pixi.js";
export class MVCEntity {

    get mvc(): Mvc {
		return Mvc.getInstance();
	}

	get app(): AppManager {
		return AppManager.getInstance();
	}

	/**
	 * Called once when object is created
	 */
	public onRegister(): void {	
	}

	public playSound(name: string): void {
		this.app.playSound(name);
	}

	public getTexture(name: string): Texture {
		return this.app.getTexture(name);
	}
    
    public getSpriteTextures(spriteName: string, framesCount: number, frameWidth: number, frameHeight: number): Texture[] {
        return this.app.getSpriteTextures(spriteName, framesCount, frameWidth, frameHeight);
	}		

	protected getInput(): any {
        return this.app.keys;
    }
}