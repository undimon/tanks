import { Module } from "../../../framework/core/module";
import { GameMainController } from "./controllers/game-main-controller";
import { GameModels, GameNotifications } from "./misc/game-names";
import { GameMainView } from "./views/game-main-view";
import { GameUiController } from "./controllers/game-ui-controller";
import { GameUiView } from "./views/game-ui-view";
import { GameModel } from "./models/game-model";

export class GameModule extends Module {

    protected registerControllers(): void {    
        this.addController(GameNotifications.MAIN, GameMainController, GameMainView);
        this.addController(GameNotifications.UI, GameUiController, GameUiView);

        //this.addController(GameNotifications.UNITS, GameUnitsController, GameUnitsView);
        //this.addController(GameNotifications.MAP, GameMapController, GameMapView);
        //this.addController(GameNotifications.BULLETS, GameBulletsController, GameBulletsView);
    }

    protected registerModels(): void {
        this.addModel(GameModels.GAME, GameModel);
        //this.addModel(GameModels.MAP, GameMapModel);
        //this.addModel(GameModels.UNITS, GameUnitsModel);
        //this.addModel(GameModels.BULLETS, GameBulletsModel);
    }

    protected registerScenes(): void {
        this.addScene(GameNotifications.SCENE, [ 
            GameNotifications.MAIN,
            GameNotifications.UI,
            //GameNotifications.MAP,
//            GameNotifications.UNITS,
            //GameNotifications.BULLETS
        ]);
    }
}