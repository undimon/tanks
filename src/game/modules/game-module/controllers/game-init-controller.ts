import { Controller } from "../../../../framework/core/mvc/controller";
import { INotification } from '../../../../framework/core/mvc/notification';
import { GameInitView } from "../views/game-init-view";

export class GameInitController extends Controller {
    
    public addNotifications(): void {
        //this.addNotification(MenuNotifications.SHOW, this.showMenu.bind(this));
    }

    public execute(notification: INotification): void {
        this.showMenu();
    }

    protected showMenu(): void {
        (this.view as GameInitView).drawScene();
    }
}