"use client";

const Record = ({
  isListening,
  transcript,
  sendToLLM,
  aiResults,
  saveEntryInDB,
  isSaved,
  screen,
  isAuthenticated,
  handleDelete,
}: {
  isListening: boolean;
  transcript: any;
  sendToLLM: any;
  aiResults: any;
  saveEntryInDB: any;
  isSaved: boolean;
  screen: string;
  isAuthenticated: boolean;
  handleDelete: any;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-stone-200 px-5">
      {screen === "transcript" && (
        <div className="bg-white shadow-lg rounded-lg py-4 px-5 w-full max-w-md">
          <h5 className="text-lg font-bold text-gray-800 mb-4">
            Your Transcript:{" "}
          </h5>
          <p className="text-sm font-semibold mb-10">{transcript}</p>
          <div className="card-footer flex justify-between space-x-4 mb-5">
            <button
              onClick={handleDelete}
              className="rounded-lg py-2 px-4 bg-red-800 text-white"
            >
              DELETE ALL
            </button>
            <button
              onClick={sendToLLM}
              className="rounded-lg py-2 px-4 bg-teal-800 text-white
            "
            >
              SEND TO AI
            </button>
          </div>
          <p className="text-sm font-semibold  text-gray-600 mb-5">
            <strong>Why use AI?</strong> <br />
            We will use AI to structure your transcript into achievements.
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>Did you know?</strong> <br />
            You may continue recording by pressing the Mic button again!
          </p>
        </div>
      )}

      {screen === "aiResult" && (
        <div className="bg-white shadow-lg rounded-lg px-4 pt-6 pb-4 w-full max-w-md">
          <h5 className="text-xl text-teal-600 font-semibold my-3">
            Your Achievements Today:
          </h5>
          <ul className="list-decimal list-inside mb-2">
            {aiResults &&
              aiResults.map((entry: any, index: any) => (
                <li key={index} className="text-gray-600 text-base">
                  <strong>{entry.activity}</strong> | {entry.duration || 30}{" "}
                  min.
                </li>
              ))}
          </ul>
          {!isListening && aiResults.length === 0 && (
            <p className="text-red-800 font-semibold text-base mt-5">
              <strong>Attention:</strong> <br />
              It seems, that AI could not analyse your transcript.
            </p>
          )}
          {!isSaved && isAuthenticated && aiResults.length > 0 && (
            <div className="card-footer flex justify-between space-x-4 my-5">
              <button
                onClick={handleDelete}
                className="rounded-lg py-2 px-4 bg-red-800 text-white"
              >
                DELETE
              </button>
              <button
                onClick={saveEntryInDB}
                className="rounded-lg py-2 px-4 bg-teal-800 text-white
            "
              >
                SAVE
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <p className="text-base font-semibold text-teal-600 my-5">
              It seems that you are not logged in. <br />
              You cant save the entry if you are not logged in. <br />
              Go to 'Profile' to LogIn or Register.
            </p>
          )}
          <p className="text-sm font-semibold  text-gray-600 mt-5">
            <strong>Did you know?</strong> <br />
            You may continue recording by pressing the Mic button again!
          </p>
        </div>
      )}

      {screen === "noEntry" && (
        <div className="bg-white shadow-lg rounded-lg px-4 pt-6 pb-4 w-full max-w-md">
          <h5 className="text-lg font-bold text-teal-800 mb-4 text-center">
            Make a Recording for Today{" "}
          </h5>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>Did you know?</strong> <br />
            <br />
            You may start recording by pressing the Mic button! <br />
            <br />
            Just talk naturally about your day and your achievements.
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <br />
            <strong>What</strong> did you do today?
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>How</strong> long did it take?
          </p>
          <p className="text-sm font-semibold  text-gray-600">
            <strong>How</strong> did it affect you?
          </p>
        </div>
      )}

      {/* Recording Animation when Microphone is On */}
      {isListening && (
        <div className="p-20 relative">
          <p className="text-center font-bold text-3xl text-red-800 animate-bounce mb-3">
            REC
          </p>
        </div>
      )}
    </div>
  );
};

export default Record;
