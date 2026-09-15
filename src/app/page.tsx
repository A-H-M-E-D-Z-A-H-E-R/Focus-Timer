"use client";
import { useState, useEffect } from "react";
export default function Home() {
  const [sessions, setSessions] = useState(0);
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time]);
  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false);
      setSessions((prevSessions) => prevSessions + 1);
    }
  }, [time, isRunning]);
  return (
    <section className="focus-timer">
      <h1 className="title  font-extrabold text-2xl text-center m-10">
        Focus Timer
      </h1>
      <div className="counter-card flex justify-center mt-10">
        <h1 className="counter font-bold text-6xl">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </h1>
      </div>
      <div className="timers-btns flex justify-center mt-11">
        <button
          className="btn btn-soft btn-success rounded-full m-4"
          onClick={() => {
            if (time > 0) {
              setIsRunning(true);
            }
          }}
        >
          Start
        </button>
        <button
          className="btn btn-soft btn-warning  rounded-full m-4"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
        <button
          className="btn btn-soft btn-error rounded-full m-4"
          onClick={() => {
            setTime(1500);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
      <div className="completed-sessions flex justify-center ">
        <h1 className="sessions font-bold mt-8">Sessions: {sessions}</h1>
      </div>
    </section>
  );
}
