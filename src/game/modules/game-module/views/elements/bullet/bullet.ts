import { GameObjectTypes } from "../../../misc/game-object-types";
import { GameObject, MoveDirections } from "../../../misc/game-object";
import { BulletView } from './bullet-view';

export class Bullet extends GameObject {

    public init(params: IBulletParams): void {
        super.init();
        this.type = GameObjectTypes.Bullet;
        this.owner = params.owner;

        this.initView(BulletView, this);

        (this.view as BulletView).createBullet(params);
    }
    
    public destroyBullet(): void {
        this.canCollide = false;
        (this.view as BulletView).playExplosionAnimation(() => {
            this.destroy();
        })
    }

    public handleCollisionWith(object: GameObject): void {
        if (object.type === GameObjectTypes.BrickWall || object.type === GameObjectTypes.StoneWall || object.type === GameObjectTypes.Eagle) {
            this.destroyBullet();
        }
        if (object.type === GameObjectTypes.Bullet) {
            this.destroyBullet();
        }
        if (object.type === GameObjectTypes.Enemy && this.owner.type === GameObjectTypes.Player) {
            this.destroyBullet();
        }        
    }

    public update(): void {
        if (this.isDestroyed) return;
        (this.view as BulletView).update();
    }  
}

export interface IBulletParams {
    owner?: GameObject,
    x?: number,
    y?: number,
    moveDirection?: MoveDirections;
}