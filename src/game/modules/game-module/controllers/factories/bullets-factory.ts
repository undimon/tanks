import { Bullet, IBulletParams } from "../elements/bullet/bullet";

export class BulletsFactory {
    public onBulletCreate: Function;
    public onBulletDestroy: Function;

    public createBullet(params: IBulletParams): void {
        const bullet: Bullet = new Bullet();
        bullet.init(params);
        
        bullet.onDestroy = () => this.onBulletDestroy(bullet); 

        this.onBulletCreate(bullet);
    }
     
}