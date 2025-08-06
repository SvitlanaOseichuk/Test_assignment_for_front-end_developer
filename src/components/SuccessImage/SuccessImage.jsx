import style from "./SuccessImage.module.sass"
import successImg from "../../assets/success-image.svg";


export default function SuccessImage() {

  return (
    <div className={style.container}>
      <h2>User successfully registered</h2>
      <img src={successImg} alt="Success" />
    </div>
  );
}