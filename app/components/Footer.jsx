import Link from "next/link"

function SmallPrint() {
  return (
    <div className="flex flex-col items-center justify-between gap-5 pt-8 sm:flex-row">
      <p className="m-auto w-auto text-center text-xs text-gameboy-900">
        Made with
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mx-2 inline-flex h-5 w-5 fill-gameboy-900"
        >
          <path
            d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z"
            fill="currentColor"
          />
        </svg>
        {new Date().getFullYear()} by{" "}
        <Link
          href="https://educalvolopez.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edu calvo
        </Link>
      </p>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <SmallPrint />
    </footer>
  )
}
