import Link from "next/link";
import { SquareTerminal, X, BookUser, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-two border-t border-[#1a2324] mt-5 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1f292a]">
          <div className="space-y-2 text-center md:text-left">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-blue-main flex items-center gap-2"
            >
              <span className="bg-black text-blue-main px-2.5 py-2 rounded-lg text-sm font-mono">
                &lt;/&gt;
              </span>
              DevBlog
            </Link>
            <p className="text-sm text-[#758486] max-w-sm">
              Articles, tutorials, and deep dives into Next.js, Contentful,
              TypeScript, and modern web architecture.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://SquareTerminal.com/ASuarez18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SquareTerminal"
              className="p-2.5 rounded-xl bg-[#222829] text-[#758486] hover:text-blue-main hover:bg-[#2e3738] transition-all border border-[#2e3738]"
            >
              <SquareTerminal className="w-5 h-5" />
            </a>
            <a
              href="https://X.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="p-2.5 rounded-xl bg-[#222829] text-[#758486] hover:text-blue-main hover:bg-[#2e3738] transition-all border border-[#2e3738]"
            >
              <X className="w-5 h-5" />
            </a>
            <a
              href="https://BookUser.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BookUser"
              className="p-2.5 rounded-xl bg-[#222829] text-[#758486] hover:text-blue-main hover:bg-[#2e3738] transition-all border border-[#2e3738]"
            >
              <BookUser className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#758486]">
          <p>© {currentYear} DevBlog. Built with Next.js & Contentful.</p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-blue-main fill-blue-main" /> for
            web developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
