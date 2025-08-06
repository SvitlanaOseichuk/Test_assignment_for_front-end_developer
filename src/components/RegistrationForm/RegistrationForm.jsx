import style from "./RegistrationForm.module.sass"
import TextField from "@mui/material/TextField"
import SuccessImage from "../SuccessImage/SuccessImage";
import { useRegistrationForm } from "./useRegistrationForm";
import { commonStyles } from "./FormMUIStyles";


export default function RegistrationForm({ onUserRegistered }) {
  const {
    positions,
    positionId,
    errors,
    formData,
    isFormValid,
    isSubmitted,
    fileInputRef,
    handleChange,
    handlePositionChange,
    handleSubmit,
  } = useRegistrationForm(onUserRegistered);

  return (
    <div className={style.form_conteiner}>
      {isSubmitted ? (
        <SuccessImage />
      ) : (
        <div>
          <h2>Working with POST request</h2>

          <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">

            <div className={style.form}>
              <TextField
                label="Your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || " "}
                variant="outlined"
                fullWidth
                sx={commonStyles}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || " "}
                variant="outlined"
                fullWidth
                sx={commonStyles}
              />

              <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone || "+38 (XXX) XXX - XX - XX"}
                variant="outlined"
                fullWidth
                sx={{
                  ...commonStyles,
                  "& .MuiFormHelperText-root": {
                    marginTop: "4px",
                    color: errors.email ? "#CB3D40" : "#7E7E7E",
                    fontSize: "12px",
                    lineHeight: "14px",
                  },
                }}
              />
            </div>
                      
            <div  className={style.radio} >
              <p>Select your position</p>
              {positions.map((position) => (
                <label key={position.id}>
                  <input
                    type="radio"
                    name="position"
                    value={position.id}
                    checked={positionId === position.id}
                    onChange={handlePositionChange}
                  />
                  <span>{position.name}</span>
                </label>
              ))}
            </div>
            
            <div className={style.file_input_wrapper}>
              <input
                type="file"
                id="photo-upload"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className={`${style.file_input} ${errors.photo ? style.error : ""}`}
              />

              <label htmlFor="photo-upload" className={style.file_label}>
                <span className={style.upload_button}>Upload</span>
                <span className={style.upload_filename}>
                  {formData.photo?.name || "Upload your photo"}
                </span>
              </label>

              {errors.photo && <p className={style.file_error}>{errors.photo}</p>}
            </div>

            <button type="submit" disabled={!isFormValid}>
              Sign up
            </button>
          </form>
        </div>
      )}
    </div>
  );
}