import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="rounded flex items-center justify-center h-14 w-14 p-4 hover:bg-blue-300
      hover:bg-opacity-10 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
