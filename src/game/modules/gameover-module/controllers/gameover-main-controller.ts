import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { Controller, INotification } from "../../../../framework/core/mvc/controller";
import { GameNotifications } from "../../game-module/misc/game-names";
import { GameOverMainView } from "../views/gameover-main-view";

export class GameOverMainController extends Controller {
    
    public execute(notification: INotification): void {

        (this.view as GameOverMainView).drawScene(notification.body.isWin);

        (this.view as GameOverMainView).drawMenuButtons(
            () => {
                this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, GameNotifications.SCENE); 
            }
        );
    }
}