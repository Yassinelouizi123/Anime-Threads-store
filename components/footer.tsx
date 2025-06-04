import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:flex-row md:justify-around">
            <Link
              href="/privacy"
              className="text-[#b4a2a3] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#b4a2a3] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/shipping"
              className="text-[#b4a2a3] text-base font-normal leading-normal min-w-40 hover:text-white transition-colors"
            >
              Shipping & Returns
            </Link>
          </div>
          <p className="text-[#b4a2a3] text-base font-normal leading-normal">
            © 2024 Anime Threads. All rights reserved.
          </p>
        </footer>
      </div>
    </footer>
  )
}
