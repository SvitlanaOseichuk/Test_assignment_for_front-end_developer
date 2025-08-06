import style from "./UserCard.module.sass"
import DefaultPhoto from "../../assets/photo-cover.svg";


export default function UserCard({ user }) {
  return (
    <li key={user.id} className={style.user_card}>
      <img
        loading="lazy"
        className={style.user_img}
        src={user.photo ? user.photo : DefaultPhoto}
        alt="User photo preview"
      />
      <div className={style.user_info_row}>
        <p className={style.user_name} title={user.name}>{user.name}</p>
        <p className={style.user_data} title={user.email}>{user.email}</p>
        <p className={style.user_data}>{user.phone}</p>
        <p className={style.user_data} title={user.position}>{user.position}</p>
      </div>
    </li>
  );
}