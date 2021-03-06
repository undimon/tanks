import { Controller, INotification } from "../../../../framework/core/mvc/controller";
import { GameModels, GameNotifications } from "../misc/game-names";
import { GameModel } from "../models/game-model";
import { GameMainView } from "../views/game-main-view";
import { GameUiView } from "../views/game-ui-view";

export class GameUiController extends Controller {
    
    protected gameModel: GameModel;

    public addNotifications(): void {
        this.addNotification(GameNotifications.UI_UPDATE, this.updateUi.bind(this));
    }

    public postRegister(): void {
        this.gameModel = this.retrieveModel(GameModels.GAME) as GameModel;
        (this.view as GameUiView).initUi();
    }

    public execute(notification: INotification): void {
        this.updateUi();
    }

    public updateUi(notification?: INotification): void {
        (this.view as GameUiView).updateLives(this.gameModel.playerLife);
        (this.view as GameUiView).updateEnemies(this.gameModel.enemiesToSpawn);
    }
}