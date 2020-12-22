import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Point, Sprite, Text } from "pixi.js";
import { UiComponents } from "../../misc/ui-components";

export class GameOverMainView extends View {

    public drawMenuButtons(onPlayClick: Function): void {
        const playButton: Container = UiComponents.createButton("PLAY AGAIN", () => {
            onPlayClick();
        });
        playButton.x = AppManager.getInstance().getSceneWidth() / 2;
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
        bg.drawRect(0, 0, AppManager.getInstance().getSceneWidth(), AppManager.getInstance().getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    }

    protected drawTitle(): void {
        const style = new PIXI.TextStyle({
            fontSize: 80,
            fontWeight: 'bold',
            fill: ['#ffffff', '#afaeae']
        });

        const text: Text = new Text('GAME OVER', style);
        text.anchor.set(0.5);
        text.x = AppManager.getInstance().getSceneWidth() / 2;
        text.y = 250;
        this.display.addChild(text);
    }
}