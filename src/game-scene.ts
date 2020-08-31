import { Map, MapItemType } from "./map";
import { MapItem } from "./map-item";
import { Utils } from "./utils";
import { Unit, UnitTypes } from "./unit";
import { Enemy } from "./enemy";
import { Bullet } from "./bullet";

export class GameScene extends PIXI.Container {
    private map: Map;
    public player: Unit;
    private units: Unit[] = [];
    private bullets: Bullet[] = [];

    constructor(app: PIXI.Application, resources: PIXI.LoaderResource) {
        super();
        this.init(app, resources);
    }

    private init(app, resources: PIXI.LoaderResource): void {
        this.map = new Map(resources["wall"].texture)
        this.map.x = 0;
        this.map.y = 0;
        this.addChild(this.map);

        this.player = new Unit(UnitTypes.Player, resources["tank"].texture)
        this.player.x = this.map.width / 2;
        this.player.y = this.map.height / 2;
        this.player.isHitTheWall = () => this.map.checkCollisionUnitVsWall(this.player);
        this.player.isHitTheUnit = () => this.checkCollisionUnitVsUnit(this.player);
        this.player.shoot = () => this.createBullet(this.player, resources["bullet"].texture);
        this.units.push(this.player);
        this.addChild(this.player);
        
        setInterval(() => {
            const enemy: Enemy = new Enemy(UnitTypes.Enemy, resources["enemy"].texture);
            const spawnPoint: PIXI.Point = this.map.getRandomSpawnPoint();
            enemy.x = spawnPoint.x;
            enemy.y = spawnPoint.y;
            enemy.isHitTheWall = () => this.map.checkCollisionUnitVsWall(enemy);
            enemy.isHitTheUnit = () => this.checkCollisionUnitVsUnit(enemy);
            enemy.shoot = () => this.createBullet(enemy, resources["bullet"].texture);
            this.units.push(enemy);
            this.addChild(enemy);
        }, 5000);
    }

    public update(): void {
        this.player.update();

        this.units.forEach(unit => {
            if (unit.type === UnitTypes.Enemy) unit.update();
        });
        // this.bullets.forEach(bullet => {
        //     bullet.update();
        // });
        //this.checkCollisionUnitsVsWalls();
        // this.checkCollisionUnitsVsUnits();
        // this.checkCollisionUnitsVsBullets();
    }  

    public createBullet(unit: Unit, texture: PIXI.Texture) {
        const bullet: Bullet = new Bullet(unit, texture);
        bullet.x = unit.x;
        bullet.y = unit.y;
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

    public checkCollisionUnitsVsBullets(): void {
        this.units.forEach(unit => {
            this.bullets.forEach(bullet => {
                if (bullet.owner === unit) return;
                if (Utils.checkForCollision(unit, bullet, 20)) {
                    this.bullets = this.bullets.filter(b => b !== bullet);
                    this.removeChild(bullet);

                    this.units = this.units.filter(u => u !== u);
                    this.removeChild(unit);
                    unit.handleBulletCollision();
                    //unit.visible = false;
                    //bullet.handleCollision();
                }
            });
        });
    }
}