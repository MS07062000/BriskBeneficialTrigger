import React from 'react';
import styles from './style.module.css';

interface UserDropdownProps {
  filteredUserList: {
    id: number;
    img: string;
    username: string;
    email: string;
  }[];
  handleUserSelect: (user: { id: number; img: string; username: string; email: string }) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ filteredUserList, handleUserSelect }) => (
  <ul className={styles.userDropdown}>
    {filteredUserList.map((user, index) => (
      <li
        key={user.id}
        value={user.id}
        onClick={() => handleUserSelect(user)}
        className={styles.userDropdownItem}
        style={{ marginTop: index !== 0 ? '5px' : '0px', }}
      >
        <img
          src={user.img}
          alt="userImage"
          className={styles.userImage}
        />
        <span className={styles.userInfo}>
          {user.username}
          <span className={styles.userEmail}> {user.email}</span>
        </span>

      </li>
    ))}
  </ul>
);

export default UserDropdown;
