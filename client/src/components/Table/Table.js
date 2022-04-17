import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableList from "./TableList/TableList";
import { Table, Thead, Tbody, Th, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Form, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";

function UserTable({ currentUser, users, blockUser, unblockUser, deleteUser }) {
  const navigate = useNavigate();
  const [isAllChecked, setIsAllChecked] = useState([]);
  const [isHeadCheckboxSelected, setIsHeadCheckboxSelected] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.isBlocked) {
      console.log(currentUser, "Table s");
      navigate("/login");
      return;
    }
  }, [currentUser]);
  useEffect(() => {
    setIsAllChecked(
      users.map((user) => ({ userId: user._id, isChecked: false }))
    );
  }, [users]);

  useEffect(() => {
    if (isHeadCheckboxSelected) {
      console.log("Head CHeckbox selecetd");
      setIsAllChecked(isAllChecked.map((val) => ({ ...val, isChecked: true })));
    } else {
      console.log("Head CHeckbox is not selecetd");
      setIsAllChecked(
        isAllChecked.map((val) => ({ ...val, isChecked: false }))
      );
    }
  }, [isHeadCheckboxSelected]);

  const toggleSingleCHeckbox = (i) => {
    setIsAllChecked(
      isAllChecked.map((val, index) =>
        index === i
          ? { ...val, isChecked: !val.isChecked }
          : { ...val, isChecked: val.isChecked }
      )
    );
  };

  const blockUsers = (users) => {
    const selectedUsers = isAllChecked.filter((val) => val.isChecked);
    console.log(selectedUsers);
    selectedUsers.forEach(async (user) => blockUser(user.userId));
  };
  const unblockUsers = (users) => {
    const selectedUsers = isAllChecked.filter((val) => val.isChecked);
    console.log(selectedUsers);
    selectedUsers.forEach(async (user) => unblockUser(user.userId));
  };
  const deleteUsers = (users) => {
    const selectedUsers = isAllChecked.filter((val) => val.isChecked);
    console.log(selectedUsers);
    selectedUsers.forEach(async (user) => deleteUser(user.userId));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="d-grid gap-2">
        <Button
          className="d-block  btn btn-sm btn-primary"
          onClick={blockUsers}
        >
          Block
        </Button>
        <Button
          className="d-block  btn btn-sm btn-success"
          onClick={unblockUsers}
        >
          Unblock
        </Button>
        <Button
          className="d-block   btn btn-sm btn-danger"
          onClick={deleteUsers}
        >
          Delete
        </Button>
      </Popover.Body>
    </Popover>
  );

  const overlayTrigger = (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <button style={{ backgroundColor: "transparent", border: "0" }}>
        <HiDotsVertical />
      </button>
    </OverlayTrigger>
  );

  const checkAll = () => {
    setIsHeadCheckboxSelected(!isHeadCheckboxSelected);
  };
  console.log(isAllChecked, isHeadCheckboxSelected, "Table");

  return (
    <Table className="mt-5">
      <Thead>
        <Tr>
          <Th className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              onChange={checkAll}
              checked={isHeadCheckboxSelected}
            />
            {overlayTrigger}
          </Th>
          <Th scope="col">Id</Th>
          <Th scope="col">Username</Th>
          <Th scope="col">Email</Th>
          <Th scope="col">Login Time</Th>
          <Th scope="col">Registration Time</Th>
          <Th scope="col">Status</Th>
          <Th scope="col">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        <TableList
          users={users}
          isAllChecked={isAllChecked}
          toggleSingleCHeckbox={toggleSingleCHeckbox}
          currentUser={currentUser}
          blockUser={blockUser}
          unblockUser={unblockUser}
          deleteUser={deleteUser}
        />
      </Tbody>
    </Table>
  );
}

export default UserTable;
