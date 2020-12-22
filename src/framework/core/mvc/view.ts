import gsap from "gsap";
import { Container, Texture } from "pixi.js";
import { AppManager } from "../app-manager";
import { Controller } from './controller';
import { MVCEntity } from "./mvc-entity";

export class View extends MVCEntity {
	public controller: Controller;
    public display: Container = new Container();

    /**
	 * Called when object is created
	 */
	public onRegister(): void {	
		super.onRegister();
		this.display.visible = false;
    }
    
    /**
	 * Called when view is ready
	 */
	public postRegister(): void {	
	}

	public layerTransitionInStart(): void {
		this.display.visible = true;
		gsap.fromTo(this.display, { alpha: 0 }, { duration: 0.5, alpha: 1, onComplete: () => this.layerTransitionInComplete() });
	}

	public layerTransitionInComplete(): void {
	}

	public layerTransitionOutStart(): void {
		if (!this.display.visible) return;
		
		gsap.to(this.display, { 
			duration: 0.5, 
			alpha: 0, 
			onComplete: () => { 
				this.display.visible = false;
				this.layerTransitionOutComplete();
			}
		});
	}

	public layerTransitionOutComplete(): void {
	}

	public getTexture(name: string): Texture {
		return AppManager.getInstance().getTexture(name);
	}
    
    public getSpriteTextures(spriteName: string, framesCount: number, frameWidth: number, frameHeight: number): Texture[] {
        return AppManager.getInstance().getSpriteTextures(spriteName, framesCount, frameWidth, frameHeight);
	}	
}