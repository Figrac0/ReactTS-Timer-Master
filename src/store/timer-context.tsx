import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
    name: string;
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

const initialState: TimersState = {
    isRunning: true,
    timers: [],
};
type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimer: () => void;
    stopTimer: () => void;
};

const TimeContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timersCtx = useContext(TimeContext);

    if (timersCtx === null) {
        throw new Error("TimerContext is nul!!");
    }

    return timersCtx;
}

type TimersContextProviderProps = {
    children: ReactNode;
};

type StartTimerAction = {
    type: "START_TIMER";
};
type StopTimerAction = {
    type: "STOP_TIMER";
};
type AddTimerAction = {
    type: "ADD_TIMER";
    payload: Timer;
};

type Action = StartTimerAction | StopTimerAction | AddTimerAction;

function timerReducer(state: TimersState, action: Action): TimersState {
    if (action.type === "START_TIMER") {
        return {
            ...state,
            isRunning: true,
        };
    }
    if (action.type === "STOP_TIMER") {
        return {
            ...state,
            isRunning: false,
        };
    }
    if (action.type === "ADD_TIMER") {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    duration: action.payload.duration,
                    name: action.payload.name,
                },
            ],
        };
    }
    return state;
}

export default function TimersContextProvider({
    children,
}: TimersContextProviderProps) {
    const [timerState, dispatch] = useReducer(timerReducer, initialState);
    const ctx: TimersContextValue = {
        timers: timerState.timers,
        isRunning: timerState.isRunning,
        addTimer(timerData) {
            dispatch({ type: "ADD_TIMER", payload: timerData });
        },
        startTimer() {
            dispatch({ type: "START_TIMER" });
        },
        stopTimer() {
            dispatch({ type: "STOP_TIMER" });
        },
    };
    return <TimeContext.Provider value={ctx}>{children}</TimeContext.Provider>;
}
