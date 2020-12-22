import { View } from "../../../../framework/core/mvc/view";
import { Point, Text } from "pixi.js";
import { UiComponents } from "../../misc/ui-components";
import { AppManager } from "../../../../framework/core/app-manager";

export class GameUiView extends View {
    
    protected livesText: Text;
    protected enemiesText: Text;

    public initUi(): void {
        this.initLives();
        this.initEnemies();
    }
 
    protected initLives(): void {
        this.livesText = UiComponents.createText('', 0xffffff);
        this.livesText.x = 20;
        this.livesText.y = AppManager.getInstance().getSceneHeight() - 45;
        this.display.addChild(this.livesText);
    }

    public updateLives(count: number): void {
        this.livesText.text = `LIFES: ${count}`;
    }

    protected initEnemies(): void {
        this.enemiesText = UiComponents.createText('', 0xffffff);
        this.enemiesText.x = AppManager.getInstance().getSceneWidth() - 180;
        this.enemiesText.y = AppManager.getInstance().getSceneHeight() - 45;
        this.display.addChild(this.enemiesText);
    }

    public updateEnemies(count: number): void {
        this.enemiesText.text = `ENEMIES: ${count}`;
    }
}