export const commonStyles = {
  width: "100%",
  height: "72px",
  
  // label is in focus
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#7E7E7E",
  },

  // Label in error case
  "& .MuiFormLabel-root.Mui-error": {
    color: "#CB3D40",
  },

  "& .MuiOutlinedInput-root": {
    height: "54px",
    padding: 0,
    borderRadius: "4px",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D0CFCF",
      borderWidth: "1px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D0CFCF",
      borderWidth: "1px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#CB3D40",
      borderWidth: "2px",
    },
  },

  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
    boxSizing: "border-box",
  },
  
  "& .MuiFormHelperText-root": {
    marginTop: "4px",
    color: "#CB3D40",
    fontSize: "12px",
    lineHeight: "14px",
  },
};