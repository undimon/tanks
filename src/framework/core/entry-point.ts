import { GraphicsEngineModule } from "../modules/graphics-engine-module/graphics-engine-module";

export class EntryPoint {
    constructor() {
        new GraphicsEngineModule();
    }
}