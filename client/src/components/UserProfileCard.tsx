"use client";
import { SOCIAL_ICONS } from "@/constants/USER_PROFESSIONS";
import { AuthContext } from "@/contexts/AuthContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import EditButton from "./ProfileEditButton";
import useForm from "@/hooks/useForm";
import { FaPlus } from "react-icons/fa";
import { axiosCredentialsInstance } from "@/api/axios";
import axios from "axios";
import AddSocialsModal from "./AddSocialsModal";
import { SOCIALS } from "@/constants/AUTH_CONSTANTS";
import NotificationGenerator from "./ToastMessage";
type AddFunction = (msg: { msg: string; title: string; type: string }) => void;

export default function UserProfileCard({ editable }: { editable: boolean }) {
  const { auth, editable: profileEditable } = useContext(AuthContext);
  const responseRef = useRef<any>();

  const [values, handleChange] = useForm({
    name: auth?.user && auth.user.name,
    bio: auth?.user && auth.user.bio,
    profession: auth?.user && auth.user.profession,
    socials: {
      github: auth?.user?.socials?.github,
      linkedIn: auth?.user?.socials?.linkedIn,
      instagram: auth?.user?.socials?.instagram,
      youtube: auth?.user?.socials?.youtube,
      twitter: auth?.user?.socials?.twitter,
    },
  });
  console.log("=== AUTH ===", auth);
  console.log("=== VALUES ===", values, auth?.user);
  const profileContainerRef = useRef<any>();
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files;
    const reader = new FileReader();

    if (
      file &&
      file[0].type != "image/jpeg" &&
      file &&
      file[0].type != "image/png" &&
      file &&
      file[0].type != "image/jpg"
    ) {
      responseRef.current({
        msg: "Please upload a valid image file",
        title: "Unsupported file type",
        type: "error",
      });
      return;
    }
    reader.addEventListener("load", function (response) {
      responseRef.current?.({
        msg: "Uploading.. 🚀",
        title: "Uploading your profile photo to the server",
        type: "info",
      });
    });

    file && (reader.readAsDataURL(file[0]) as string | undefined);
    if (file && file.length > 0) {
      const body = new FormData();
      body.set("image", file[0]);
      body.append("name", auth?.user?.name || "");
      axiosCredentialsInstance.interceptors.request.use((config) => {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
      });
      const { data } = await axiosCredentialsInstance.post(
        "/auth/upload-profile",
        body
      );
      if (data instanceof Error) {
        responseRef.current?.({
          msg: "Error in uploading profile photo",
          title: "Error",
          type: "error",
        });
        return;
      }
      handleChange({
        target: { name: "profilePhoto", value: data.profilePhoto },
      });
      responseRef.current?.({
        msg: "Profile photo uploaded successfully 🚀",
        title: "Success",
        type: "success",
      });

      profileContainerRef.current.style.backgroundImage = `url(${data.profilePhoto})`;
      profileContainerRef.current.style.backgroundSize = "cover";
    }
  }
  return (
    <>
      <section className="w-[80vw] mx-auto shadow-2xl shadow-gray-700 pb-[5vh] rounded-lg flex flex-col items-center  mt-8 relative transition-all duration-300 ease-linear">
        <div>
          <NotificationGenerator
            children={(add: AddFunction) => {
              responseRef.current = add;
            }}
          />
        </div>
        <article className="flex flex-col gap-8 items-center justify-center ">
          <figure
            className={`w-[15vw] text-the h-[15vw] rounded-[50%] relative flex flex-col gap-2 items-center justify-center bg-no-repeat bg-cover bg-[image:var(--image-url)] cursor-pointer   ${
              profileEditable ? "opacity-70" : "opacity-100"
            }`}
            //@ts-ignore
            style={{ "--image-url": `url(${auth?.user?.profilePhoto})` }}
            ref={profileContainerRef}
            // style={{
            //   background: auth?.user?.profilePhoto
            //     ? `url(${auth.user.profilePhoto})`
            //     : "rgb(203,213,209)",
            // }}
          >
            {profileEditable && (
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="absolute w-[100%] opacity-0 h-[100%] top-0 cursor-pointer"
              />
            )}
            {profileEditable && <FaPlus className="text-5xl text-white" />}
            {profileEditable && (
              <p className=" text-xl font-abhaya_libre">{""}</p>
            )}
            <span className="text-4xl absolute top-0 -right-2 bg-themePurple px-3 py-3 rounded-[50%] ">
              💻
            </span>
          </figure>
          {profileEditable ? (
            <input
              type="text"
              name="name"
              className="bg-transparent text-white text-3xl font-poppins active:border-none border-none focus:outline-none w-[40vw] resize-none text-center"
              value={(values && values.name) || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          ) : (
            <h2 className="font-poppins text-3xl text-white">
              {auth?.user?.name || "Your Name"}
            </h2>
          )}
          <p className="text-lg text-gray-300 font-rubik">
            {profileEditable ? (
              <textarea
                rows={3}
                name="bio"
                className="bg-transparent text-gray-300 font-rubik active:border-none border-none focus:outline-none w-[40vw] resize-none text-center"
                value={(values && values.bio) || ""}
                onChange={handleChange}
              />
            ) : (
              auth?.user?.bio || "Your Bio here..!"
            )}
          </p>
          <ul className="flex justify-center gap-4 items-center  mx-auto">
            {values && values.socials ? (
              SOCIALS.map((item, index) => {
                //@ts-ignore
                const Icon = SOCIAL_ICONS[item];
                if (values.socials[item]) {
                  return (
                    <a href={values.socials[item]} target="_blank">
                      <Icon.icon className="text-4xl bg-theme_pink py-2 px-2 text-white rounded-[50%]" />
                    </a>
                  );
                }
              })
            ) : (
              <>
                <p className="font-poppins text-lg">No Socials Linked ☹️</p>
              </>
            )}
            {profileEditable && values && (
              <AddSocialsModal
                values={values.socials}
                handleChange={handleChange}
              />
            )}
          </ul>
          {editable && <EditButton values={values} ref={responseRef} />}
        </article>
      </section>
    </>
  );
}
