import Link from "next/link"

function SideNavbar() {
  return (
    <div className="flex flex-col bg-gray-900 text-white p-6 gap-4 fixed h-full w-60">
      <div className="text-2xl font-bold">Image Downloader</div>
      <nav className="flex flex-col gap-2">
        <Link className="flex items-center gap-2 hover:text-gray-300" href="#">
          Download
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-300" href="#">
          Settings
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-300" href="#">
          About
        </Link>
      </nav>
    </div>)
}

export default SideNavbar