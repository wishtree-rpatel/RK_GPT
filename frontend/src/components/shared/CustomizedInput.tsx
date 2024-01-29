import { TextField, styled } from "@mui/material";

const CustomizedInput = styled(TextField)({
  "&.MuiTextField-root": {
    marginBottom: "30px",
    width: "400px",
  },
  "& input": {
    color: "white",
    borderRadius: 10,
    fontSize: 20,
  },
  "& fieldset": {
    borderColor: "white",
  },
  "& .Mui-focused fieldset ": {
    borderColor: "white !important",
  },
  "& label.Mui-focused": {
    color: "white",
  },
});

export default CustomizedInput;
