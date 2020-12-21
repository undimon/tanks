import { Point } from "pixi.js";
import { Model } from "../../../../framework/core/mvc/model";
import { Utils } from "../../../../utils";
import { GameObjectTypes } from "../misc/game-object-types";
import { Bullet } from "../views/elements/bullet/bullet";
import { MapItem } from "../views/elements/map/map-item";
import { Unit } from "../views/elements/unit/unit";

export class GameModel extends Model {
    public units: Unit[] = [];
    public mapItems: MapItem[] = [];
    public bullets: Bullet[] = [];

    public playerLives: number = 3;
    public enemiesLeft: number = 20;

    public addUnit(unit: Unit): void {
        if (unit.type === GameObjectTypes.Enemy) {
            this.enemiesLeft--;
        }
        this.units.push(unit);
    }

    public removeUnit(unit: Unit): void {
        if (unit.type === GameObjectTypes.Player) {
            this.playerLives--;
        }
        this.units = this.units.filter(b => b !== unit);
    }

    public getSpawnPoint(type: GameObjectTypes): Point {
        const points: Point[] = [];
        this.mapItems.forEach((item: MapItem) => {
            if (item.type === type) {
                points.push(new Point(item.x, item.y));
            }
        });
        return points[Utils.randomInt(0, points.length - 1)];
    } 
    
    public addMapItem(item: MapItem): void {
        this.mapItems.push(item);
    }

    public removeMapItem(item: MapItem): void {
        this.mapItems = this.mapItems.filter((i: MapItem) => i !== item);
    }

    public addBullet(bullet: Bullet): void {
        this.bullets.push(bullet); 
    }

    public removeBullet(bullet: Bullet): void {
        this.bullets = this.bullets.filter(b => b !== bullet);
    }  
}