import { Module } from "../../../framework/core/module";
import { PreloaderNotifications } from "./misc/preloader-names";
import { PreloaderInitController } from "./controllers/preloader-init-controller";
import { PreloaderInitView } from "./views/preloader-init-view";

export class PreloaderModule extends Module {
    public registerControllers(): void {
        this.addController(PreloaderNotifications.INIT, PreloaderInitController, PreloaderInitView);
    }

    public registerScenes(): void {
        this.addScene(PreloaderNotifications.INIT, [ PreloaderNotifications.INIT ]);
    }
}