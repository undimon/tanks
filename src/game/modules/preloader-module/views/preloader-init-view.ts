import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Config } from "../../misc/config";
import { gsap } from 'gsap';

export class PreloaderInitView extends View {
    protected bar: Sprite;

    public drawScene(): void {
        this.display.visible = true;
        this.drawBg();
        this.drawTitle();
        this.drawProgressBar();
    }
 
    protected drawTitle(): void {
        const text: Text = new Text('Loading game...');
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

    protected drawProgressBar(): void {
        const holder: Container = new Container;
        const bg: Sprite = new Sprite(this.getTexture(Config.preloaderAassets['loaderBg']));
        this.bar = new Sprite(this.getTexture(Config.preloaderAassets['loaderBar']));
        this.bar.x = this.bar.y = 5;
        this.bar.width
        holder.addChild(bg, this.bar);
        holder.pivot.x = holder.width / 2;
        holder.x = AppManager.getInstance().getSceneWidth() / 2;
        holder.y = AppManager.getInstance().getSceneHeight() / 2 + 50;
        this.display.addChild(holder);
    }

    public updateProgressBar(progress: number): void {
        // Emulating some throttling
        gsap.to(this.bar.scale, { duration: 1, x: progress / 100 });
        console.log(progress);
    }
}