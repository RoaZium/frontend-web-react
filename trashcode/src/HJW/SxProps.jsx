export const OutPopStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  height: "75vh",
  bgcolor: "white",
  boxShadow: 10,
  borderRadius: 2,
};

export const InPopTitleStyle = {
  position: "fixed",
  height: "6vh",
  width: "35vw",
};

export const InPopInfoStyle = {
  position: "fixed",
  height: "5vh",
  width: "35vw",
  top: "6vh",
  bgcolor: "#FFEFD5",
};

export const InPopContentStyle = {
  position: "absolute",
  height: "57vh",
  top: "11vh",
  width: "35vw",
  overflow: "auto",
  "& .MuiTextField-root": { m: 1, width: "30vw" },
  verticalAlign: "middle",
};

export const InPopBottomStyle = {
  position: "fixed",
  height: "7vh",
  width: "35vw",
  bottom: 0,
};

export const TreeItemStyle = {
  "&:default": {
    backgroundColor: "red",
  },
  "&:hover": {
    backgroundColor: "white",
  },
  "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover":
    {
      backgroundColor: "#FFEFD5",
      color: "#FFFFFF",
    },
};
