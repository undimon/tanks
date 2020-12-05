import { Module } from "../../../framework/core/module";
import { GameInitController } from "./controllers/game-init-controller";
import { GameNotifications } from "./misc/game-names";
import { GameInitView } from "./views/game-init-view";

export class GameModule extends Module {
    public registerControllers(): void {
        this.addController(GameNotifications.INIT, GameInitController, GameInitView);
    }

    public registerScenes(): void {
        this.addScene(GameNotifications.INIT, [ GameNotifications.INIT ]);
    }
}