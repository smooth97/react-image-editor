import React from "react";

interface Props {
  value: number;
  onValueUpdated: (newValue: number) => void;
}

const ColorSliderComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="255"
        value={props.value}
        onChange={(event: any) => props.onValueUpdated(event.target.value)}
      />
    </div>
  );
};

export default ColorSliderComponent;
