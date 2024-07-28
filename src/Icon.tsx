import { useState, useEffect } from "react";
import { then } from "./Game/System/Options";

const Icon: React.FC = () => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    fetch("icon.svg")
      .then((response) => response.text())
      .then(setIcon);
  }, []);

  return (
    <div
      className="dk"
      dangerouslySetInnerHTML={{ __html: icon }}
      id={then.slice(-4)}
    />
  );
};

export default Icon;
