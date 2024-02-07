"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaComment,
  FaHeart,
  FaInfoCircle,
  FaSearch,
  FaShare,
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import { positions } from "./positions";

const VideoScreen = () => {
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(
    positions[currentPositionIndex]
  );
  const [progress, setProgress] = useState(0);
  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    setCurrentPosition(positions[currentPositionIndex]);
  }, [currentPositionIndex]);

  const getCurrentVideoPath = () => currentPosition.videos[currentVideoIndex];

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleInfoModal = () => {
    togglePlayPause();
    setInfoModal(!infoModal);
  };

  const handlers = useSwipeable({
    onSwipedUp: (event) => {
      event.event.preventDefault();
      if (infoModal) return;
      setCurrentVideoIndex(0);

      if (currentPositionIndex === positions.length - 1) {
        setCurrentPositionIndex(0);
        return;
      }
      setCurrentPositionIndex(currentPositionIndex + 1);
    },

    onSwipedDown: (event) => {
      event.event.preventDefault();
      if (infoModal) return;
      setCurrentVideoIndex(0);

      if (currentPositionIndex === 0) {
        setCurrentPositionIndex(positions.length - 1);
        return;
      }
      setCurrentPositionIndex(currentPositionIndex - 1);
    },

    onSwipedLeft: (event) => {
      event.event.preventDefault();
      if (infoModal) return;

      if (currentVideoIndex === currentPosition.videos.length - 1) {
        setCurrentVideoIndex(0);
        return;
      }

      setCurrentVideoIndex(currentVideoIndex + 1);
    },

    onSwipedRight: (event) => {
      event.event.preventDefault();
      if (infoModal) return;

      if (currentVideoIndex === 0) {
        setCurrentVideoIndex(currentPosition.videos.length - 1);
        return;
      }

      setCurrentVideoIndex(currentVideoIndex - 1);
    },
    trackMouse: true,
  });

  return (
    <>
      <div {...handlers} className="w-full h-screen relative">
        {/* Progressbar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-pink-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation bar */}
        <div className="absolute z-40 top-3 left-0 right-0 flex justify-between items-center p-4">
          <button onClick={() => alert("You are Fired!")}>
            <FaArrowLeft className="text-white text-2xl cursor-pointer" />
          </button>
          <FaSearch className="text-white text-2xl cursor-pointer" />
        </div>

        {/* Video Player*/}
        <video
          key={getCurrentVideoPath()}
          ref={videoRef}
          className="w-full h-full object-cover"
          src={getCurrentVideoPath()}
          onTimeUpdate={handleTimeUpdate}
          autoPlay={true}
          loop={true}
          onClick={togglePlayPause}
          onEnded={() => {}}
        >
          Your browser does not support the video tag.
        </video>

        {/* Info Modal */}
        {infoModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <div className="bg-gray-300/30 rounded-lg w-full max-w-md p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-white font-semibold">
                  {currentPosition.position}
                </h2>
                <button
                  onClick={toggleInfoModal}
                  className="text-white hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-auto text-white0">
                <p className="mb-4">{currentPosition.description}</p>
              </div>
              <button
                onClick={toggleInfoModal}
                className="bg-pink-500 hover:bg-black text-white font-bold py-2 px-4 rounded ml-auto"
              >
                Apply for Position
              </button>
            </div>
          </div>
        )}

        {/* Icons Container */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-10 p-4">
          <FaHeart className="text-white text-3xl cursor-pointer hover:text-red-500" />
          <FaComment className="text-white text-3xl cursor-pointer hover:text-blue-500" />
          <FaShare className="text-white text-3xl cursor-pointer hover:text-green-500" />
          <FaInfoCircle
            className="text-white text-3xl cursor-pointer hover:text-green-500"
            onClick={toggleInfoModal}
          />
        </div>

        {/* Footer Screen */}
        <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 text-white">
          <p className="text-xl mb-2">{currentPosition.position}</p>
          <p className="mb-2">@{currentPosition.company}</p>
          {currentPosition.hashtags && (
            <p className="mb-5 text-pink-300 font-bold">
              {currentPosition.hashtags.join(" ")}
            </p>
          )}
          <button
            onClick={toggleInfoModal}
            className="bg-pink-500 hover:bg-black text-white font-bold py-2 px-4 rounded ml-auto"
          >
            APPLY
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoScreen;
