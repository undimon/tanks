import { gsap } from "gsap";
import { AppManager } from "../../../../framework/core/app-manager";
import { GlobalNotifications } from "../../../../framework/core/global-notifications";
import { Controller } from "../../../../framework/core/mvc/controller";
import { INotification } from '../../../../framework/core/mvc/notification';
import { GraphicsEngineNotifications } from "../../../../framework/modules/graphics-engine-module/misc/graphics-engine-names";
import { MenuNotifications } from "../../menu-module/misc/menu-names";
import { Config } from "../../misc/config";
import { PreloaderNotifications } from "../misc/preloader-names";
import { PreloaderInitView } from "../views/preloader-init-view";

export class PreloaderInitController extends Controller {
    protected loadingInitialAssets: boolean = true;

    public addNotifications(): void {
        this.addNotification(GraphicsEngineNotifications.ASSETS_LOADING_COMPLETE, this.onAssetsLoadingComplete.bind(this));
        this.addNotification(GraphicsEngineNotifications.ASSETS_LOADING_ON_PROGRESS, this.onAssetsLoadingProgress.bind(this));
    }

    public postRegister(): void {	
        this.startAssetsLoading();
    }

    /**
     * There are two loading phases: 
     * 1) Load the preloader assets in order to show the progress bar
     * 2) Load the rest of the assets
     */    
    protected startAssetsLoading(): void {
        let assets: any = Config.assets;
        if (this.loadingInitialAssets) {
            assets = Config.preloaderAassets;
        }
        this.sendNotification(GraphicsEngineNotifications.START_ASSETS_LOADING, assets);
    }

    protected onAssetsLoadingComplete(notification: INotification): void {
        if (this.loadingInitialAssets) {
            // Have loaded the initial assets, so can draw the scene
            // and can start to load the rest of the game assets
            this.loadingInitialAssets = false;
            (this.view as PreloaderInitView).drawScene();
            this.startAssetsLoading()
            return;
        }
        
        gsap.delayedCall(1, () => {
            // Transition to menu scene
            this.sendNotification(GlobalNotifications.TRANSITION_TO_SCENE, MenuNotifications.INIT);
        });
    }

    protected onAssetsLoadingProgress(notification: INotification): void {
        // Cannot display a progrees if there is no progress bar yet :)
        if (this.loadingInitialAssets) return;
        (this.view as PreloaderInitView).updateProgressBar(notification.body);
    }
}