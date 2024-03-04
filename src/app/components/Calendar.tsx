import { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

export default function MyCalendar({
  entries,
  deleteUserEntry,
}: {
  entries: any;
  deleteUserEntry: any;
}) {
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState(null);

  // Whenever the entries prop changes, update the state
  useEffect(() => {
    setValues(entries.map((entry: any) => new Date(entry.id)));
  }, [entries]);

  // Convert entries to comparable format
  const formattedEntries = entries.map(
    (entry: any) => new Date(entry.id).toISOString().split("T")[0]
  );

  type DateEntry = {
    id: string;
  };

  const handleDateChange = (selectedDates: Date[]) => {
    const selectedDatesFormatted = selectedDates.map(
      (date) => date.toISOString().split("T")[0]
    );

    const valuesFormatted = values.map(
      (date) => date.toISOString().split("T")[0]
    );

    let newSelected: string | null = null;
    for (let date of selectedDatesFormatted) {
      if (!valuesFormatted.includes(date)) {
        newSelected = date;
        break;
      }
    }

    if (newSelected) {
      console.log("Date selected: " + newSelected);
    } else {
      let deselectedDate: string | null = null;
      for (let date of valuesFormatted) {
        if (!selectedDatesFormatted.includes(date)) {
          deselectedDate = date;
          break;
        }
      }

      if (deselectedDate) {
        const deselectedDateObj = new Date(deselectedDate + "T00:00:00"); // Assuming deselectedDate is in 'YYYY-MM-DD' format
        setValues((prevValues) => [...prevValues, deselectedDateObj]);

        const selectedEntry = entries.find(
          (entry: any) => entry.id === deselectedDate
        );
        setSelected(selectedEntry);
      }
    }
  };

  const mapDays = ({ date }: { date: any }) => {
    const dateString = date.format("YYYY-MM-DD");
    if (!formattedEntries.includes(dateString)) {
      return {
        disabled: true, // Disable days that are not in the entries array
        style: { color: "#ccc" }, // Optional: style for disabled days
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 mb-2 w-2/3 max-w-md">
        <p className="text-gray-800 text-base font-semibold">Your Entries:</p>
      </div>
      <Calendar
        value={values}
        onChange={handleDateChange}
        multiple
        mapDays={mapDays}
        className="rmdp-mobile shadow-lg mb-4"
        shadow={true}
      />
      {selected && (
        <div className="bg-white shadow-lg rounded-lg p-4 w-2/3 max-w-md">
          <p className="text-lg text-teal-600 font-bold">{selected.id}</p>
          <p className="text-base text-gray-700 mb-3 font-semibold">
            Awesome Work!
          </p>
          <p>
            You had{" "}
            <strong>
              {selected.structuredResults
                ? selected.structuredResults.length
                : 0}
            </strong>{" "}
            Accomplishments!
          </p>
          <ul className="list-decimal list-inside mb-2 text-sm font-semibold mt-4">
            {selected.structuredResults &&
              selected.structuredResults.map((result: any, index: number) => (
                <li key={index}>{result.activity}</li> // Add a key for each list item
              ))}
          </ul>
          <div className="card-footer flex justify-between space-x-4 mt-4">
            <button
              onClick={() => {
                deleteUserEntry(selected.id);
                setSelected(null);
              }}
              className="px-6 py-2 mt-5 text-sm text-white bg-red-800 rounded-lg hover:bg-red-700 mx-auto"
            >
              Delete Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
