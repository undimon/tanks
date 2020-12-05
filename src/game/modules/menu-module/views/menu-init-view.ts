import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Config } from "../../misc/config";
import { gsap } from 'gsap';

export class MenuInitView extends View {
    protected bar: Sprite;

    public drawScene(): void {
        this.display.visible = true;
        this.drawBg();
        this.drawTitle();
    }
 
    protected drawTitle(): void {
        const text: Text = new Text('MENU!');
        text.anchor.set(0.5);
        text.x = AppManager.getInstance().getSceneWidth() / 2;
        text.y = AppManager.getInstance().getSceneHeight() / 2;
        this.display.addChild(text);
    }

    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.beginFill(0xDE3249);
        bg.drawRect(0, 0, AppManager.getInstance().getSceneWidth(), AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    }
}