import * as React from "react";

interface Props {
  initialUserName: string;
  editingName: string;
  onNameUpdated: (newName: string) => any;
  onEditingNameUpdated: (newEditingName: string) => any;
  disabled: boolean;
}

const EditName = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onEditingNameUpdated(e.target.value);
  };

  const onSubmit = (event: any): any => {
    props.onNameUpdated();
  };

  return (
    <>
      <label>EditName</label>
      <input value={props.editingName} onChange={onChange} type="text" />
      <button onClick={onSubmit} disabled={props.disabled}>
        onSubmit
      </button>
    </>
  );
};

export default EditName;
