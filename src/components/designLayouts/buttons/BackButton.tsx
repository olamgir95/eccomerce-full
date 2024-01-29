import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  backButton: {
    position: "fixed",
    top: theme.spacing(5),
    right: theme.spacing(8),
    zIndex: theme.zIndex.appBar,
    borderRadius: "23px",
    width: "100px",
  },
}));

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.backButton}
      color="inherit"
      onClick={onClick}
      disableRipple
    >
      <ArrowBackIcon className="mr-1" />
      Back
    </IconButton>
  );
};

export default BackButton;
