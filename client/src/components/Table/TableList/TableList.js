import React from "react";
import TableItem from "./TableItem/TableItem";

function TableList({
  isAllChecked,
  toggleSingleCHeckbox,
  users,
  currentUser,
  blockUser,
  unblockUser,
  deleteUser,
}) {
  // console.log(isAllChecked, "Table List");
  return users?.map((user, index) => (
    <TableItem
      key={user._id}
      user={user}
      index={index}
      toggleSingleCHeckbox={toggleSingleCHeckbox}
      isChecked={isAllChecked[index]}
      blockUser={blockUser}
      unblockUser={unblockUser}
      deleteUser={deleteUser}
    />
  ));
}

export default TableList;
