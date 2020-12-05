import { Mvc } from "./mvc";

export class MVCEntity {

	constructor() {
		this.onRegister();
	}

    get mvc(): Mvc {
		return Mvc.getInstance();
	}

	/**
	 * Called once when object is created
	 */
	public onRegister(): void {	
	}

	/**
	 * Sends the notification to all subscribed entities
	 */
	public sendNotification(name: string, body?: any): void {
		console.log('sendNotification: ', name);
		
		this.mvc.sendNotification(name, body);
	}
}