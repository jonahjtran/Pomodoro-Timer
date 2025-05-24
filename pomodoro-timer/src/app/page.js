"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";



/**
 * Home Component - A Pomodoro Timer application
 * 
 * This component implements a Pomodoro technique timer with work and break modes.
 * It allows users to start, pause, and reset the timer.
 * Work mode is set to 25 minutes by default, and break mode is set to 10 minutes.
 * 
 * @returns {JSX.Element} The rendered Pomodoro Timer interface
 * 
 * State:
 * @property {number} minutes - Current minutes remaining on the timer
 * @property {number} seconds - Current seconds remaining on the timer
 * @property {boolean} running - Whether the timer is currently running
 * @property {string} mode - Current timer mode ("work," "short break," or "long break")
 * @property {number} break_count - number of short breaks before a long break
 * @property {number} long_time - duration of a long break
 * @property {number} short_time - duration of a short break
 * 
 * Functions:
 * @function toggleTimer - Toggles the timer between running and paused states
 * @function resetTimer - Resets the timer to the default time based on the current mode
 */
/**
 * Pomodoro Timer Home Component
 * 
 * A React component that implements a Pomodoro timer with work and break modes.
 * The timer defaults to 25 minutes for work mode and 5 minutes for break mode.
 * Users can start, pause, and reset the timer.
 * 
 * @component
 * @returns {JSX.Element} The rendered Pomodoro timer interface with time display and control buttons
 */
/**
 * A Pomodoro Timer application component that helps users manage work and break intervals.
 * 
 * Features:
 * - Two modes: work (25 minutes) and break (5 minutes)
 * - Start/pause functionality for the timer
 * - Reset functionality to reset the current mode timer
 * - Automatic timer display formatting (MM:SS)
 * - Visual indication of the current mode
 * - Responsive design with a clean user interface
 * 
 * State:
 * - minutes: Current minutes remaining in the timer
 * - seconds: Current seconds remaining in the timer
 * - running: Boolean indicating if the timer is currently running
 * - mode: Current mode ("work" or "break")
 * 
 * The component handles mode switching, timer countdown logic, and provides
 * a user-friendly interface for the Pomodoro technique of time management.
 * 
 * @returns {JSX.Element} The rendered Pomodoro Timer component
 */
/**
 * Home component implementing a Pomodoro Timer
 * 
 * This component provides a timer for the Pomodoro Technique with three modes:
 * - Work: Default 25-minute focus period
 * - Short break: Default 5-minute rest period
 * - Long break: Default 10-minute extended rest period that occurs after a set number of work sessions
 * 
 * The timer automatically cycles between work and break sessions, with a longer break
 * occurring after a configurable number of work periods.
 * 
 * @returns {JSX.Element} The rendered Pomodoro Timer interface with mode selection and timer controls
 */
export default function Home() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [count, setCount] = useState(0);
  const [break_count, setBreakCount] = useState(4);
  const [long_time, setLongTime] = useState(10);
  const [short_time, setShortTime] = useState(5);
  const [work_time, setWorkTime] = useState(25);

  useEffect(() => {
    let interval = null;
    if (running) { // start coutdown
      interval = setInterval(() => { // keeps running function to ensure timing consistency
          if (seconds > 0) { // regular second decrement
            setSeconds(seconds - 1);
          } else if (minutes > 0) { // end of a minute
            setMinutes(minutes - 1);
            setSeconds(59);
          } else { // timer over
            setRunning(false);
            setSeconds(0);
            if (mode == "work") { // just finished work, move to break
              setCount(count + 1);
              if (count % break_count == 0) {
                setCount(0);
                setMode("long break");
              } else {
                setMode("short break");
            }
            } else { // finished a break, now go to work
              setMode("work");
              setMinutes(work_time);
            }
          }
      }, 1000);
    } else if (!running && seconds != 0 || minutes != 0) {
      clearInterval(interval);
    }
    return ()=> clearInterval(interval);
  }, [running, seconds, minutes, mode]);

  const toggleTimer = () => {
    setRunning(!running);
  }

  const resetTimer = () => {
    setRunning(false);
    setSeconds(0);
    if (mode == "work") { // resetting work
      setMinutes(work_time);
    } else if (mode == "short break"){ // reseting short break
      setMinutes(short_time);
    } else { // resetting long break
      setMinutes(long_time);
    }
  }
  
  const displayTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  const handleModeClick = (newMode) => {
    if (mode === newMode) {
      // If clicking on the current mode, just reset the timer
      resetTimer();
    } else {
      // If clicking on a different mode, change mode and reset timer
      setMode(newMode); 
      setRunning(false);
      setSeconds(0);
      if (newMode === "work") {
        setMinutes(work_time);
      } else if (newMode == "short break") {
        setMinutes(short_time);
      } else { // switched to long break
        setMinutes(long_time);
      }
    }
  };

  return (
    <div className="bg-[#ffedbf] min-h-screen w-full flex flex-col items-center justify-center space-y-6">
      <div className="bg-[#ffcd74] rounded-xl shadow-lg p-8 w-96 h-96 text-center flex flex-col">
        <div className="flex justify-center space-x-6 mb-4">
          <span 
            className={`cursor-pointer text-l font-bold transition-colors ${mode === "work" ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => handleModeClick("work")}
          >
            Work
          </span>
          <span 
            className={`cursor-pointer text-l font-bold transition-colors ${mode === "short break" ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => handleModeClick("short break")}
          >
            Short Break
          </span>
          <span 
            className={`cursor-pointer text-l font-bold transition-colors ${mode === "long break" ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => handleModeClick("long break")}
          >
            Long Break
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-white font-bold text-7xl">{displayTime}</h1>
        </div>
        <div className="mb-2">
          <h1 className="text-white font-bold text-2xl">
            {mode === "short break" || mode === "long break" ? "Time to relax!" : "Time to work!"}
          </h1>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-[#ffcd74] hover:bg-[#ffbc4d] transition-colors items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold" onClick={resetTimer}>Reset</button>
        <button className="bg-[#ffcd74] hover:bg-[#ffbc4d] transition-colors items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold" onClick={toggleTimer}>
          {running ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}