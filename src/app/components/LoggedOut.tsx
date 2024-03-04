const LoggedOut = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full bg-stone-200 px-5">
        <div className="bg-white shadow-lg rounded-lg py-4 px-5 w-full max-w-md">
          <h5 className="text-lg font-bold text-gray-800 mb-4">Sorry</h5>
          <p className="text-sm font-semibold mb-10">
            We are sad to see you leave. <br />
            Please Register and/or Login to continue!
          </p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => switchScreen("login")}
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-400 w-full"
            >
              Login
            </button>
            <button
              onClick={() => switchScreen("register")}
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-black rounded-lg w-full"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotLoggedIn;
