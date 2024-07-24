import { h } from "preact";
import { ChangeEvent } from "preact/compat";

type SelectProps<T> = {
  options: Array<{
    label: string;
    value: T;
  }>;
  value?: T;
  onChange: (value: T) => void;
};

export const Select = <T extends string | number>({
  options,
  value,
  onChange,
}: SelectProps<T>) => {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof value === "number") {
      onChange(Number(event.currentTarget.value) as T);
    } else {
      onChange(event.currentTarget.value as T);
    }
  };

  return (
    <select
      className="p-2 rounded w-1/2"
      value={value}
      onChange={handleOnChange}
    >
      <option selected={value === undefined}>Choose local variable</option>
      {options.map((option) => (
        <option value={option.value} selected={option.value === value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
