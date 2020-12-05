import { State } from "./state";

export class FSM {
    private states: State[];
    private currentState: string = null;
    
    constructor(states: any) {
        this.states = states;
    }

    // Called in main update loop
    public step(): void {
        if (this.currentState === null) {
            this.currentState = Object.keys(this.states)[0]; // Take the first state as initial   
            this.states[this.currentState].enter();
        }
        this.states[this.currentState].execute();
    }

    // Changes the state
    public transition(newState: string): void {
        this.currentState = newState;
        this.states[this.currentState].enter();
    }
}