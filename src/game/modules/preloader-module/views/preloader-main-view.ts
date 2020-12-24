import { View } from "../../../../framework/core/mvc/view";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { Config } from "../../misc/config";
import { gsap } from 'gsap';

export class PreloaderMainView extends View {
    protected bar: Sprite;

    public drawScene(): void {
        this.display.visible = true;
        this.drawBg();
        this.drawTitle();
        this.drawProgressBar();
    }
 
    protected drawTitle(): void {
        const style = new PIXI.TextStyle({
            fill: ['#ffffff', '#afaeae']
        });

        const text: Text = new Text('LOADING...', style);
        text.anchor.set(0.5);
        text.x = this.getSceneWidth() / 2;
        text.y = this.getSceneHeight() / 2;
        this.display.addChild(text);
    }

    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.beginFill(0x0c1c33);
        bg.drawRect(0, 0, this.getSceneWidth(), this.getSceneHeight());
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
        holder.x = this.getSceneWidth() / 2;
        holder.y = this.getSceneHeight() / 2 + 50;
        this.display.addChild(holder);
    }

    public updateProgressBar(progress: number): void {
        // Emulate some throttling
        gsap.to(this.bar.scale, { duration: 1, x: progress / 100 });
        console.log(progress);
    }
}