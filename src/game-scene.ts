import { Map, MapItemType } from "./map";
import { MapItem } from "./map-item";
import { Utils } from "./utils";
import { Unit, UnitTypes } from "./unit";
import { Enemy } from "./enemy";
import { Bullet } from "./bullet";
import { resources } from "pixi.js";
import { Player } from "./player";
import { AppManager } from "./framework/core/app-manager";
import { Config } from "./game/modules/misc/config";

export class GameScene extends PIXI.Container {
    private map: Map;
    public player: Unit;
    private units: Unit[] = [];
    private bullets: Bullet[] = [];

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.createMap();
        this.createPlayer();
        this.createEnemy();
        this.startEnemiesGenerator();  
    }

    private createMap(): void {
        this.map = new Map(AppManager.getInstance().getTexture(Config.assets['wall']))
        this.map.x = 0;
        this.map.y = 0;
        this.addChild(this.map);
    }

    private startEnemiesGenerator(): void {
        //Todo need to clear interval on scene exit
        setInterval(() => {
            this.createEnemy();
        }, 5000);
    }

    private createPlayer(): void {
        const unit: Player = new Player(AppManager.getInstance().getTexture(Config.assets['tank']));
        unit.x = this.map.width / 2;
        unit.y = this.map.height / 2;
        this.finishUnitCreation(unit);
    }

    private createEnemy(): void {
        const unit: Enemy = new Enemy(AppManager.getInstance().getTexture(Config.assets['enemy']));
        const spawnPoint: PIXI.Point = this.map.getRandomSpawnPoint();
        unit.x = spawnPoint.x;
        unit.y = spawnPoint.y;
        this.finishUnitCreation(unit);
    }

    private finishUnitCreation(unit: Unit): void {
        unit.isHitTheWall = () => this.map.checkCollisionUnitVsWall(unit);
        unit.isHitTheUnit = () => this.checkCollisionUnitVsUnit(unit);
        unit.isHitTheBullet = () => this.checkCollisionUnitVsBullet(unit);
        unit.shoot = () => this.createBullet(unit);
        this.units.push(unit);
        this.addChild(unit);
    }

    public update(): void {
        this.units.forEach(unit => unit.update());
        this.bullets.forEach(bullet => bullet.update());
        //this.checkCollisionUnitsVsWalls();
        //this.checkCollisionUnitsVsUnits();
        //this.checkCollisionUnitsVsBullets();
    }  

    public createBullet(unit: Unit) {
        const bullet: Bullet = new Bullet(unit, AppManager.getInstance().getTexture(Config.assets['bullet']));
        this.bullets.push(bullet);
        this.addChild(bullet);
    }

    public checkCollisionUnitVsUnit(unit: Unit): boolean {
        let hasCollision: boolean = false;
        this.units.forEach(otherUnit => {
            if (unit === otherUnit) return;
            if (Utils.checkForCollision(unit, otherUnit, 20)) hasCollision = true;
        });
        return hasCollision;
    }

    public checkCollisionUnitVsBullet(unit: Unit): boolean {
        let hasCollision: boolean = false;
        this.bullets.forEach(bullet => {
            if (bullet.unit === unit) return;
            if (Utils.checkForCollision(unit, bullet, 20)) {
                hasCollision = true;
                this.bullets = this.bullets.filter(b => b !== bullet);
                this.removeChild(bullet);

                this.units = this.units.filter(u => u !== unit);
                this.removeChild(unit);
                //unit.handleBulletCollision();
                //unit.visible = false;
                //bullet.handleCollision();
            }
        });
        return hasCollision;
    }
}