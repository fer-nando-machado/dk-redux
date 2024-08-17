import { useState, useEffect } from "react";
import { then } from "../Game/System/Options";

const Icon: React.FC = () => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    fetch("icon.svg")
      .then((svg) => svg.text())
      .then(setIcon);
  }, []);

  return (
    <object
      className="dk"
      id={then.slice(-4)}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

export default Icon;
