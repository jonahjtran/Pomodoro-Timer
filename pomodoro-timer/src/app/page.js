"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Focus from "./Focus";
import PlannerSidebar from "./Planner"

const THEMES = {
  tan: {
    name: "Tan",
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

const BACKGROUNDS = {
  altgeld: {
    name: "Altgeld Hall",
    type: "image",
    value: "https://las.illinois.edu/sites/default/files/2021-11/4479_BAILEY%20EDWARD_Altgeld_Library%20II_E_Exterior_210629.jpg"
  },
  quad: {
    name: "Main Quad",
    type: "image",
    value: "https://fightingillini.com/images/2015/11/10/illinois_campus_quad.jpg"
  },
  library: {
    name: "Main Library",
    type: "image",
    value: "https://live.staticflickr.com/1167/537413237_13cf0e1b9d_b.jpg"
  },
  krannert: {
    name: "Krannert Center",
    type: "image",
    value: "https://web.faa.illinois.edu/app/uploads/sites/6/2021/06/145714-500x0-c-default.jpg"
  },
  union: {
    name: "Illini Union",
    type: "image",
    value: "https://newstudent.illinois.edu/sites/default/files/paragraphs/feature-grouped/illini%20union.jpg"
  },
  memorial_stadium: {
    name: "Memorial Stadium",
    type: "image",
    value: "https://fightingillini.com/images/2020/8/22/ATH1920_Facilities_MemorialStadium_01.jpg"
  },
  state_farm: {
    name: "State Farm Center",
    type: "image",
    value: "https://fightingillini.com/images/2020/8/22/ATH1920_Facilities_0007s_0001_statefarmcenter.jpg"
  },
};

const MUSIC = {
  ocean: {
    name: "Ocean",
    type: "audio",
    value: "/music/ocean.mp3"
  },
  rain: {
    name: "Rain",
    type: "audio",
    value: "/music/rain.mp3"
  },
  forest: {
    name: "Forest",
    type: "audio",
    value: "/music/forest.mp3"
  },
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
  const [showTimeSettings, setShowTimeSettings] = useState(true);
  const [showBackgroundSettings, setShowBackgroundSettings] = useState(true);
  const [showMusicSettings, setShowMusicSettings] = useState(true);

  const [currentTheme, setCurrentTheme] = useState("tan");
  const [currentBackground, setCurrentBackground] = useState("altgeld");
  const [settingsBackground, setSettingsBackground] = useState("altgeld");

  const [backgroundColor, setBackgroundColor] = useState(THEMES.tan.backgroundColor);
  const [timerColor, setTimerColor] = useState(THEMES.tan.timerColor);
  const [hoverColor, setHoverColor] = useState(THEMES.tan.hoverColor);

  const [settings_break_count, setSettingsBreakCount] = useState(break_count);
  const [settings_long_time, setSettingsLongTime] = useState(long_time);
  const [settings_short_time, setSettingsShortTime] = useState(short_time);
  const [settings_work_time, setSettingsWorkTime] = useState(work_time);

  const [musicEnabled, setMusicEnabled] = useState(false);
  const [settingsMusicType, setSettingsMusicType] = useState("ocean");
  const [musicType, setMusicType] = useState("ocean");

  const [audioElement, setAudioElement] = useState(null);

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

  useEffect(() => {
    if (audioElement) {
      if (musicEnabled) {
        console.log("Attempting to play audio:", MUSIC[musicType].value);
        audioElement.play().catch(error => {
          console.error("Audio playback failed:", error);
          console.error("Audio element state:", {
            src: audioElement.src,
            readyState: audioElement.readyState,
            error: audioElement.error
          });
          setMusicEnabled(false);
        });
      } else {
        audioElement.pause();
      }
    }
  }, [musicEnabled, audioElement]);

  useEffect(() => {
    if (audioElement) {
      console.log("Loading new audio source:", MUSIC[musicType].value);
      audioElement.src = MUSIC[musicType].value;
      audioElement.load();
      
      // Add event listeners for debugging
      audioElement.addEventListener('error', (e) => {
        console.error("Audio error:", e);
      });
      
      audioElement.addEventListener('loadeddata', () => {
        console.log("Audio loaded successfully");
      });

      if (musicEnabled) {
        audioElement.play().catch(error => {
          console.error("Audio playback failed:", error);
          console.error("Audio element state:", {
            src: audioElement.src,
            readyState: audioElement.readyState,
            error: audioElement.error
          });
          setMusicEnabled(false);
        });
      }
    }
  }, [musicType, audioElement]);

  // Update settings values when modal opens
  useEffect(() => {
    if (showSettings) {
      setSettingsWorkTime(work_time);
      setSettingsShortTime(short_time);
      setSettingsLongTime(long_time);
      setSettingsBreakCount(break_count);
      setSettingsBackground(currentBackground);
      setSettingsMusicType(musicType);
    }
  }, [showSettings]);

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

  // Handle mode change buttons
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

  // handle background theme change in settings
  const handleThemeChange = (themeName) => {
    const theme = THEMES[themeName];
    setCurrentTheme(themeName);
    setBackgroundColor(theme.backgroundColor);
    setTimerColor(theme.timerColor);
    setHoverColor(theme.hoverColor);
    setSettingsBackground(themeName); // Update background selection when theme changes
  };

  // handle time change in settings
  const handleTimeChange = (value, setter) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const handleBackgroundChange = (bgKey) => {
    setSettingsBackground(bgKey);
  };

  // Main Display
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center transition-all duration-500" 
      style={{ 
        backgroundColor: THEMES[currentBackground] ? THEMES[currentBackground].backgroundColor : "transparent",
        backgroundImage: BACKGROUNDS[currentBackground]?.type === "image" ? `url(${BACKGROUNDS[currentBackground].value})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw"
      }}
    >
            
      <PlannerSidebar />
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className={`px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 transition-all ${
            musicEnabled 
              ? 'bg-emerald-500/80 hover:bg-emerald-500' 
              : 'bg-gray-500/80 hover:bg-gray-500'
          }`}
        >
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={musicEnabled 
                  ? "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" 
                  : "M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                } 
              />
            </svg>
            <span className="text-white font-medium">
              {musicEnabled ? "Music On" : "Music Off"}
            </span>
          </div>
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <div className="relative">
          <Focus />
        </div>
      </div>
      <audio 
        ref={setAudioElement}
        src={MUSIC[musicType].value}
        loop
        className="hidden"
      />
      <div 
        className="rounded-2xl shadow-2xl p-10 w-[450px] h-[550px] text-center flex flex-col backdrop-blur-md mx-4 border border-white/10" 
        style={{ 
          backgroundColor: THEMES[currentBackground] 
            ? `${THEMES[currentBackground].timerColor}CC` 
            : 'rgba(0, 0, 0, 0.7)'
        }}
      >

        <div className="flex justify-between items-center mb-10">
          <div className="flex space-x-8">
            <span 
              className={`cursor-pointer text-base font-semibold transition-colors ${mode === "work" ? "text-white" : "text-white/60 hover:text-white"}`}
              onClick={() => handleModeClick("work")}
            >
              Work
            </span>
            <span 
              className={`cursor-pointer text-base font-semibold transition-colors ${mode === "short break" ? "text-white" : "text-white/60 hover:text-white"}`}
              onClick={() => handleModeClick("short break")}
            >
              Short Break
            </span>
            <span 
              className={`cursor-pointer text-base font-semibold transition-colors ${mode === "long break" ? "text-white" : "text-white/60 hover:text-white"}`}
              onClick={() => handleModeClick("long break")}
            >
              Long Break
            </span>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-white font-bold text-9xl tracking-tighter">{displayTime}</h1>
        </div>
        <div className="mb-10">
          <h1 className="text-white font-semibold text-2xl tracking-wide">
            {mode === "short break" || mode === "long break" ? "Time to relax!" : "Time to work!"}
          </h1>
        </div>
        <div className="flex space-x-6 justify-center">
          <button 
            className={`hover:bg-white/10 transition-all items-center text-center flex justify-center h-16 w-44 text-lg rounded-xl p-4 text-white font-semibold border border-white/20`} 
            style={{ 
              backgroundColor: THEMES[currentBackground] 
                ? `${THEMES[currentBackground].timerColor}99` 
                : 'rgba(0, 0, 0, 0.5)'
            }}
            onClick={resetTimer}
          >
            Reset
          </button>
          <button 
            className={`hover:bg-white/10 transition-all items-center text-center flex justify-center h-16 w-44 text-lg rounded-xl p-4 text-white font-semibold border border-white/20`} 
            style={{ 
              backgroundColor: THEMES[currentBackground] 
                ? `${THEMES[currentBackground].timerColor}99` 
                : 'rgba(0, 0, 0, 0.5)'
            }}
            onClick={toggleTimer}
          >
            {running ? "Pause" : "Start"}
          </button>
        </div>
      </div>

      {/* Settings Display */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-[#1e1e1e] rounded-lg w-[480px] text-white shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-8 pb-4">
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
            
            <div className="overflow-y-auto px-8 pb-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-300">Time (minutes)</h3>
                    <button 
                      onClick={() => setShowTimeSettings(!showTimeSettings)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transform transition-transform ${showTimeSettings ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {showTimeSettings && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Work</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min="5"
                          max="60"
                          value={settings_work_time}
                          onChange={(e) => handleTimeChange(e.target.value, setSettingsWorkTime)}
                          className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Short Break</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min="1"
                          max="30"
                          value={settings_short_time}
                          onChange={(e) => handleTimeChange(e.target.value, setSettingsShortTime)}
                          className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Long Break</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min="1"
                          max="60"
                          value={settings_long_time}
                          onChange={(e) => handleTimeChange(e.target.value, setSettingsLongTime)}
                          className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Work Sessions</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min="1"
                          max="10"
                          value={settings_break_count}
                          onChange={(e) => handleTimeChange(e.target.value, setSettingsBreakCount)}
                          className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#ffcd74] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-300">Background</h3>
                    <button 
                      onClick={() => setShowBackgroundSettings(!showBackgroundSettings)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transform transition-transform ${showBackgroundSettings ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {showBackgroundSettings && (
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(THEMES).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => handleBackgroundChange(key)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            settingsBackground === key 
                              ? 'border-white scale-105' 
                              : 'border-transparent hover:border-gray-500'
                          }`}
                          style={{ 
                            backgroundColor: theme.backgroundColor,
                            height: "100px"
                          }}
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
                      {Object.entries(BACKGROUNDS).map(([key, bg]) => (
                        <button
                          key={key}
                          onClick={() => handleBackgroundChange(key)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            settingsBackground === key 
                              ? 'border-white scale-105' 
                              : 'border-transparent hover:border-gray-500'
                          }`}
                          style={{ 
                            backgroundColor: "transparent",
                            backgroundImage: `url(${bg.value})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100px"
                          }}
                        >
                          <span className="block mt-2 text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">
                            {bg.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-300">Background Music</h3>
                  <button 
                    onClick={() => setShowMusicSettings(!showMusicSettings)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transform transition-transform ${showMusicSettings ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {showMusicSettings && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(MUSIC).map(([key, music]) => (
                      <button
                        key={key}
                        onClick={() => setSettingsMusicType(key)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          settingsMusicType === key 
                            ? 'border-[#ffcd74] scale-105' 
                            : 'border-transparent hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                          <span className="text-sm font-medium text-gray-300">{music.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Apply settings to actual timer values with validation
                    const newWorkTime = settings_work_time === '' ? 25 : 
                      Math.min(60, Math.max(5, Number(settings_work_time)));
                    const newShortTime = settings_short_time === '' ? 5 : 
                      Math.min(30, Math.max(1, Number(settings_short_time)));
                    const newLongTime = settings_long_time === '' ? 10 : 
                      Math.min(60, Math.max(1, Number(settings_long_time)));
                    const newBreakCount = settings_break_count === '' ? 4 : 
                      Math.min(10, Math.max(1, Number(settings_break_count)));

                    setWorkTime(newWorkTime);
                    setShortTime(newShortTime);
                    setLongTime(newLongTime);
                    setBreakCount(newBreakCount);
                    setMusicType(settingsMusicType);
                    // Update background and theme colors when saving
                    setCurrentBackground(settingsBackground);
                    if (THEMES[settingsBackground]) {
                      const theme = THEMES[settingsBackground];
                      setBackgroundColor(theme.backgroundColor);
                      setTimerColor(theme.timerColor);
                      setHoverColor(theme.hoverColor);
                      setCurrentTheme(settingsBackground);
                    }

                    // Update current timer display based on current mode
                    if (mode === "work") {
                      setMinutes(newWorkTime);
                    } else if (mode === "short break") {
                      setMinutes(newShortTime);
                    } else {
                      setMinutes(newLongTime);
                    }
                    setSeconds(0);
                    
                    setShowSettings(false);
                    setRunning(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#ffcd74] hover:bg-[#ffbc4d] rounded-md transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}