import { Model } from "./model";
import { MVCEntity } from "./mvc-entity";
import { INotification } from "./notification";
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
     * Gets the model by name
     */    
    public retrieveModel(modelName: string): any {
        return this.mvc.retrieveModel(modelName);
    } 
    
	public layerTransitionInStart(): void {
		this.view.layerTransitionInStart();
	}

	public layerTransitionOutStart(): void {
        this.view.layerTransitionOutStart();
	}    
}

export interface INotificationHandler {
	[name: string]: Function[];
}