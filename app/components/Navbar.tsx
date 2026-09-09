import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-black-one  shadow-lg shadow-[#1c1c1c] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-main flex items-center gap-2"
        >
          <span className="bg-black text-blue-main px-2.5 py-2 rounded-lg text-sm font-mono">
            &lt;/&gt;
          </span>
          DevBlog
        </Link>
      </div>
    </header>
  );
}
