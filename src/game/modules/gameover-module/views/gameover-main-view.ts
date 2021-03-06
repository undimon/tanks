import { View } from "../../../../framework/core/mvc/view";
import { Container, Graphics, Text } from "pixi.js";
import { UiComponents } from "../../misc/ui-components";
import { Config } from "../../misc/config";

export class GameOverMainView extends View {

    protected titleTextField: Text;

    public drawMenuButtons(onPlayClick: Function): void {
        const playButton: Container = UiComponents.createButton("PLAY AGAIN", () => {
            onPlayClick();
        });
        playButton.x = this.getSceneWidth() / 2;
        playButton.y = 400;
        this.display.addChild(playButton);   
    }
    
    public drawScene(isWin: boolean = false): void {
        this.drawBg();
        this.drawTitle(isWin);
    }
 
    protected drawBg(): void {
        const bg: Graphics = new Graphics();
        bg.beginFill(0x0c1c33);
        bg.drawRect(0, 0, this.getSceneWidth(), this.getSceneHeight());
        bg.endFill();
        this.display.addChild(bg);
    }

    protected drawTitle(isWin: boolean = false): void {
        const style = new PIXI.TextStyle({
            fontSize: 80,
            fontWeight: 'bold',
            fill: ['#ffffff', '#afaeae']
        });

        this.titleTextField = new Text('', style);
        this.titleTextField.anchor.set(0.5);
        this.titleTextField.x = this.getSceneWidth() / 2;
        this.titleTextField.y = 250;
        this.display.addChild(this.titleTextField);
    }

    public setTitle(isWin: boolean = false): void {
        let text: string;
       
        if (isWin) {
            text = 'CONGRATS!';
            this.playSound(Config.assets['soundWin']);
        }
        else {
            text = 'GAME OVER :(';
            this.playSound(Config.assets['soundLose']);
        }

        this.titleTextField.text = text;
    }    
}