import classes from "./Modal.module.css";
import Card from "./Card.jsx";
import { Button } from "@mui/material";

const Modal = (props) => {
  const OverLay = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}></div>;
  };

  return (
    <>
      <OverLay onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <ul>
            {props.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <footer className={classes.actions}>
          <Button variant="contained" size="medium" onClick={props.onConfirm}>
            Okay
          </Button>
        </footer>
      </Card>
    </>
  );
};

export default Modal;
