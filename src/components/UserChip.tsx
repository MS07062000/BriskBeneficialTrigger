import React from 'react';
import { UserInfo } from './UserData';
import styles from './style.module.css';

interface UserChipProps {
  user: UserInfo;
  highlighted: boolean;
  onRemove: () => void;
}

const UserChip: React.FC<UserChipProps> = ({ user, highlighted, onRemove }) => (
  <span
    className={`${styles.userChip} ${highlighted ? styles.highlighted : ''}`}
  >
    <img
      src={user.img}
      alt="userImage"
      className={styles.userImage}
    />
    {user.username}
    <span className={styles.removeIcon} onClick={onRemove}>&#x2715;</span>
  </span>
);

export default UserChip;
