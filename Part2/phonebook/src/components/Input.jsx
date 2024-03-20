/* eslint-disable react/prop-types */
const Input = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e, "filter")} />;
};

export default Input;
