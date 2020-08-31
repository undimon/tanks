import { MapItem } from "./map-item";
import { Utils } from "./utils";

export enum MapItemType {
    StoneWall = 1,
    BrickWall = 2,
    EnemySpawnPoint = 9,
}

export class Map extends PIXI.Container {
    
    // 25x25
    private map: number[] = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 9, 1,  ,  ,  , 1, 9, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 9, 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  1, ,  ,  ,  ,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 1, 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]

    public items: MapItem[] = [];

    constructor(texture: PIXI.Texture) {
        super();
        this.initView(texture);
    }

    private initView(texture: PIXI.Texture): void {
        for (let i = 0; i < 25 * 20; i++) {
            
            const blockY = Math.floor(i / 25); 
            const blockX = i - 25 * blockY;
            
            if (this.map[i] === MapItemType.StoneWall) {
                const mapItem: MapItem = new MapItem(texture, this.map[i]);    
                mapItem.x = blockX * mapItem.virtualSize.width;
                mapItem.y = blockY * mapItem.virtualSize.height;
                this.items.push(mapItem)
                this.addChild(mapItem);
            };

            if (this.map[i] === MapItemType.EnemySpawnPoint) {
                const mapItem: MapItem = new MapItem(null, this.map[i]);    
                mapItem.x = blockX * mapItem.virtualSize.width;
                mapItem.y = blockY * mapItem.virtualSize.height;
                this.items.push(mapItem)
            };
        }
    }

    public getRandomSpawnPoint(): PIXI.Point {
        const points: PIXI.Point[] = [];
        this.items.forEach(item => {
            if (item.type === MapItemType.EnemySpawnPoint) points.push(new PIXI.Point(item.x, item.y));
        });

        return points[Utils.randomInt(0, points.length -1)];
    }
}