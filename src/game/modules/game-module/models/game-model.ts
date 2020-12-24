import { Point } from "pixi.js";
import { Model } from "../../../../framework/core/mvc/model";
import { Utils } from "../../../../utils";
import { GameObjectTypes } from "../misc/game-object-types";
import { Bullet } from "../controllers/elements/bullet/bullet";
import { MapItem } from "../controllers/elements/map/map-item";
import { Unit } from "../controllers/elements/unit/unit";
import { GameObject } from "../misc/game-object";
import { Config } from "../../misc/config";

export class GameModel extends Model {
    public units: Unit[];
    public mapItems: MapItem[];
    public bullets: Bullet[];

    public player: Unit;
    public enemiesToSpawn: number;
    public enemiesKilled: number;

    public get playerLife(): number {
        return this.player.life;
    }

    public init(): void {
        this.units = [];
        this.mapItems = [];
        this.bullets = [];

        this.enemiesKilled = 0;
        this.enemiesToSpawn = Config.enemiesOnLevel;
    }    

    public addUnit(unit: Unit): void {
        if (unit.type === GameObjectTypes.Player) {
            this.player = unit;
        }
        if (unit.type === GameObjectTypes.Enemy) {
            this.enemiesToSpawn--;
        }
        this.units.push(unit);
    }

    public removeUnit(unit: Unit): void {
        if (unit.type === GameObjectTypes.Enemy) {
            this.enemiesKilled++;
        }
        this.units = this.units.filter(b => b !== unit);
    }

    public allEnemiesKilled(): boolean {
        return this.enemiesKilled === Config.enemiesOnLevel;
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

    public update(): void {
        const objects: GameObject[] = [
            ...this.mapItems,
            ...this.units,
            ...this.bullets
        ];

        objects.forEach((object: GameObject) => {
            object.update();
            objects.forEach((otherObject: GameObject) => {
                object.checkCollisionWith(otherObject);
            })    
        });
    }
}