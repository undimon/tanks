import { Container, Graphics, Point, Text } from "pixi.js";

export class UiComponents {

    public static createButton(title: string, onClick: Function): Container {
        const button: Container = new Container();
    
        const bg: Graphics = new Graphics();
        bg.lineStyle(2, 0xafaeae);
        bg.beginFill(0x4a6fa8);
        bg.drawRect(0, 0, 200, 60);
        bg.endFill();
        button.addChild(bg);

        const style = new PIXI.TextStyle({
            fill: ['#000000']
        });

        const text: Text = new Text(title, style);
        text.anchor.set(0.5);
        text.x = button.width / 2;
        text.y = button.height / 2;
        button.addChild(text);

        button.pivot.x = button.width / 2;
        button.pivot.y = button.height / 2;
        
        button.interactive = true;
        button.buttonMode = true;

        button.on('pointerover', () => {
            button.scale.set(1.05);
        });
        button.on('pointerout', () => {
            button.scale.set(1);
        });        
        button.on('pointerdown', () => {
            button.scale.set(0.95);
            onClick();
        });
        button.on('pointerup', () => {
            button.scale.set(1);
        });

        return button
    }

    public static createText(title: string, color: number, position: Point = new Point(0, 0)): Text {

        const style = new PIXI.TextStyle({
            fill: [color]
        });

        const text: Text = new Text(title, style);
        text.position = position;

        return text;
    }    
}