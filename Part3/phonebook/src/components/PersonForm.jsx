/* eslint-disable react/prop-types */
import Input from "./Input";
const PersonForm = ({ onSubmit, name, number, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <Input value={name} onChange={(e) => onChange(e, "name")} />
      </div>
      <div>
        number: <Input value={number} onChange={(e) => onChange(e, "number")} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
