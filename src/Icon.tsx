import { useState, useEffect } from "react";

const Icon: React.FC = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(icon.svg)
      .then((response) => response.text())
      .then((data) => {
        setContent(data);
      });
  }, []);
  1;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={icon.game}
      id={icon.year}
    />
  );
};

const icon = {
  svg: "icon.svg",
  year: "1981",
  game: "dk",
};

export default Icon;
