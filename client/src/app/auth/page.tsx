import Image from "next/image";
import Background from "../../../public/Background.svg";
import GirlAvatar from "../../../public/women_in_background.svg";
import Navbar from "./Navbar";
import RegisterOrLoginHeading from "./RegisterOrLogin._Heading";
import AuthForm from "@/forms/AuthForm";
import { useRef } from "react";
import NotificationGenerator from "@/components/ToastMessage";
type AddFunction = (msg: { msg: string; title: string; type: string }) => void;
function Register() {
  return (
    <main
      className={` text-white min-h-screen flex items-center justify-center`}
      style={{
        backgroundColor: `#000`,
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
      }}
    >
      <section className="w-[90vw] flex justify-center items-center h-[90vh]">
        <RegisterOrLoginHeading />
        <div className="h-[100%] flex items-center justify-center">
          <Image
            src={GirlAvatar}
            alt="Woman_In_Background"
            className="h-[60vh]"
          />
        </div>
        <div className="flex flex-col h-[90%] justify-between  relative">
          <Navbar />
          <div className="self-center">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
