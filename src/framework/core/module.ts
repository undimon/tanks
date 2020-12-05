import { Controller } from "./mvc/controller";
import { Model } from "./mvc/model";
import { Mvc } from "./mvc/mvc";
import { View } from "./mvc/view";

export class Module {

    constructor() {
        this.registerModels();
        this.registerControllers();
        this.registerScenes();
	}

    get mvc(): Mvc {
		return Mvc.getInstance();
    }

    protected registerModels(): void {
    }

    protected registerControllers(): void {
    }

    protected registerScenes(): void {
    }

    public addModel(modelName: string, modelClass: typeof Model): void {
        this.mvc.registerModel(modelName, modelClass);
    }   

    public addController(notificationName: string, controllerClass: typeof Controller, viewClass?: typeof View): void {
        this.mvc.registerController(notificationName, controllerClass, viewClass);
    }  
    
    /**
     * Maps a notification to a set of controllers which will be called during scene transition
     */
    public addScene(sceneNotification: string, controllersNotifications: string[]): void {
        this.mvc.registerScene(sceneNotification, controllersNotifications);
    }
}