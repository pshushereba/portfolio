import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-red-700 w-full h-16">
      <div className="flex">
        <h2 className="text-blue-400 text-xl">Patrick Shushereba</h2>
        <div>
          <Link href="/about">
            <a className="m-4">About</a>
          </Link>
          <Link href="/projects">
            <a className="m-4">Projects</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
