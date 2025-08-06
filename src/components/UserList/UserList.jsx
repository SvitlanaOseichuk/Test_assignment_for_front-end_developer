import { useEffect, useState } from "react";
import style from "./UserList.module.sass"
import loader from "../../assets/loader.svg"
import { fetchUsers } from "../../services/api";
import UserCard from "../UserCard/UserCard";


export default function UserList({ refreshTrigger }) {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setUsers([]);        
    setPage(1);          
    setTotalPages(null); 
    loadUsers(1);  
  }, [refreshTrigger]);


  const loadUsers = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchUsers(pageNum);
      setUsers((prev) => {
        const newUsers = data.users.filter(
          (newUser) => !prev.some((user) => user.id === newUser.id)
        );
        return [...prev, ...newUsers];
      });
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
      setInitialLoading(false); 
    } 
  };


  const handleShowMore = () => {
    loadUsers(page + 1);
  };


  return (
    <div className={style.users_container}>
      <h2>Working with GET request</h2>

      {initialLoading ? (
        <div className={style.loader_wrapper}>
          <img src={loader} alt="Loading..." className={style.loader} />
        </div>
      ) : (
        <>
          <ul className={style.users_list}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>

          {loading && (
            <div className={style.loader_wrapper}>
              <img src={loader} alt="Loading..." className={style.loader} />
            </div>
          )}

          {page < totalPages && !loading && (
            <button onClick={handleShowMore}>Show more</button>
          )}
        </>
      )}
    </div>
  );
}