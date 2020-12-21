import { View } from "../../../../framework/core/mvc/view";
import { AppManager } from "../../../../framework/core/app-manager";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { INotification } from '../../../../framework/core/mvc/notification';

export class GameUiView extends View {
    
    protected livesText: Text;
    protected enemiesText: Text;

    public initUi(): void {
        this.initLives();
        this.initEnemies();
    }
 
    protected initLives(): void {
        this.livesText = new Text('Lives: 0');
        this.livesText.x = 750;
        this.livesText.y = 20;
        this.display.addChild(this.livesText);
    }

    public updateLives(count: number): void {
        this.livesText.text = `Lives: ${count}`;
    }

    protected initEnemies(): void {
        this.enemiesText = new Text('Enemies: 0');
        this.enemiesText.x = 750;
        this.enemiesText.y = 50;
        this.display.addChild(this.enemiesText);
    }

    public updateEnemies(count: number): void {
        this.enemiesText.text = `Enemies: ${count}`;
    }
}