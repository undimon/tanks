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
        this.player.handleShoot = () => this.createBullet(this.player, resources["bullet"].texture);
        this.units.push(this.player);
        this.addChild(this.player);
        
        setInterval(() => {
            const enemy: Enemy = new Enemy(UnitTypes.Enemy, resources["enemy"].texture);
            const spawnPoint: PIXI.Point = this.map.getRandomSpawnPoint();
            enemy.x = spawnPoint.x;
            enemy.y = spawnPoint.y;
            enemy.handleShoot = () => this.createBullet(enemy, resources["bullet"].texture);
            this.units.push(enemy);
            this.addChild(enemy);
        }, 5000);
    }

    public onKeyDown(event: KeyboardEvent): void {
        this.player.handleKeyDown(event);
    }

    public onKeyUp(event: KeyboardEvent): void {
        this.player.handleKeyUp(event);
    }

    public update(): void {
        this.units.forEach(unit => {
            if (unit.type === UnitTypes.Enemy) unit.update();
        });
        this.bullets.forEach(bullet => {
            bullet.update();
        });
        this.checkCollisionUnitsVsWalls();
        this.checkCollisionUnitsVsUnits();
        this.checkCollisionUnitsVsBullets();
    }  

    public createBullet(unit: Unit, texture: PIXI.Texture) {
        const bullet: Bullet = new Bullet(unit, texture);
        bullet.x = unit.x;
        bullet.y = unit.y;
        this.bullets.push(bullet);
        this.addChild(bullet);
    }

    public checkForCollision(a: any, b: any, size: number): boolean {
        return (Math.abs(a.x - b.x) <= size && Math.abs(a.y - b.y) <= size);
    }

    public checkCollisionUnitsVsWalls(): void {
        this.map.items.forEach(wall => {
            if (wall.type === MapItemType.EnemySpawnPoint) return;
            this.units.forEach(unit => {
                if (this.checkForCollision(wall, unit, 20)) unit.handleWallCollision();
            });
        });
    }

    public checkCollisionUnitsVsUnits(): void {
        this.units.forEach(unit1 => {
            this.units.forEach(unit2 => {
                if (unit1 === unit2) return;
                if (this.checkForCollision(unit1, unit2, 20)) unit1.handleUnitCollision();
            });
        });
    }

    public checkCollisionUnitsVsBullets(): void {
        this.units.forEach(unit => {
            this.bullets.forEach(bullet => {
                if (bullet.owner === unit) return;
                if (this.checkForCollision(unit, bullet, 20)) {
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