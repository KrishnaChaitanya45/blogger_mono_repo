"use server";
import UserProfileCard from "@/components/UserProfileCard";

export default async function UserProfilePage({
  params,
}: {
  params: { userName: string };
}) {
  return (
    <section className="w-[90%]  mx-auto mt-8">
      {/* <h1 className="text-5xl text-center font-clash_display">
        Welcome 👋{" "}
        <span className="font-poppins text-theme_light_pink italic">
          {params.userName}
        </span>
      </h1> */}
      <UserProfileCard editable={true} />
    </section>
  );
}
