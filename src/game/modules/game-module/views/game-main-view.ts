import { View } from "../../../../framework/core/mvc/view";
import { Container, Graphics } from "pixi.js";

export class GameMainView extends View {
    
    public frontDisplay: Container;
    public backDisplay: Container;
    
    public initScene(): void {
        this.frontDisplay = new Container();
        this.backDisplay = new Container();
        this.display.addChild(this.backDisplay);
        this.display.addChild(this.frontDisplay);
        this.drawBg();
    }
 
    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.name = "background";
        bg.beginFill(0x0c1c33);
        bg.drawRect(0, 0, this.getSceneWidth(), this.getSceneHeight());
        bg.endFill();
        this.backDisplay.addChild(bg);
    }

    public getDisplay(front: boolean = false): Container {
        if (front) {
            return this.frontDisplay;
        }
        return this.backDisplay;
    }

    public layerTransitionOutComplete(): void {
        this.frontDisplay.destroy({ children: true });
        this.backDisplay.destroy({ children: true });
    }
}