import { Module } from "../../../framework/core/module";
import { GameOverMainController } from "./controllers/gameover-main-controller";
import { GameOverNotifications } from "./misc/gameover-names";
import { GameOverMainView } from "./views/gameover-main-view";

export class GameOverModule extends Module {
    public registerControllers(): void {
        this.addController(GameOverNotifications.MAIN, GameOverMainController, GameOverMainView);
    }

    public registerScenes(): void {
        this.addScene(GameOverNotifications.SCENE, [ GameOverNotifications.MAIN ]);
    }
}