import * as React from "react";
import { Color } from "../model/color";
import ColorSliderComponent from "./ColorSliderComponent";

interface Props {
  color: Color;
  onColorUpdated: (color: Color) => void;
}

export const ColorPicker: React.FC<Props> = (props) => {
  const updateColor = (props: Props, colorId: keyof Color) => (value: any) => {
    props.onColorUpdated({
      ...props.color,
      [colorId]: value,
    });
  };

  return (
    <>
      {Object.keys(props.color).map((field: keyof Color) => (
        <ColorSliderComponent
          key={field}
          value={props.color[field]}
          onValueUpdated={updateColor(props, field)}
        />
      ))}
    </>
  );
};
