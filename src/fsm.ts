import { State } from "./state";

export class FSM {
    //private initialState: string;
    private states: State[];
    private state: string = null;
    
    constructor(states: any) {
        this.states = states;
        //this.initialState = Object.keys(states)[0]; // Take the first state as initial   
    }

    public step(): void {
        if (this.state === null) {
            this.state = Object.keys(this.states)[0]; // Take the first state as initial   
            this.states[this.state].enter();
            console.log('aaa');
            
        }
        this.states[this.state].execute();
    }

    public transition(state: string): void {
        this.state = state;
        this.states[this.state].enter();
    }
}