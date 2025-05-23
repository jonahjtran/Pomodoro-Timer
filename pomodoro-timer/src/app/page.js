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
 * @property {string} mode - Current timer mode ("work" or "break")
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
export default function Home() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");

  useEffect(() => {
    let interval = null;
    if (running) { // start coutdown
      interval = setInterval(() => { // keeps running function to ensure timing consistency
        if (mode === "work") { // work mode
          if (seconds > 0) { // regular second decrement
            setSeconds(seconds - 1);
          } else if (minutes > 0) { // end of a minute
            setMinutes(minutes - 1);
            setSeconds(59);
          } else { // timer over
            setRunning(false);
            setMinutes(25);
            setSeconds(0);
          }
        } else if (mode === "break") { // break mode
          if (seconds > 0) { // regular second decrement
            setSeconds(seconds - 1);
          } else if (minutes > 0) { // end of a minute
            setMinutes(minutes - 1);
            setSeconds(59);
          } else { // timer over
            clearInterval(interval);
            setRunning(false);
            setMinutes(5);
            setSeconds(0);
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
    if (mode == "work") { // resetting work
      setMinutes(25);
      setSeconds(0);
    } else { // reseting break
      setMinutes(5);
      setSeconds(0);
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
      if (newMode === "work") {
        setMinutes(25);
        setSeconds(0);
      } else {
        setMinutes(5);
        setSeconds(0);
      }
    }
  };

  return (
    <div className="bg-[#ffedbf] min-h-screen w-full flex flex-col items-center justify-center space-y-6">
      <div className="bg-[#ffcd74] rounded-xl shadow-lg p-8 w-96 h-96 text-center flex flex-col">
        <div className="flex justify-center space-x-6 mb-4">
          <span 
            className={`cursor-pointer text-xl font-bold transition-colors ${mode === "work" ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => handleModeClick("work")}
          >
            Work
          </span>
          <span 
            className={`cursor-pointer text-xl font-bold transition-colors ${mode === "break" ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => handleModeClick("break")}
          >
            Break
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-white font-bold text-7xl">{displayTime}</h1>
        </div>
        <div className="mb-2">
          <h1 className="text-white font-bold text-2xl">
            {mode === "break" ? "Time to relax!" : "Time to work!"}
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