import { useState, ChangeEvent } from "react";

type Props = {
  count: number;
  onChange?: (i: number) => void;
};
function Select({ count, onChange }: Props): JSX.Element {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const id: number = Number(event.currentTarget.value);
    setValue(id);
    onChange && onChange(id);
  };

  return (
    <select
      className="min-w-40 max-w-full bg-slate-800 px-4 py-1 rounded-md text-white outline-none focus:outline-yellow-500"
      value={value}
      onChange={handleChange}
    >
      <option value={0}>List all</option>
      {[...Array(count)].map((_, index): JSX.Element => {
        const id: number = index + 1;
        return (
          <option key={id} value={id}>
            Pokemon ID #{id}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
