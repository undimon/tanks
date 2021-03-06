import { Ticker } from "pixi.js";
import { Model } from "./model";
import { MVCEntity } from "./mvc-entity";
import { View } from "./view";

export class Controller extends MVCEntity {

    public model: Model;
    public view: View;
    protected notificationHandlers: INotificationHandler = {};
    
    constructor() {
        super();
        this.addNotifications();
    }

    /**
     * Called when controller, view and model are initialized
     */
    public postRegister(): void {
    }

    /**
     * Called on notification
     */
    public execute(notification: INotification): void {
    }
    
    /**
     * A place to add all notifications
     */
    public addNotifications(): void {
    }

    /**
     * Subscribes to the notification and stores the handler function
     */
    public addNotification(name: string, notificationHandler: (notification: INotification) => void): void {
        if (!this.notificationHandlers[name]) {
            this.notificationHandlers[name] = [];
        }
        this.notificationHandlers[name].push(notificationHandler);
		this.mvc.addNotification(name, this);
    }

    /**
     * Calls all handlers of a specific notification
     */    
    public handleNotification(notification: INotification): void {
        if (!this.notificationHandlers[notification.name]) return;
        
        this.notificationHandlers[notification.name].forEach(handler => {
            handler.call(this, notification);
        });
    }
    
	/**
	 * Sends the notification to all subscribed entities
	 */
	public sendNotification(name: string, body?: any): void {
		console.log('sendNotification: ', name, body);
		this.mvc.sendNotification(name, body);
    }
        
    /**
     * Gets the model by name
     */    
    public retrieveModel(modelName: string): Model {
        return this.mvc.retrieveModel(modelName);
    } 
    
	public layerTransitionInStart(): void {
		this.view.layerTransitionInStart();
	}

	public layerTransitionOutStart(): void {
        this.view.layerTransitionOutStart();
    }
    
    public getTicker(): Ticker {
        return this.app.pixiApp.ticker; 
    }
}

export interface INotification {
	name: string;
	body: any;
}
export interface INotificationHandler {
	[name: string]: Function[];
}