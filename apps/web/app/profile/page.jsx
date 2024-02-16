import { cookies } from "next/headers";

export default function () {
  const cookiesStore = cookies();
  const token = cookiesStore?.get("token") || null;

  if (!token) {
    redirect("/auth/login?redirect=cart");
  }
  return (
    <>
      <div>Hi, I am Nishal</div>
    </>
  );
}
