"use client";
import React, { useEffect, useState } from "react";

export default function SummarizeLoader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getLoadingText = () => {
    if (counter <= 3) {
      return (
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent animate-pulse">
          🎧 Vibing with the Audio...
        </p>
      );
    } else if (counter <= 8) {
      return (
        <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
          ✍️ Spitting Fire Summaries...
        </p>
      );
    } else if (counter <= 14) {
      return (
        <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent animate-pulse">
           Adding That Final Drip...
        </p>
      );
    } else {
      return (
        <p className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent animate-pulse">
          🚀 Wrapping Up the Magic...
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="animate-spin w-12 h-12 border-t-4 border-b-4 border-blue-400 border-solid rounded-full shadow-md"></div>
      {getLoadingText()}
      <p className="text-sm text-gray-500 animate-fade-in mt-2">
        Hang tight, it&apos;s worth the wait 🤙
      </p>
    </div>
  );
}
