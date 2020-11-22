import React, { ReactElement } from "react";
import "./Loader.css";

interface LoaderProps {
  size: number;
  width?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size,
  width = 16,
  color1 = "#0000ff",
  color2 = "#0000ff",
  color3 = "#f3f3f3",
  color4 = "#f3f3f3",
}): ReactElement => (
  <div
    style={{
      width: size + "px",
      height: size + "px",
      borderWidth: width + "px",
      borderTopColor: color1,
      borderBottomColor: color2,
      borderLeftColor: color3,
      borderRightColor: color4
    }}
    className="loader"
  ></div>
);

export default Loader;