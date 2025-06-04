'use client';

import { useState, useEffect } from 'react';

const Focus = () => {
    const [hasTabSwitched, setHasTabSwitched] = useState(false);
    const [focusModeEnabled, setFocusModeEnabled] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (focusModeEnabled && document.hidden) {
                setHasTabSwitched(true);
                alert("Warning: Please don't switch tabs during focus mode!");
            }
        };

        if (focusModeEnabled) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [focusModeEnabled]);

    const toggleFocusMode = (e) => {
        const isEnabled = !focusModeEnabled;
        
        if (isEnabled) {
            setFocusModeEnabled(true);
            setHasTabSwitched(false);
            alert("Focus mode enabled. Please stay on this tab.");
        } else {
            setFocusModeEnabled(false);
        }
    };

    return (
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 w-64">
            <button 
                onClick={toggleFocusMode}
                className={`transition-all items-center text-center flex justify-center h-12 px-6 text-base rounded-xl text-white font-semibold border backdrop-blur-md ${
                    focusModeEnabled 
                        ? 'bg-emerald-500/90 hover:bg-emerald-600/90 border-emerald-400/50' 
                        : 'bg-gray-500/50 hover:bg-gray-600/50 border-gray-400/30'
                }`}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 mr-2 transition-transform duration-300 ${focusModeEnabled ? 'scale-110' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={focusModeEnabled 
                            ? "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
                            : "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        }
                    />
                </svg>
                <span className="flex items-center">
                    {focusModeEnabled ? (
                        <>
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            Focus Mode Active
                        </>
                    ) : (
                        'Focus Mode'
                    )}
                </span>
            </button>
            {hasTabSwitched && (
                <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md">
                    You switched tabs during focus mode!
                </div>
            )}
        </div>
    );
};

export default Focus;
