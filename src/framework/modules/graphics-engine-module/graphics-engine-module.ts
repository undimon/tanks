import { Module } from "../../core/module";
import { GraphicsEngineLoaderController } from "./controllers/graphics-engine-loader-controller";
import { GraphicsEngineNotifications } from "./misc/graphics-engine-names";

export class GraphicsEngineModule extends Module {  
    public registerControllers(): void {
        this.addController(GraphicsEngineNotifications.START_ASSETS_LOADING, GraphicsEngineLoaderController);
    }
}