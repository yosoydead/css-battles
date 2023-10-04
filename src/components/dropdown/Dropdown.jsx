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
        onChange={(e) => {
          console.log('onchange', e)
        }}
      >
        {/* {list} */}
        { list.map(el => {
            return <option value={el}>{el}</option>
          })
        }
      </select>
    </label>
  );
}

export default Dropdown;