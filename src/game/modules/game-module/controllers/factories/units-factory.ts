import { Unit } from "../../views/elements/unit/unit";
import { Player } from "../../views/elements/unit/player";
import { Enemy } from "../../views/elements/unit/enemy";
import { Point } from "pixi.js";
import { IBulletParams } from "../../views/elements/bullet/bullet";
import { GameObjectTypes } from "../../misc/game-object-types";

export class UnitsFactory {
    
    public getSpawnPoint: Function;
    public onCreateBullet: Function;
    public onUnitDestroy: Function;
    public onUnitCreate: Function;

    public createPlayer(): void {
        const unit: Player = new Player();
        unit.init();
        const spawnPoint: Point = this.getSpawnPoint(GameObjectTypes.PlayerSpawnPoint);
        unit.setPosition(spawnPoint.x, spawnPoint.y);        
        this.onUnitCreate(this.finishUnitCreation(unit));
    }

    public createEnemy(): void {
        const unit: Enemy = new Enemy();
        unit.init();
        const spawnPoint: Point = this.getSpawnPoint(GameObjectTypes.EnemySpawnPoint);
        unit.setPosition(spawnPoint.x, spawnPoint.y);        
        this.onUnitCreate(this.finishUnitCreation(unit));
    }

    protected finishUnitCreation(unit: Unit): Unit {
        unit.onShoot = (params: IBulletParams) => this.onCreateBullet(params);
        unit.onDestroy = () => this.onUnitDestroy(unit);
        return unit;
    }       
}