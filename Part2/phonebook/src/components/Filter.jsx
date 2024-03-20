/* eslint-disable react/prop-types */
import Input from "./Input";

const Filter = ({ text, onChange }) => {
  return (
    <div>
      filter shown with
      <Input value={text} onChange={(e) => onChange(e, "filter")} />
    </div>
  );
};

export default Filter;
