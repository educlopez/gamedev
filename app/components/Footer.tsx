import Link from "next/link";

function SmallPrint() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-8 sm:flex-row sm:justify-center">
      <div className="pixel-bg border-4 border-gameboy-900 bg-gameboy-200 px-4 py-3 shadow-[inset_3px_3px_0_var(--color-gameboy-100),inset_-3px_-3px_0_var(--color-gameboy-700)]">
        <p className="w-auto text-center font-bold text-gameboy-900 text-xs">
          Made with
          <svg
            aria-hidden="true"
            className="mx-2 inline-flex h-5 w-5 fill-gameboy-900"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z"
              fill="currentColor"
            />
          </svg>
          {new Date().getFullYear()} by{" "}
          <Link
            className="underline decoration-2 underline-offset-2 transition hover:text-gameboy-700"
            href="https://educalvolopez.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Edu calvo
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <SmallPrint />
    </footer>
  );
}
