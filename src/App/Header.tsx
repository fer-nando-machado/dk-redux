import { name, description, homepage } from "../../package.json";
import { useState, useEffect } from "react";
import { then } from "../Game/System/Options";
import "./Header.scss";

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: name,
      text: description,
      url: `${homepage}/#${then.slice(-4)}`,
    });
  }
};

const Header: React.FC = () => {
  return (
    <h1>
      <Icon /> DK<span>{"<Redux/>"}</span>
      {navigator.share !== undefined && (
        <div className="Share" title="Share" onClick={handleShare}>
          &lt;
        </div>
      )}
    </h1>
  );
};

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

export default Header;
