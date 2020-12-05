import { Controller } from "../../../../framework/core/mvc/controller";
import { MenuNotifications } from "../misc/menu-names";
import { INotification } from '../../../../framework/core/mvc/notification';
import { MenuInitView } from '../views/menu-init-view';
import { GameNotifications } from "../../game-module/misc/game-names";
import { gsap } from "gsap";
import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { MenuButtonsView } from "../views/menu-buttons-view";

export class MenuButtonsController extends Controller {
    
    public addNotifications(): void {
        //this.addNotification(GlobalNotifications.TRANSITION_TO_SCENE, this.showMenu.bind(this));
    }

    public execute(notification: INotification): void {
        this.showMenu();
    }

    protected showMenu(): void {
        (this.view as MenuButtonsView).drawScene();
    }
}