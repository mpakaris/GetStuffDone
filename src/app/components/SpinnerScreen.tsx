const SpinnerScreen = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-stone-200">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-7 border-teal-600"></div>
      <p className="text-center text-xl text-gray-700 font-bold mt-5">
        {message}
      </p>
    </div>
  );
};

export default SpinnerScreen;
