"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const THEMES = {
  default: {
    name: "Default",
    backgroundColor: "#ffedbf",
    timerColor: "#ffcd74",
    hoverColor: "#ffbc4d"
  },
  dark: {
    name: "Dark",
    backgroundColor: "#1e1e1e",
    timerColor: "#2d2d2d",
    hoverColor: "#3d3d3d"
  },
  ocean: {
    name: "Ocean",
    backgroundColor: "#e3f2fd",
    timerColor: "#2196f3",
    hoverColor: "#1976d2"
  },
  forest: {
    name: "Forest",
    backgroundColor: "#e8f5e9",
    timerColor: "#4caf50",
    hoverColor: "#388e3c"
  },
  sunset: {
    name: "Sunset",
    backgroundColor: "#fff3e0",
    timerColor: "#ff9800",
    hoverColor: "#f57c00"
  },
  lavender: {
    name: "Lavender",
    backgroundColor: "#f3e5f5",
    timerColor: "#9c27b0",
    hoverColor: "#7b1fa2"
  }
};

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
  const [showSettings, setShowSettings] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState(THEMES.default.backgroundColor);
  const [timerColor, setTimerColor] = useState(THEMES.default.timerColor);
  const [hoverColor, setHoverColor] = useState(THEMES.default.hoverColor);

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

  const handleThemeChange = (themeName) => {
    const theme = THEMES[themeName];
    setCurrentTheme(themeName);
    setBackgroundColor(theme.backgroundColor);
    setTimerColor(theme.timerColor);
    setHoverColor(theme.hoverColor);
  };

  const handleSettingsSave = (newSettings) => {
    setWorkTime(newSettings.workTime);
    setShortTime(newSettings.shortTime);
    setLongTime(newSettings.longTime);
    setBreakCount(newSettings.breakCount);
    setShowSettings(false);
    resetTimer();
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center space-y-6`} style={{ backgroundColor }}>
      <div className={`rounded-xl shadow-lg p-8 w-96 h-96 text-center flex flex-col`} style={{ backgroundColor: timerColor }}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6">
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
          <button 
            onClick={() => setShowSettings(true)}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
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
        <button 
          className={`hover:bg-[#ffbc4d] transition-colors items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold`} 
          style={{ backgroundColor: timerColor }}
          onClick={resetTimer}
        >
          Reset
        </button>
        <button 
          className={`hover:bg-[#ffbc4d] transition-colors items-center text-center flex justify-center h-16 w-40 text-lg rounded-md p-4 text-white font-bold`} 
          style={{ backgroundColor: timerColor }}
          onClick={toggleTimer}
        >
          {running ? "Pause" : "Start"}
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-[#1e1e1e] p-8 rounded-lg w-[480px] text-white shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-300">Time (minutes)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Work</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={work_time}
                      onChange={(e) => setWorkTime(Number(e.target.value))}
                      className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Short Break</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={short_time}
                      onChange={(e) => setShortTime(Number(e.target.value))}
                      className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Long Break</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={long_time}
                      onChange={(e) => setLongTime(Number(e.target.value))}
                      className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Work Sessions</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={break_count}
                      onChange={(e) => setBreakCount(Number(e.target.value))}
                      className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-300">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(THEMES).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentTheme === key 
                          ? 'border-white scale-105' 
                          : 'border-transparent hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: theme.backgroundColor }}
                    >
                      <div 
                        className="w-full h-8 rounded"
                        style={{ backgroundColor: theme.timerColor }}
                      />
                      <span className="block mt-2 text-sm font-medium text-gray-800">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSettingsSave({
                  workTime: work_time,
                  shortTime: short_time,
                  longTime: long_time,
                  breakCount: break_count
                })}
                className="px-4 py-2 text-sm font-medium text-white bg-[#ffcd74] hover:bg-[#ffbc4d] rounded-md transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}