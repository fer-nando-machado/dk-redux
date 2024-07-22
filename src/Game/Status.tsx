import "./Status.scss";

const Status = () => {
  const then = "JUL 09 1981";
  const now = new Date(Date.now()).toDateString().slice(4).toUpperCase();

  const pressEnter = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
    });
    document.dispatchEvent(event);
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
        <a href="/">RESET</a>
      </div>
    </div>
  );
};

export default Status;
