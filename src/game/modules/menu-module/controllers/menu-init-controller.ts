import { Controller } from "../../../../framework/core/mvc/controller";
import { MenuNotifications } from "../misc/menu-names";
import { INotification } from '../../../../framework/core/mvc/notification';
import { MenuInitView } from '../views/menu-init-view';
import { GameNotifications } from "../../game-module/misc/game-names";
import { gsap } from "gsap";
import { GlobalNotifications } from "../../../../framework/core/global-notifications";

export class MenuInitController extends Controller {
    
    public execute(notification: INotification): void {
        this.showMenu();

        gsap.delayedCall(1, () => {
            // Transition to game scene
            this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, GameNotifications.SCENE);
        })
    }

    protected showMenu(): void {
        (this.view as MenuInitView).drawScene();
    }
}