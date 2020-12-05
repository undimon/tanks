import gsap from "gsap";
import { Container } from "pixi.js";
import { AppManager } from "../app-manager";
import { MVCEntity } from "./mvc-entity";

export class View {
    public display: Container = new Container();

    /**
	 * Called when object is created
	 */
	public onRegister(): void {	
		this.display.visible = false;
    }
    
    /**
	 * Called when view is ready
	 */
	public postRegister(): void {	
	}

	public layerTransitionInStart(): void {
		this.display.visible = true;
		gsap.fromTo(this.display, { alpha: 0 }, { duration: 0.5, alpha: 1 });
	}

	public layerTransitionOutStart(): void {
		if (!this.display.visible) return;
		
		gsap.to(this.display, { 
			duration: 0.5, 
			alpha: 0, 
			onComplete: () => { 
				this.display.visible = false;
			}
		});
	}

	public getTexture(name: string): PIXI.Texture {
		return AppManager.getInstance().getTexture(name);
	}
}