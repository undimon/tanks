import { Module } from "../../../framework/core/module";
import { MenuButtonsController } from "./controllers/menu-buttons-controller";
import { MenuInitController } from "./controllers/menu-init-controller";
import { MenuNotifications } from "./misc/menu-names";
import { MenuButtonsView } from "./views/menu-buttons-view";
import { MenuInitView } from "./views/menu-init-view";

export class MenuModule extends Module {
    public registerControllers(): void {
        this.addController(MenuNotifications.INIT, MenuInitController, MenuInitView);
        this.addController(MenuNotifications.BUTTONS, MenuButtonsController, MenuButtonsView);
    }

    public registerScenes(): void {
        //this.addScene(MenuNotifications.INIT, [ MenuNotifications.INIT ]);
        this.addScene(MenuNotifications.INIT, [ MenuNotifications.INIT, MenuNotifications.BUTTONS ]);
    }
}