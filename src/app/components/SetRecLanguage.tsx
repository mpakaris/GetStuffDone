const SetRecLanguage = ({
  handleLanguageChange,
  language,
}: {
  handleLanguageChange: any;
  language: string;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-start h-full bg-white">
        <p className="text-sm font-semibold text-gray-600 mb-2">
          Set Recording language:
        </p>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="mb-4 px-4 py-2 border rounded-lg w-2/3 text-sm"
        >
          <option value="en-US">English - US</option>
          <option value="de-DE">German - DE</option>
          <option value="hu-HU">Hungarian - HU</option>
        </select>
      </div>
    </>
  );
};

export default SetRecLanguage;
