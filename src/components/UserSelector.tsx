import React, { useState } from 'react';
import { UserInfo, initialUserInfoList } from './UserData';
import UserChip from './UserChip';
import UserDropdown from './UserDropdown';
import styles from './style.module.css';

const UserSelector: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<UserInfo[]>([]);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredUserList, setFilteredUserList] = useState<UserInfo[]>(initialUserInfoList);

  const handleUserSelect = (selectedUser: UserInfo) => {
    setSelectedUsers((prevUsers) => [...prevUsers, selectedUser]);
    setSearchText('');
    setFilteredUserList(initialUserInfoList);
  };

  const handleChipRemove = (userId: number) => {
   setSelectedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    const filteredUsers = initialUserInfoList.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase()) &&
      selectedUsers.findIndex((selectedUser) => selectedUser.id === user.id) === -1
    );
    setFilteredUserList(filteredUsers);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
    if(e.key === 'Backspace' && highlightedChip == null && selectedUsers.length>0 && searchText.length===0) {
      setHighlightedChip(selectedUsers[selectedUsers.length-1].id);
    }else{
      if(searchText.length==0 && highlightedChip != null){
        handleChipRemove(highlightedChip);
        setHighlightedChip(null);
      }else{
        setHighlightedChip(null);
      }
    }
  }

  return (
    <>
      <div className={styles.chipsContainer} style={{
        border: `2px solid ${searchText ? 'gray' : 'black'}`,
        borderBottom: `2px solid ${searchText ? 'blue' : 'black'}`
      }}>
        {selectedUsers.map((user) => (
          <UserChip
            key={user.id}
            user={user}
            highlighted={highlightedChip === user.id}
            onRemove={() => handleChipRemove(user.id)}
          />
        ))}
        <div className={styles.searchInputContainer}>
          <input
            value={searchText}
            type="text"
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Add new users..."
            className={styles.searchInput}
          />
          {searchText.length > 0 && (
            filteredUserList.length > 0 ? (
              <UserDropdown
                filteredUserList={filteredUserList}
                handleUserSelect={handleUserSelect}
              />
            ) : (<p className={styles.emptyDropdown}>No result found</p>))}
        </div>
      </div>
    </>
  );
};

export default UserSelector;
