"use client";

export default function RegisterForm({
  onRegister,
  onSwitchScreen,
}: {
  onRegister: any;
  onSwitchScreen: any;
}) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    onRegister(email.value, password.value);
  };

  return (
    <div className="flex h-full items-center justify-center bg-stone-200">
      <div className="w-full mx-5 p-6 mt-4 text-left bg-white shadow-lg">
        <h2 className="text-3xl text-teal-800 mb-5 font-bold text-center">
          Get S**** Done!
        </h2>
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                required
              />
            </div>
            <div className="mt-1">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-400 w-full"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        <div className="mt-10 space-y-2">
          <p className="font-semibold text-center">
            You have already an Account?
          </p>
          <button
            className="px-6 py-2 text-white bg-black rounded-lg hover:bg-teal-400 w-full"
            onClick={onSwitchScreen}
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}
