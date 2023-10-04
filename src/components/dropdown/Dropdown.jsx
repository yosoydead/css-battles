import { useEffect } from "react";

function Dropdown({
  name,
  label,
  list,
  selectedValue,
  onChange,
}) {
  return (
    <label htmlFor={name}>
      {label}
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={selectedValue}
      >
        {/* {list} */}
        { list.map(el => {
            return <option value={el} key={`${name}_${el}`}>{el}</option>
          })
        }
      </select>
    </label>
  );
}

export default Dropdown;