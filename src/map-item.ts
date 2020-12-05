import { MapItemType } from "./map";

export class MapItem extends PIXI.Sprite {
    public type: MapItemType;
    public virtualSize: any = {
        width: 36,
        height: 36
    }; 

    constructor(texture: PIXI.Texture, type: MapItemType) {
        super(texture);
        this.type = type;
    }
}