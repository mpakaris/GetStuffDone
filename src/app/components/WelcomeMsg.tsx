const WelcomeMsg = () => {
  return (
    <div className="bg-white bg-opacity-60 border-gray-600 p-2 rounded-lg shadow-2xl max-w-sm mx-auto overflow-y-auto mt-4 mb-10 max-h-[65vh]">
      <div className="card-body">
        <div className="text-sm p-4 max-w-4xl mx-auto text-gray-700">
          <h1 className="font-semibold mb-4 text-xl">
            <span className="text-gray-700">Get S**** Done!</span>
          </h1>
          <p className="font-bold text-center text-base text-teal-600">
            Stop Starring at ToDos and <br />
            Start Tracking Accomplishments.
          </p>
          <br />
          <p className="mb-2">
            Create each day an Entry and share your achievements. <br />
            <br />
            We recommend to record the entry in the evening, when you wrap up
            your day, or feel free to keep adding small recordings that concat
            to one total entry.
          </p>
          <p className="mb-2">
            Speak about <strong>what</strong> you did, <strong>why</strong> you
            did it, and <strong>how long</strong> it took approximately.
          </p>
          <p className="text-sm">
            <strong>Example:</strong> <br />
            <em>
              I went to the supermarket in the morning for grocery shopping. It
              took me approximately 1 hour and I enjoyed choosing fresh
              vegetables for my family.
            </em>
          </p>
          <br />
          <p className="mb-2">
            After recording, you will see a transcript of your entry.
          </p>
          <br />
          <ul className="list-none list-inside mb-2">
            <li>
              <strong>ADD</strong> more details with the Mic-Button.
            </li>
            <br />
            <li>
              <strong>DELETE</strong> your entry.
            </li>
            <br />
            <li>
              <strong>SUBMIT</strong> your entry.
            </li>
          </ul>
          <br />
          <p className="mb-2">
            You can <strong>always delete</strong> your entries and we{" "}
            <strong>never save</strong> your voice. <br />
            <br />
            Do not share personal information such as:
          </p>
          <ul className="list-none list-inside mb-2">
            <li>
              <strong>Name</strong>
            </li>
            <li>
              <strong>Address</strong>
            </li>
            <li>
              <strong>Phone or Account Numbers</strong>
            </li>
            <li>or similar</li>
          </ul>
          <p className="mb-2">
            Your data is safely stored in Europe under the{" "}
            <strong>GDPR Guidelines</strong>.
          </p>
          <br />
          <h5 className="font-bold mb-4 text-base text-end">
            <span className="text-teal-600">Let's Get S*** Done!</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMsg;
