import { Mvc } from "./mvc";
export class MVCEntity {

    get mvc(): Mvc {
		return Mvc.getInstance();
	}

	/**
	 * Called once when object is created
	 */
	public onRegister(): void {	
	}
}