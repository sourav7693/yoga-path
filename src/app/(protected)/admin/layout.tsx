import { getUser, logout } from "@/actions/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";

const layout = async ({children} : {children: React.ReactNode}) => {
   const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-linear-to-b from-[#E0F2FE] to-[#FFE4E6] w-full h-screen flex">
      <Sidebar />
      <section className="flex flex-col w-full">
        <AdminHeader username={user.name as string} logout={logout} />
        <div className="p-6">{children}</div>
      </section>
    </div>
  );
}

export default layout