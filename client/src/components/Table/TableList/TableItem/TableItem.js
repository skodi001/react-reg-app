import React from "react";
import { Td, Tr } from "react-super-responsive-table";
import { Button, Form } from "react-bootstrap";

function TableItem({
  isChecked,
  toggleSingleCHeckbox,
  index,
  user,
  blockUser,
  unblockUser,
  deleteUser,
}) {
  console.log(isChecked, "Table Item");
  return (
    <>
      <Tr>
        <Td>
          <Form.Check
            type="checkbox"
            checked={isChecked?.isChecked ? true : false}
            onChange={toggleSingleCHeckbox.bind(null, index)}
          />
        </Td>
        <Td>#{user._id.slice(0, 7)}</Td>
        <Td>{user.username}</Td>
        <Td>{user.email}</Td>
        <Td>{user.logTime}</Td>
        <Td>{user.regTime}</Td>
        <Td>{user.isBlocked ? "Blocked" : "Active"}</Td>
        <Td>
          <Button
            className="btn btn-sm btn-primary me-2 my-2"
            onClick={blockUser.bind(null, user._id)}
          >
            Block
          </Button>
          <Button
            className="btn btn-sm btn-success my-2"
            onClick={unblockUser.bind(null, user._id)}
          >
            Unblock
          </Button>
          <Button
            className="btn btn-sm btn-danger ms-2 my-2"
            onClick={deleteUser.bind(null, user._id)}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    </>
  );
}

export default TableItem;
