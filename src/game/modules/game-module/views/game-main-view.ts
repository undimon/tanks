import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";

export class GameMainView extends View {
    
    public frontDisplay: Container = new Container();
    public backDisplay: Container = new Container();
    
    public initScene(): void {

        this.drawBg();
        this.drawTitle();

        this.display.addChild(this.backDisplay);
        this.display.addChild(this.frontDisplay);
    }
 
    protected drawTitle(): void {
        const text: Text = new Text('Game Scene');
        text.anchor.set(0.5);
        text.x = AppManager.getInstance().getSceneWidth() / 2;
        text.y = AppManager.getInstance().getSceneHeight() / 2;
        this.backDisplay.addChild(text);
    }

    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.name = "background";
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, AppManager.getInstance().getSceneWidth(), AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.backDisplay.addChild(bg);
    }

    public update(): void {
    }

    public getDisplay(front: boolean = false): Container {
        if (front) {
            return this.frontDisplay;
        }
        return this.backDisplay;
    }
}