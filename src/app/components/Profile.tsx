import { useState } from "react";
import { FaRedo, FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteAccount } from "../services/database";

const Profile = ({
  userDTO,
  handleLogout,
  deleteAllEntries,
  userEntries,
}: {
  userDTO: any;
  handleLogout: any;
  deleteAllEntries: any;
  userEntries: any;
}) => {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const subscriptionPlan = userDTO.subscriptionPlan || "Free-Trial";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async (e: any) => {
    e.preventDefault();

    if (userDTO.email !== email) {
      toast("Something went wrong. Please try again later.");
      return;
    }

    try {
      await deleteAccount(email, password);
      toast("Account successfully deleted.");
    } catch (error) {
      toast("Account Deletion Failed. Please try again later.");
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {!isDeletingAccount && (
        <div className="flex justify-center items-center h-full bg-stone-200 p-3">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <div className="flex flex-col items-center mb-4">
              <FaUser className="text-6xl text-gray-700 mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">
                {userDTO.email}
              </h1>
              <p className="text-gray-600">Subscription: {subscriptionPlan}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleLogout}
                className="flex mb-5 items-center justify-center px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400 w-full"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
              <button
                disabled={userEntries.length === 0}
                onClick={deleteAllEntries}
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
              >
                <FaRedo className="mr-2" />
                Reset All Entries
              </button>
              <button
                // onClick={deleteUser}
                onClick={() => setIsDeletingAccount(true)}
                className="flex items-center justify-center px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 w-full"
              >
                <FaTrash className="mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeletingAccount && (
        <div className="flex h-full items-center justify-center bg-stone-200 px-3">
          <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl text-teal-800 mb-5 font-bold text-center">
              Get S**** Done!
            </h2>
            <h5 className="text-center font-bold text-base mb-3">
              We hate to see you leave.
            </h5>
            <p>
              Please provide your Email and Password to Delete the Account and
              all its Data for Good.
            </p>
            <form onSubmit={handleDeleteAccount}>
              <div className="mt-2">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                    required
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                    required
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <button
                    disabled={email === "" || password === ""}
                    type="submit"
                    className="px-6 py-2 mt-4 text-white bg-red-800 rounded-lg w-full"
                  >
                    DELETE MY ACCOUNT
                  </button>
                </div>
              </div>
            </form>
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-teal-800 rounded-lg w-full"
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsDeletingAccount(false);
              }}
            >
              CANCEL DELETION
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
