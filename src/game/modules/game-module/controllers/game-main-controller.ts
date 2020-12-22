import { Controller } from "../../../../framework/core/mvc/controller";
import { INotification } from '../../../../framework/core/mvc/notification';
import { GameModels, GameNotifications } from "../misc/game-names";
import { GameMainView } from "../views/game-main-view";
import { AppManager } from "../../../../framework/core/app-manager";
import { GameObject } from "../misc/game-object";
import { GameObjectTypes } from "../misc/game-object-types";
import { UnitsFactory } from './factories/units-factory';
import { Unit } from "./elements/unit/unit";
import { Bullet, IBulletParams } from "./elements/bullet/bullet";
import { GameModel } from "../models/game-model";
import { MapItem } from "./elements/map/map-item";
import { BulletsFactory } from "./factories/bullets-factory";
import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { GameOverNotifications } from "../../gameover-module/misc/gameover-names";
import gsap from "gsap";
import { MapFactory } from "./factories/map-factory";

export class GameMainController extends Controller {

    protected gameModel: GameModel;

    protected bulletsFactory: BulletsFactory;
    protected unitsFactory: UnitsFactory;
    protected mapFactory:  MapFactory;

    protected enemySpawnDelay: number = 4;
    protected shouldSpawnEnemy: boolean = true;

    protected addBonusDelay: number = 3;
    protected shouldAddBonus: boolean = true;

    public postRegister(): void {
        this.gameModel = this.retrieveModel(GameModels.GAME) as GameModel;
    }

    public execute(notification: INotification): void {
        this.gameModel.init();

        (this.view as GameMainView).initScene();

        this.initMap();
        this.initUnits();
        this.initBullets();

        gsap.delayedCall(1, () => {
            AppManager.getInstance().app.ticker.add(this.update, this); 
        });
    }

    protected initUnits(): void {
        this.unitsFactory = new UnitsFactory();

        this.unitsFactory.onCreateBullet = (params: IBulletParams) => {
            this.bulletsFactory.createBullet(params);
        }
        this.unitsFactory.onUnitCreate = (unit: Unit) => {
            this.addToView(unit);
            this.gameModel.addUnit(unit);
        };
        this.unitsFactory.onUnitDestroy = (unit: Unit) => {
            this.gameModel.removeUnit(unit);
            if (unit.type === GameObjectTypes.Player) {
                this.gameOver();
            }
        };
        this.unitsFactory.onUnitHitOrHeal = (unit: Unit) => {
            if (unit.type === GameObjectTypes.Player) {
                this.sendNotification(GameNotifications.UI_UPDATE);
            }
        };        
        this.unitsFactory.getSpawnPoint = (type: GameObjectTypes) => {
            return this.gameModel.getSpawnPoint(type);
        };

        this.unitsFactory.createPlayer();
    }

    protected spawnNewEnemy(): void {
        if (this.gameModel.enemiesLeft === 0) return;
        if (!this.shouldSpawnEnemy) return;
        
        this.shouldSpawnEnemy = false;
        gsap.delayedCall(this.enemySpawnDelay, () => { this.shouldSpawnEnemy = true });
        
        this.unitsFactory.createEnemy();
        this.sendNotification(GameNotifications.UI_UPDATE);
    }

    protected addNewBonus(): void {
        if (!this.shouldAddBonus) return;
        
        this.shouldAddBonus = false;
        gsap.delayedCall(this.addBonusDelay, () => { this.shouldAddBonus = true });
        
        this.mapFactory.addRandomBonus();
        //this.sendNotification(GameNotifications.UI_UPDATE);
    }

    protected initMap(): void {
        this.mapFactory = new MapFactory();
        
        this.mapFactory.onMapItemCreate = (mapItem: MapItem) => {
            // Trees should be above
            if (mapItem.type === GameObjectTypes.Tree) {
                this.addToView(mapItem, true);
            }
            else {
                this.addToView(mapItem);
            }
            this.gameModel.addMapItem(mapItem);
        };
        this.mapFactory.onMapItemDestroy = (mapItem: MapItem) => {
            if (mapItem.type === GameObjectTypes.Eagle) {
                this.gameOver();
            }
            this.gameModel.removeMapItem(mapItem);
        };

        this.mapFactory.createMapItems();
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
    
    protected gameOver(): void {
        AppManager.getInstance().app.ticker.remove(this.update, this);

        gsap.delayedCall(1, () => {
            this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, GameOverNotifications.SCENE);
        });
    }

    protected update(): void {
        this.gameModel.update();
        this.spawnNewEnemy();
        this.addNewBonus();
    } 

    public addToView(gameObject: GameObject, placeInFront: boolean = false): void {
        gameObject.addToStage((this.view as GameMainView).getDisplay(placeInFront));
    }    
}