import Image from "next/image";
import Logo from "../../../public/images/logo.png";

const Header = () => {
  return (
    <header className="bg-stone-200 text-white flex items-center justify-center h-[10vh]">
      <Image src={Logo} alt="Logo" width={80} height={30} className="mx-auto" />{" "}
    </header>
  );
};

export default Header;
