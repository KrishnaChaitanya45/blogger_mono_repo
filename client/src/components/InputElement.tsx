"use client";
import { RxCrossCircled } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
type InputProps = {
  key: number | string;
  name: string;
  value: string;
  onChange: () => void;
  isText?: boolean;
  isPassword?: boolean;
  resetValue: (name: string) => void;
};
import { useRef, useState } from "react";

export default function InputElement({
  key,
  name,
  value,
  isPassword,
  isText,
  resetValue,
  onChange,
}: InputProps) {
  const [toggle, setToggle] = useState(false);
  function togglePassword() {
    setToggle((prev) => !prev);
  }
  return (
    <div className="w-[20vw] font-abhaya_libre flex items-center">
      <input
        key={key}
        name={name}
        placeholder={`Enter ${name[0].toUpperCase() + name.slice(1)}`}
        value={value}
        onChange={onChange}
        type={name === "password" ? (toggle ? "text" : "password") : "text"}
        className="w-[100%] bg-transparent border-[1px] py-2 rounded-xl border-[#4461F2] flex items-center px-4 font-abhaya_libre font-[600] text-white tracking-wider "
      />
      {isText && (
        <RxCrossCircled
          className="absolute right-4 text-white text-lg cursor-pointer"
          onClick={() => {
            resetValue(name);
          }}
        />
      )}
      {isPassword && !toggle ? (
        <FaEye
          className="absolute right-4 text-white text-lg cursor-pointer"
          onClick={togglePassword}
        />
      ) : (
        !isText && (
          <FaEyeSlash
            className="absolute right-4 text-white text-lg cursor-pointer"
            onClick={togglePassword}
          />
        )
      )}
    </div>
  );
}
