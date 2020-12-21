import { GameObjectTypes } from "../../misc/game-object-types";
import { MapItem } from "../../views/elements/map/map-item";

export class MapFactory {
    
    public onMapItemCreate: Function;
    public onMapItemDestroy: Function;

    protected mapWidth: number = 24;
    protected mapHeight: number = 22;

    protected level: number[] = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 9,  ,  ,  ,  ,  ,  ,  ,  ,  , 9,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 9, 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  , 2, 2, 1, 1, 1, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2,  ,  ,  ,  , 1,
        1,  ,  ,  , 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 2, 2, 2,  ,  ,  ,  ,  ,  , 1, 1,
        1, 2, 2, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1, 3, 3, 3,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1, 3, 3, 3,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 2,  ,  ,  ,  ,  ,  , 2, 2, 2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  , 2,  ,  ,  ,  ,  , 8, 2, 7, 2,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    public createMapItems(): void {
        for (let i = 0; i < this.mapWidth * this.mapHeight; i++) {
            if (this.level[i] === undefined) continue;

            const blockY = Math.floor(i / this.mapWidth); 
            const blockX = i - this.mapWidth * blockY;

            let type: GameObjectTypes;
            if (this.level[i] === 1) type = GameObjectTypes.StoneWall;
            if (this.level[i] === 2) type = GameObjectTypes.BrickWall;
            if (this.level[i] === 3) type = GameObjectTypes.Tree;
            if (this.level[i] === 4) type = GameObjectTypes.Water;
            if (this.level[i] === 7) type = GameObjectTypes.Eagle;
            if (this.level[i] === 8) type = GameObjectTypes.PlayerSpawnPoint;
            if (this.level[i] === 9) type = GameObjectTypes.EnemySpawnPoint;

            const item: MapItem = new MapItem(type, blockX, blockY);
            item.onDestroy = () => this.onMapItemDestroy(item);
            this.onMapItemCreate(item);
        }
    }  
}