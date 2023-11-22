"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { tRPC } from "../../trpc";
import React, { useContext } from "react";
import { MdDone } from "react-icons/md";
import { setToken } from "@/providers/TRPC_Provider";
const EditButton = React.forwardRef(({ values }: { values: any }, ref) => {
  const { auth, setEditable, editable, setAuth } = useContext(AuthContext);
  console.log(ref);
  const profileButtonMutator = tRPC.updateUserDetails.useMutation();
  async function handleClick() {
    setToken("Bearer " + auth?.accessToken);
    if (editable) {
      const result = profileButtonMutator.mutate(values);
      if (profileButtonMutator.error) {
        ref.current?.({
          msg: "Error in updating profile",
          title: "Error",
          type: "error",
        });
      }
      if (profileButtonMutator.data) {
        ref.current?.({
          msg: "Profile updated successfully",
          title: "Success",
          type: "success",
        });
      }
      setAuth((prev) => {
        if (prev.user) {
          prev.user.name = values.name;
          prev.user.bio = values.bio;
          prev.user.profession = values.profession;
          prev.user.socials = values.socials;
          prev.user.profilePhoto = values.profilePhoto;
        }
        return prev;
      });
      setEditable(!editable);
    }
    if (!editable) setEditable(!editable);
  }
  return (
    <button
      className="text-4xl absolute bg-themeBlue -right-2 -bottom-2 px-4 py-4 font-poppins rounded-[50%]"
      onClick={handleClick}
    >
      {editable ? <MdDone /> : "✏️"}
    </button>
  );
});
export default EditButton;
