import Button from "./UI/Button.tsx";
import { useTimersContext } from "../store/timer-context.tsx";

export default function Header() {
    const timerCtx = useTimersContext();

    return (
        <header>
            <h1>ReactTimer</h1>

            <Button
                onClick={
                    timerCtx.isRunning
                        ? timerCtx.stopTimer
                        : timerCtx.startTimer
                }>
                {timerCtx.isRunning ? "Stop" : "Start"} Timers
            </Button>
        </header>
    );
}
