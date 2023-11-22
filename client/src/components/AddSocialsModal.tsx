"use client";

import { SOCIALS } from "@/constants/AUTH_CONSTANTS";
import { SOCIAL_ICONS } from "@/constants/USER_PROFESSIONS";
import { useState } from "react";
import { MdDone } from "react-icons/md";

export default function AddSocialsModal({
  values,
  handleChange,
}: {
  values: null | {
    github: string | null;
    linkedIn: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
  };
  handleChange: any;
}) {
  console.log(values);
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button
        className="bg-theme_light_pink py-2 px-4 rounded-lg font-poppins"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Manage Socials 🌐{" "}
      </button>
      {toggle && (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  backdrop-filter backdrop-brightness-100 backdrop-blur-md backdrop-contrast-200 py-[5vh] px-[5vw] rounded-lg flex flex-col gap-4 items-center justify-center">
          {/*         
        <button className="rounded-[50%] bg-themeGreen w-fit py-4 px-4 ">
          <MdDone className="text-white text-2xl " />{" "}
        </button> */}
          {SOCIALS.map((item, index) => {
            //@ts-ignore
            const Icon = SOCIAL_ICONS[item];
            return (
              <div
                className="flex items-center justify-around gap-8"
                key={index}
              >
                <span>
                  <Icon.icon
                    className={`text-2xl`}
                    style={{
                      color: Icon.color,
                    }}
                  />
                </span>
                <input
                  className="bg-transparent focus:outline-none py-1 px-2 font-rubik text-lg text-white border-b-[1px] border-themeLightBlue"
                  //@ts-ignore
                  value={(values && values[item]) || ""}
                  onChange={(e) => {
                    handleChange(e, true);
                  }}
                  name={item}
                />
              </div>
            );
          })}
          <button
            className="bg-themePurple py-2 px-4 rounded-lg font-rubik mt-4"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Update Changes 🚀
          </button>
        </div>
      )}
    </div>
  );
}
