import { useState, ChangeEvent, KeyboardEvent } from "react";

type Props = {
  onChange?: (i: string) => void;
};
function SearchInput({ onChange }: Props): JSX.Element {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text: string = event.currentTarget.value;
    setValue(text);
    if (text.length === 0) {
      onChange && onChange(text);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    const text: string = event.currentTarget.value;
    if (event.key === "Enter") {
      onChange && onChange(text);
    }
  };

  return (
    <input
      className="px-4 py-1 rounded-xl text-base text-black outline-none placeholder:text-gray-500 focus:outline-yellow-500"
      type="text"
      placeholder="Search Pokemon"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default SearchInput;
