import { Utils } from "../../../../../utils";
import { GameObjectTypes } from "../../misc/game-object-types";
import { MapItem } from "../elements/map/map-item";
import { Config } from '../../../misc/config';

export class MapFactory {
    
    public onMapItemCreate: Function;
    public onMapItemDestroy: Function;

    protected mapWidth: number = 24;
    protected mapHeight: number = 22;

    public createMapItems(): void {
        for (let i = 0; i < this.mapWidth * this.mapHeight; i++) {
            if (Config.level[i] === undefined) continue;

            let type: GameObjectTypes;
            if (Config.level[i] === 1) type = GameObjectTypes.StoneWall;
            if (Config.level[i] === 2) type = GameObjectTypes.BrickWall;
            if (Config.level[i] === 3) type = GameObjectTypes.Tree;
            if (Config.level[i] === 4) type = GameObjectTypes.Water;
            if (Config.level[i] === 7) type = GameObjectTypes.Eagle;
            if (Config.level[i] === 8) type = GameObjectTypes.PlayerSpawnPoint;
            if (Config.level[i] === 9) type = GameObjectTypes.EnemySpawnPoint;

            this.createMapItem(type, i);
        }
    }

    protected createMapItem(type: GameObjectTypes, index: number): void {
        const y = Math.floor(index / this.mapWidth); 
        const x = index - this.mapWidth * y;

        const item: MapItem = new MapItem(type, x, y);
        item.onDestroy = () => this.onMapItemDestroy(item);
        this.onMapItemCreate(item);  
    }

    protected getRandomBonusType(): GameObjectTypes {
        const randomIndex: number = Utils.randomInt(0, 3);
        if (randomIndex === 0) return GameObjectTypes.BonusSlow;
        if (randomIndex === 1) return GameObjectTypes.BonusSpeed;
        if (randomIndex === 2) return GameObjectTypes.BonusLife;
        if (randomIndex === 3) return GameObjectTypes.BonusImmortal;
    }
    
    public addRandomBonus(): void {
        const emptyIndexes: number[] = [];
        
        for (let i = 0; i < this.mapWidth * this.mapHeight; i++) {
            if (Config.level[i] === undefined) {
                emptyIndexes.push(i);
            }
        }

        const randomIndex: number = Utils.randomInt(0, emptyIndexes.length - 1);
        const index: number = emptyIndexes[randomIndex];

        this.createMapItem(this.getRandomBonusType(), index);
    }
}