import { Module } from "../../../framework/core/module";
import { PreloaderNotifications } from "./misc/preloader-names";
import { PreloaderMainController } from "./controllers/preloader-main-controller";
import { PreloaderMainView } from "./views/preloader-main-view";

export class PreloaderModule extends Module {
    public registerControllers(): void {
        this.addController(PreloaderNotifications.MAIN, PreloaderMainController, PreloaderMainView);
    }

    public registerScenes(): void {
        this.addScene(PreloaderNotifications.MAIN, [ PreloaderNotifications.MAIN ]);
    }
}