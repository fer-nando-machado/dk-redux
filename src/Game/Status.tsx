import "./Status.scss";

const Status = () => {
  const then = "JUL 09 1981";
  const now = new Date(Date.now()).toDateString().slice(4).toUpperCase();

  const pressEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const enter = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
    });
    document.dispatchEvent(enter);
  };

  const pressF5 = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className="Status">
      <div>
        {then} <br /> {now}
      </div>
      <div>
        <a href="#" onClick={pressEnter}>
          PAUSE
        </a>{" "}
        <a href="#" onClick={pressF5}>
          RESET
        </a>
      </div>
    </div>
  );
};

export default Status;
