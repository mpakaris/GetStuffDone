"use client";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import MyTest from "./components/MyTest";
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
  fetchUserSettings,
  getAllEntriesOfUser,
  saveDailyEntry,
  updateUserSettings,
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
  const [dailyRecording, setDailyRecording] = useState<any>([]);
  const [structuredResults, setStructuredResults] = useState<any>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // There are 3 screens: "noEntry" | "transcript" | "aiResult"
  const [recordScreen, setRecordScreen] = useState<string>("noEntry");

  // NEW RECORDIER - WEB SPEECH API
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [language, setLanguage] = useState<string>("us-US");
  const [subscription, setSubscription] = useState<string>("free");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Speech Recognition setup
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.lang = language;

    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(
        (prevTranscript) => prevTranscript + " " + currentTranscript
      );
      setIsSaved(false);
      setRecordScreen("transcript");
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    setRecognition(recognitionInstance);

    // Firebase Auth setup
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserDTO(user);
        setIsAuthenticated(true);
        await getUserEntries();
        await getUserSettings();
      } else {
        setIsAuthenticated(false);
      }
    });

    // Combined cleanup function
    return () => {
      recognitionInstance.stop();
      unsubscribe();
    };
  }, [language, isAuthenticated]); // Ensure dependencies are correct

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
          setTranscript(todaysEntry.results);

          if (isSaved) {
            setRecordScreen("aiResult");
          }
        }
      } else {
        setRecordScreen("noEntries");
      }
    }
  };

  const getUserSettings = async () => {
    if (userDTO && userDTO.uid) {
      const res = await fetchUserSettings(userDTO.uid);
      if (res) {
        setLanguage(res.language);
        setSubscription(res.subscription);
      }
    } else {
      console.log("User DTO is undefined or does not have a uid");
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

    setRecordScreen("");
    setStructuredResults([]);
    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Function to handle language change
  const handleLanguageChange = async (event: any) => {
    const newLanguage = event.target.value;
    if (isListening && recognition) {
      recognition.stop();
    }

    try {
      await updateUserSettings(userDTO.uid, newLanguage);
      // After awaiting the update, you set the new language
      setLanguage(newLanguage);
      setTranscript("");
      setIsListening(false); // This should trigger a re-render as well
      toast("Language successfully updated!");
      console.log(`Language set to ${newLanguage}`); // Debugging log
    } catch (error: any) {
      console.error("Error when changing language: ", error.message);
    }
  };

  const setSpinner = (screen: string, msg: string) => {
    setCurrentScreen(screen);
    setSpinnerMessage(msg);
  };

  const sendToLLM = async () => {
    try {
      setSpinner("spinner", "The AI is working...");
      const aiResponse = await fetchOpenAIResponse(transcript);
      const aiRes = JSON.parse(aiResponse.message.content);
      setStructuredResults(aiRes);
      setRecordScreen("aiResult");
      setSpinner("record", "");
    } catch (error: any) {
      console.error("Failed to fetch response from OpenAI:", error.message);
      toast("Uppps, the AI had an issue. Please try again.");
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
      await saveDailyEntry(userDTO.uid, transcript, structuredResults);

      // Reset all States
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

  const handleDelete = async () => {
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(false);
    }

    await getUserEntries();
    setTranscript("");
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
            isListening={isListening}
            transcript={transcript}
            aiResults={structuredResults}
            isSaved={isSaved}
            screen={recordScreen}
            isAuthenticated={isAuthenticated}
            handleDelete={handleDelete}
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
            handleLanguageChange={handleLanguageChange}
            language={language}
            subscription={subscription}
          />
        );
      case "spinner":
        return <SpinnerScreen message={spinnerMessage} />;
      case "notLoggedIn":
        return <NotLoggedIn switchScreen={switchScreen} />;
      case "myTest":
        return <MyTest />;
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex-grow overflow-auto">{renderContent()}</main>
      <Footer
        onMicClick={onMicClick}
        isRecording={isListening}
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
