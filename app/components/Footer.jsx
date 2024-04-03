import Link from "next/link"

function TwitterIcon(props) {
  return (
    <svg aria-hidden="true" {...props}>
      <path d="M13 5h3v1h1v1h1v1h2v1h-1v1h-1v2h-1v2h-1v1h-1v1h-1v1h-1v1h-2v1H6v-1H4v-1h3v-1h1v-1H7v-1H6v-1h1v-1H5v-1H4v-1h2V9H5V8H4V7h3v1h2v1h2V8h1V6h1V5Z" />
      <path d="M18 7V6h2v1h-2Z" />
    </svg>
  )
}

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" {...props}>
      <path d="M15 5h2v3h1v1h1v4h-1v1h-1v1h-2v1h1v3h-6v-1H7v-2h4v-1H9v-1H8v-1H7V9h1V8h1V5h2v2h4V5ZM7 16H5v-2h2v2Z" />
    </svg>
  )
}

function SocialLink({ href, icon: Icon, children, rel, target }) {
  return (
    <Link href={href} className="group" target={target} rel={rel}>
      <span className="sr-only">{children}</span>
      <Icon className="w-5 h-5 transition fill-gameboy-900 group-hover:fill-gameboy-900 " />
    </Link>
  )
}

function SmallPrint() {
  return (
    <div className="flex flex-col items-center justify-between gap-5 pt-8 border-t border-gameboy-700/20 sm:flex-row">
      <p className="text-xs text-gameboy-900 ">
        Made with
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="inline-flex w-5 h-5 mx-2 fill-gameboy-900"
        >
          <path
            d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z"
            fill="currentColor"
          />
        </svg>
        {new Date().getFullYear()} by{" "}
        <a
          href="https://educalvolopez.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edu calvo
        </a>
      </p>
      <div className="flex gap-4">
        <SocialLink
          href="https://twitter.com/educlopez93"
          target="_blank"
          rel="noopener noreferrer"
          icon={TwitterIcon}
        >
          Follow us on Twitter
        </SocialLink>
        <SocialLink
          href="https://github.com/educlopez"
          target="_blank"
          rel="noopener noreferrer"
          icon={GitHubIcon}
        >
          Follow us on GitHub
        </SocialLink>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="max-w-2xl pb-16 mx-auto space-y-10 lg:max-w-5xl">
      <SmallPrint />
    </footer>
  )
}
