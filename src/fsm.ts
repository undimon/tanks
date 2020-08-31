import { State } from "./state";

export class FSM {
    private initialState: string;
    private states: State[];
    private state: string = null;
    
    constructor(initialState: string, states: any) {
        this.states = states;
        this.initialState = initialState;        

        // State instances get access to the state machine via this.stateMachine.
        // for (const state of Object.values(this.possibleStates)) {
        // state.stateMachine = this;
        // }
    }

    public step(): void {
        if (this.state === null) {
            this.state = this.initialState;
            this.states[this.state].enter();
        }
        this.states[this.state].execute();
    }

    public transition(state: string): void {
        this.state = state;
        this.states[this.state].enter();
    }
}