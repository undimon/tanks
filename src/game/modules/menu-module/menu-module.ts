import { Module } from "../../../framework/core/module";
import { MenuMainController } from "./controllers/menu-main-controller";
import { MenuNotifications } from "./misc/menu-names";
import { MenuMainView } from "./views/menu-main-view";

export class MenuModule extends Module {
    public registerControllers(): void {
        this.addController(MenuNotifications.MAIN, MenuMainController, MenuMainView);
    }

    public registerScenes(): void {
        this.addScene(MenuNotifications.SCENE, [ MenuNotifications.MAIN ]);
    }
}