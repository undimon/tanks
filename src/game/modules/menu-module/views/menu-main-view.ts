import { View } from "../../../../framework/core/mvc/view";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { UiComponents } from "../../misc/ui-components";

export class MenuMainView extends View {
    protected bar: Sprite;

    public drawMenuButtons(onPlayClick: Function): void {
        const playButton: Container = UiComponents.createButton("PLAY", () => {
            onPlayClick();
        });
        playButton.x = this.getSceneWidth() / 2;
        playButton.y = 400;
        this.display.addChild(playButton);   
    }
    
    public drawScene(): void {
        this.drawBg();
        this.drawTitle();
    }
 
    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.beginFill(0x0c1c33);
        bg.drawRect(0, 0, this.getSceneWidth(), this.getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    }

    protected drawTitle(): void {
        const style = new PIXI.TextStyle({
            fontSize: 100,
            fontWeight: 'bold',
            fill: ['#ffffff', '#afaeae']
        });

        const text: Text = new Text('TANKS', style);
        text.anchor.set(0.5);
        text.x = this.getSceneWidth() / 2;
        text.y = 250;
        this.display.addChild(text);
    }
}