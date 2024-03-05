"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NotLoggedIn from "./components/NotLoggedIn";
import Profile from "./components/Profile";
import Record from "./components/Record";
import RegisterForm from "./components/RegisterForm";
import SpinnerScreen from "./components/SpinnerScreen";
import Statistics from "./components/Statistics";
import { auth } from "./firebase/firebaseConfig";
import {
  deleteAllUserEntries,
  deleteUserEntryByDate,
  getAllEntriesOfUser,
  saveDailyEntry,
} from "./services/database";
import { fetchOpenAIResponse } from "./services/openAI";

const Page = () => {
  // USER RELATED
  const [userDTO, setUserDTO] = useState<any>({});
  const [currentScreen, setCurrentScreen] = useState<string>("home");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // ENTRY RELATED
  const [userEntries, setUserEntries] = useState<any>([]);
  const [spinnerMessage, setSpinnerMessage] = useState<string>("");
  const [recording, setRecording] = useState<any>([]);
  const [dailyRecording, setDailyRecording] = useState<any>([]);
  const [structuredResults, setStructuredResults] = useState<any>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // There are 3 screens: "noEntry" | "transcript" | "aiResult"
  const [recordScreen, setRecordScreen] = useState<string>("noEntry");

  // Speech-to-Text RELATED
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    // Assign automatically Recording when Rec stopps
    if (!isRecording && results.length > 0) {
      setIsSaved(false);
      setRecordScreen("transcript");

      if (dailyRecording?.results?.length > 0) {
        setRecordScreen("transcript");
        setRecording([...dailyRecording.results, ...results]);
        return;
      }

      setRecording(results);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDTO(user);
        setIsAuthenticated(true);
        getUserEntries();
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isRecording]);

  const switchScreen = async (screen: string) => {
    if (
      (!isAuthenticated && screen === "calendar") ||
      (!isAuthenticated && screen === "statistics") ||
      (!isAuthenticated && screen === "profile")
    ) {
      setCurrentScreen("notLoggedIn");
      return;
    }

    await getUserEntries();
    setCurrentScreen(screen);
  };

  const getUserEntries = async () => {
    if (userDTO.uid) {
      const res = await getAllEntriesOfUser(userDTO.uid);
      setUserEntries(res);

      if (res) {
        const today = new Date().toISOString().split("T")[0];
        const todaysEntry = res.find((entry: any) => entry.id === today);

        if (todaysEntry) {
          setDailyRecording(todaysEntry);
          setStructuredResults(todaysEntry.structuredResults);

          if (isSaved) {
            setRecordScreen("aiResult");
          }
        }
      } else {
        setRecordScreen("noEntries");
      }
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentScreen("record");
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentScreen("home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUserDTO(user);
      setCurrentScreen("record");
    } catch (error: any) {
      console.error("Error registering the user:", error.message);
    }
  };

  const onMicClick = () => {
    if (currentScreen !== "record") {
      setCurrentScreen("record");
      return;
    }

    setStructuredResults([]);
    return isRecording ? stopSpeechToText() : startSpeechToText();
  };

  const setSpinner = (screen: string, msg: string) => {
    setCurrentScreen(screen);
    setSpinnerMessage(msg);
  };

  const sendToLLM = async () => {
    const combinedTranscript = recording
      .map((item: any) => item.transcript)
      .join(" ");

    try {
      setSpinner("spinner", "The AI is working...");
      const aiResponse = await fetchOpenAIResponse(combinedTranscript);
      const aiRes = JSON.parse(aiResponse.message.content);
      setStructuredResults(aiRes);
      setRecordScreen("aiResult");
      setSpinner("record", "");
    } catch (error: any) {
      console.error("Failed to fetch response from OpenAI:", error.message);
      toast("Uppps, something went wrong.");
      setSpinner("record", "");
    }
  };

  const saveEntryInDB = async () => {
    if (!isAuthenticated) {
      setCurrentScreen("notLoggedIn");
      return;
    }

    try {
      setSpinner("spinner", "Connecting to Database...");
      await saveDailyEntry(userDTO.uid, recording, structuredResults);

      // Reset all States
      setRecording([]);
      setDailyRecording([]);
      setStructuredResults([]);
      setUserEntries([]);
      setIsSaved(true);
      setRecordScreen("aiResult");

      // Load Entries
      await getUserEntries();
      setSpinner("record", "");
    } catch (error: any) {
      console.error("Failed to save Object in DB: ", error.message);
      toast("Uppps, something went wrong.");
      setSpinner("record", "");
    }
  };

  const deleteUserEntry = async (date: string) => {
    try {
      const res = await deleteUserEntryByDate(userDTO.uid, date);
      await getUserEntries();
      toast("Entry deleted Successfully!");
    } catch (error) {
      toast("Something went wrong! Please try again later.");
      console.error("Entry was not deleted.");
    }
  };

  const deleteAllEntries = async () => {
    try {
      const res = await deleteAllUserEntries(userDTO.uid);
      toast("All Entries Successfully Deleted from DB");
    } catch (error) {
      toast("Sorry, something went wrong. Please try again later.");
    }
  };

  const renderContent = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchScreen={() => switchScreen("register")}
          />
        );
      case "register":
        return (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchScreen={() => switchScreen("login")}
          />
        );
      case "record":
        return (
          <Record
            sendToLLM={sendToLLM}
            saveEntryInDB={saveEntryInDB}
            isRecording={isRecording}
            recording={recording}
            aiResults={structuredResults}
            isSaved={isSaved}
            screen={recordScreen}
            isAuthenticated={isAuthenticated}
          />
        );
      case "calendar":
        return (
          <Calendar entries={userEntries} deleteUserEntry={deleteUserEntry} />
        );
      case "statistics":
        return <Statistics userEntries={userEntries} />;
      case "home":
        return (
          <Home userEntries={userEntries} isAuthenticated={isAuthenticated} />
        );
      case "profile":
        return (
          <Profile
            userDTO={userDTO}
            handleLogout={handleLogout}
            deleteAllEntries={deleteAllEntries}
            userEntries={userEntries}
          />
        );
      case "spinner":
        return <SpinnerScreen message={spinnerMessage} />;
      case "notLoggedIn":
        return <NotLoggedIn switchScreen={switchScreen} />;
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto">{renderContent()}</main>
      <Footer
        onMicClick={onMicClick}
        isRecording={isRecording}
        switchScreen={switchScreen}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Page;
