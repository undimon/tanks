import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Config } from "../../misc/config";
import { gsap } from 'gsap';

export class MenuButtonsView extends View {
    protected bar: Sprite;

    public drawScene(): void {
        this.drawTitle();
    }
 
    protected drawTitle(): void {
        const text: Text = new Text('BUTTONS');
        text.anchor.set(0.5);
        text.x = AppManager.getInstance().getSceneWidth() / 2;
        text.y = AppManager.getInstance().getSceneHeight() / 2 + 50;
        this.display.addChild(text);
    }
}