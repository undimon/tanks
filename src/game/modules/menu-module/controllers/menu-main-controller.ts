import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { Controller, INotification } from "../../../../framework/core/mvc/controller";
import { GameNotifications } from "../../game-module/misc/game-names";
import { MenuMainView } from '../views/menu-main-view';

export class MenuMainController extends Controller {
    
    public execute(notification: INotification): void {
        this.drawScene();
        this.drawMenu();
    }

    protected drawScene(): void {
        (this.view as MenuMainView).drawScene();
    }

    protected drawMenu(): void {
        (this.view as MenuMainView).drawMenuButtons(
            () => {
                this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, GameNotifications.SCENE); 
            }
        );
    }
}