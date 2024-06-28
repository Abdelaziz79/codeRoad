import React from "react";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdateUserPassword from "./UpdateUserPassword";
import { Button } from "react-bootstrap";
import { deleteUser } from "../../services/apiAuth";
import { toast } from "react-toastify";

export default function UserUpdate() {
  async function handleDelete() {
    await deleteUser();
    toast.success("Account deleted successfully");
  }
  return (
    <>
      <UpdateUserInfo />
      <UpdateUserPassword />
      <Button className="mt-3" variant="danger" onClick={handleDelete}>
        Delete Account
      </Button>
    </>
  );
}
