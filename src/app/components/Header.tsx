import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-stone-200 text-white flex items-center justify-center h-[10vh]">
      <Image
        src="https://i.postimg.cc/3xdBRgNj/logo.png"
        alt="Logo"
        width={80}
        height={30}
        className="mx-auto"
      />{" "}
    </header>
  );
};

export default Header;
