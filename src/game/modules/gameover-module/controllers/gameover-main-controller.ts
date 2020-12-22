import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { Controller } from "../../../../framework/core/mvc/controller";
import { INotification } from '../../../../framework/core/mvc/notification';
import { GameNotifications } from "../../game-module/misc/game-names";
import { GameOverMainView } from "../views/gameover-main-view";

export class GameOverMainController extends Controller {
    
    public execute(notification: INotification): void {
        this.drawScene();
        this.drawMenu();
    }

    protected drawScene(): void {
        (this.view as GameOverMainView).drawScene();
    }

    protected drawMenu(): void {
        (this.view as GameOverMainView).drawMenuButtons(
            () => {
                this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, GameNotifications.SCENE); 
            }
        );
    }
}