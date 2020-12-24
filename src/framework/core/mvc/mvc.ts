import { Controller } from './controller';
import { Model } from './model';
import { View } from './view';
import { AppManager } from '../app-manager';
import { GlobalNotifications } from '../global-notifications';
import { Container } from 'pixi.js';

export class Mvc {
    private static instance: Mvc;
    // Holds all controllers 
    protected controllers: IControllersIndex = {};
    // Holds all notifications and their subscribers 
    protected notifications: INotificationIndex = {};
    // Holds all models
    protected models: IModelIndex = {};
    // Holds all scenes
    protected scenes: ISceneEntity[] = [];

    constructor() {
        if (Mvc.instance) {
            throw new Error("Error - use Mvc.getInstance()");
        }        
    }

    public static getInstance(): Mvc {
        if (!Mvc.instance) {
            Mvc.instance = new Mvc();
        }
		return Mvc.instance;
	}

    /**
     * Subsctibes a controller to a notification
     */
    public addNotification(name, controller: Controller): void {
        if (!this.notifications[name]) {
            this.notifications[name] = [];
        }        
        this.notifications[name].push(controller);
    }

    public sendNotification(name: string, body?: any): void {
        this.handleSceneTransitionNotification(name, body);
        this.handleNotification(name, body);
    }

    /**
     * Handle scene transition notifications.
     * Run through all controllers which were mapped to scenes
     * and call approprite methods: execute and show / hide layer
     */
    protected handleSceneTransitionNotification(name: string, body?: any): void {
        if (name !== GlobalNotifications.TRANSITION_TO_SCENE) return;
        
        let sceneNotification: string = body.scene ? body.scene : body;
        
        // Run through all scenese
        this.scenes.forEach((scene: ISceneEntity) => {
            // Run through all controllers registered in the scene
            scene.controllersNotifications.forEach((notification: string) => {                  
                // If the current scene is for transition - call its controllers
                if (scene.sceneNotification === sceneNotification) {
                    this.controllers[notification].execute({ name: notification, body });
                    this.controllers[notification].layerTransitionInStart();
                }
                else {
                    this.controllers[notification].layerTransitionOutStart();
                }                    
            })      
        });
    }

    /**
     * Run through all controllers which are subscribed to notification
     * and call their handler methods.
     */
    protected handleNotification(name: string, body?: any): void {
        if (!this.notifications[name]) return;

        const controllers: Controller[] = this.notifications[name];
        controllers.forEach((controller: Controller) => {
            controller.handleNotification({ name, body });
        });         
    }

    public createController(controllerClass: typeof Controller, viewClass?: typeof View, layer?: Container): Controller {
        let controller: Controller = new controllerClass();
        controller.onRegister();
        
        if (viewClass) {
            controller.view = new viewClass();
            controller.view.controller = controller;
            controller.view.onRegister();
            if (layer) {
                layer.addChild(controller.view.display);    
            }
            else {
                AppManager.getInstance().addLayerToScene(controller.view.display);
            }
            controller.view.postRegister();
        }

        controller.postRegister();
        
        return controller;        
    }

    public registerController(notificationName: string, controllerClass: typeof Controller, viewClass?: typeof View): void {
        let controller: Controller = this.createController(controllerClass, viewClass);        
 
        this.controllers[notificationName] = controller;
        
        // Subscribe itself to notification
        controller.addNotification(notificationName, controller.execute.bind(controller));
    }

    public registerModel(modelName: string, modelClass: typeof Model): void {
        let model: any = new modelClass();
        this.models[modelName] = model;	
    }  

    public retrieveModel(modelName: string): Model {
        return this.models[modelName];	
    }    
    
    public registerScene(sceneNotification: string, controllersNotifications: string[]): void {
        this.scenes.push(
            { sceneNotification, controllersNotifications }
        );
    }
}

export interface IControllersIndex {
	[notificationName: string]: Controller;
}

export interface INotificationIndex {
	[name: string]: Controller[];
}

export interface IModelIndex {
	[modelName: string]: Model;
}

export interface ISceneEntity {
    sceneNotification: string; 
    controllersNotifications: string[];
}