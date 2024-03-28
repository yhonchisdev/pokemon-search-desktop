import { useState, ChangeEvent } from "react";

type Props = {
  label: string;
  flag: string;
  onChange?: (i: number) => void;
};
function SelectRange({ label, flag, onChange }: Props): JSX.Element {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const range: number = Number(event.currentTarget.value);
    setValue(range);
    onChange && onChange(range);
  };

  return (
    <div className="flex flex-col space-y-1">
      <h3 className="text-base text-black font-bold">{label}</h3>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-base text-black">0</span>
        <div className="flex flex-col items-center -space-y-0.5">
          <span className="text-base text-black">
            {value} {flag}
          </span>
          <input
            className="rounded-lg overflow-hidden appearance-none bg-gray-200 h-3 w-128"
            type="range"
            min={0}
            max={1000}
            value={value}
            onChange={handleChange}
          />
        </div>
        <span className="text-base text-black">1000</span>
      </div>
    </div>
  );
}

export default SelectRange;
