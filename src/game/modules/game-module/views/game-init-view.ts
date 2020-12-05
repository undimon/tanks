import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { GameScene } from "../../../../game-scene";

export class GameInitView extends View {
    protected gameScene: GameScene;

    public drawScene(): void {
        this.drawBg();
        this.drawTitle();

        this.gameScene = new GameScene();
        this.display.addChild(this.gameScene);

        AppManager.getInstance().app.ticker.add(() => {
            this.gameScene.update();
        });  
    }
 
    protected drawTitle(): void {
        const text: Text = new Text('Game Scene');
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