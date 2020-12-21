import { State } from "./state";

export class FSM {
    protected states: IStates;
    protected currentStateId: number = null;
    
    public registerStates(states: IStates) {
        this.states = states;

        // Transition into the first state
        const stateId: number = Number(Object.keys(this.states)[0]); // Take the first state as initial 
        this.transition(stateId);
    }

    // Called in main update loop
    public step(): void {
        this.states[this.currentStateId].execute();
    }

    // Changes the state
    public transition(nextStateId: number): void {
        this.currentStateId = nextStateId;
        this.states[this.currentStateId].enter();
    }

    public get state(): State {
        return this.states[this.currentStateId];
    }
}

export interface IStates {
    [stateName: number]: State
}