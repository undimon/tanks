import { PreloaderModule } from './game/modules/preloader-module/preloader-module';
import { EntryPoint } from './framework/core/entry-point';
import { MenuModule } from './game/modules/menu-module/menu-module';
import { GameModule } from './game/modules/game-module/game-module';
export class GameEntryPoint extends EntryPoint {
    constructor() {
        super();
        new PreloaderModule();
        new MenuModule();
        new GameModule();
    }
}

window.onload = function () {
    new GameEntryPoint();
}