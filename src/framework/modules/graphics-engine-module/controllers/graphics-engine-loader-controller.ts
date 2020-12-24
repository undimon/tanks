import { AppManager } from "../../../core/app-manager";
import { Controller, INotification } from "../../../core/mvc/controller";
import { GraphicsEngineNotifications } from "../misc/graphics-engine-names";

export class GraphicsEngineLoaderController extends Controller {

    public execute(notification: INotification): void {
        AppManager.getInstance().startAssetsLoading(notification.body, this.onAssetsLoadingComplete.bind(this), this.onAssetsLoadingProgress.bind(this));
    }

    protected onAssetsLoadingComplete(): void {
        this.sendNotification(GraphicsEngineNotifications.ASSETS_LOADING_COMPLETE);
    }

    protected onAssetsLoadingProgress(progress: number): void {
        this.sendNotification(GraphicsEngineNotifications.ASSETS_LOADING_ON_PROGRESS, progress);
    }    
}