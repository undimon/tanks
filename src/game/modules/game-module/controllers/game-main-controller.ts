import { Controller } from "../../../../framework/core/mvc/controller";
import { INotification } from '../../../../framework/core/mvc/notification';
import { GameModels, GameNotifications } from "../misc/game-names";
import { GameMainView } from "../views/game-main-view";
import { AppManager } from "../../../../framework/core/app-manager";
import { GameObject } from "../misc/game-object";
import { GameObjectTypes } from "../misc/game-object-types";
import { UnitsFactory } from './factories/units-factory';
import { Unit } from "../views/elements/unit/unit";
import { Bullet, IBulletParams } from "../views/elements/bullet/bullet";
import { GameModel } from "../models/game-model";
import { MapFactory } from "./factories/map-factory";
import { MapItem } from "../views/elements/map/map-item";
import { BulletsFactory } from "./factories/bullets-factory";

export class GameMainController extends Controller {

    protected gameModel: GameModel;

    protected bulletsFactory: BulletsFactory;
    protected unitsFactory: UnitsFactory;

    public postRegister(): void {
        this.gameModel = this.retrieveModel(GameModels.GAME) as GameModel;
    }

    public addNotifications(): void {
        this.addNotification(GameNotifications.CREATE_BULLET, this.createBullet.bind(this));
    }

    public execute(notification: INotification): void {
        
        (this.view as GameMainView).initScene();

        this.initMap();
        this.initUnits();
        this.initBullets();

        AppManager.getInstance().app.ticker.add(() => {
            this.update();
        }); 
    }

    protected initUnits(): void {
        this.unitsFactory = new UnitsFactory();

        this.unitsFactory.onCreateBullet = (params: IBulletParams) => {
            this.sendNotification(GameNotifications.CREATE_BULLET, params);
        }
        this.unitsFactory.onUnitCreate = (unit: Unit) => {
            this.addToView(unit);
            this.gameModel.addUnit(unit);
        };
        this.unitsFactory.onUnitDestroy = (unit: Unit) => {
            this.gameModel.removeUnit(unit);
            if (unit.type === GameObjectTypes.Player) {
                this.onPlayerDestroy();
            }
        };
        this.unitsFactory.getSpawnPoint = (type: GameObjectTypes) => {
            return this.gameModel.getSpawnPoint(type);
        };

        this.unitsFactory.createPlayer();

        setInterval(() => {
            if (this.gameModel.enemiesLeft === 0) return;
            this.unitsFactory.createEnemy();
            this.sendNotification(GameNotifications.UI_UPDATE);
        }, 2000); 
        
    }

    protected onPlayerDestroy(): void {
        this.sendNotification(GameNotifications.UI_UPDATE);

        if (this.gameModel.playerLives === 0) {
            this.gameOver();
            return;
        }

        this.unitsFactory.createPlayer();
    }

    protected gameOver(): void {
        console.log('game over');
    }

    protected initMap(): void {
        const mapFactory: MapFactory = new MapFactory();
        
        mapFactory.onMapItemCreate = (mapItem: MapItem) => {
            // Trees should be above
            if (mapItem.type === GameObjectTypes.Tree) {
                this.addToView(mapItem, true);
            }
            else {
                this.addToView(mapItem);
            }
            this.gameModel.addMapItem(mapItem);
        };
        mapFactory.onMapItemDestroy = (mapItem: MapItem) => {
            if (mapItem.type === GameObjectTypes.Eagle) {
                this.gameOver();
            }
            this.gameModel.removeMapItem(mapItem);
        };

        mapFactory.createMapItems();
    }

    protected initBullets(): void {
        this.bulletsFactory = new BulletsFactory();

        this.bulletsFactory.onBulletCreate = (bullet: Bullet) => {
            this.addToView(bullet);
            this.gameModel.addBullet(bullet);
        };
        this.bulletsFactory.onBulletDestroy = (bullet: Bullet) => {
            this.gameModel.removeBullet(bullet);
        };
    }

    protected createBullet(notification: INotification): void {
        this.bulletsFactory.createBullet(notification.body);
    }
    
    protected update(): void {

        const objects: GameObject[] = [
            ...this.gameModel.mapItems,
            ...this.gameModel.units,
            ...this.gameModel.bullets
        ];

        objects.forEach((object: GameObject) => {
            object.update();
            objects.forEach((otherObject: GameObject) => {
                object.checkCollisionWith(otherObject);
            })    
        });
    } 

    public addToView(gameObject: GameObject, placeInFront: boolean = false): void {
        gameObject.addToStage((this.view as GameMainView).getDisplay(placeInFront));
    }    
}