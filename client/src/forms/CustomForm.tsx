import InputElement from "@/components/InputElement";
import useForm from "../../hooks/useForm";
import { FormEvent } from "react";
type PropsType = {
  initialValues: any;
  type?: "register" | "login";
  submitHandler: (e: FormEvent<HTMLFormElement>, values: any) => void;
};
export default function CustomForm({
  initialValues,
  type,
  submitHandler,
}: PropsType) {
  console.log(Object.keys(initialValues));
  const [values, handleChange, resetValue] = useForm(initialValues);

  return (
    <form
      className="flex flex-col items-center justify-center gap-6 absolute top-[50%] -translate-y-[30%] -translate-x-[-50%] right-[50%] "
      onSubmit={(e) => {
        submitHandler(e, values);
      }}
    >
      {Object.keys(initialValues).map((keyName, i) => (
        <InputElement
          key={i}
          name={keyName}
          isText={keyName !== "password"}
          isPassword={keyName === "password"}
          value={values[keyName]}
          resetValue={resetValue}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className=" @apply shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)] bg-[#4461F2] w-[100%] py-2 rounded-xl font-abhaya_libre text-lg tracking-wide"
      >
        {" "}
        {type === "register"
          ? "Register 🚀"
          : type === "login"
          ? "Login 🔥"
          : "Submit"}{" "}
      </button>
    </form>
  );
}
