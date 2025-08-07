import React from "react";

const StartScreen = ({ onStart }) => {
  const handleStart = () => {
    const sound = new Audio("/audios/audio.mp3"); // use public folder
    sound.play()
      .then(() => {
        onStart(); // continue to app
      })
      .catch((err) => {
        console.warn("Sound blocked, continuing anyway",err);
        onStart(); // continue even if sound fails
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white text-xl">
      <button
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white font-semibold text-2xl transition"
      >
        Click to Start
      </button>
      <p className="mt-4 text-sm opacity-50">Sound will play after clicking</p>
    </div>
  );
};

export default StartScreen;
