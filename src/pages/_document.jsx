import { Head, Html, Main, NextScript } from 'next/document'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-host="https://api.tinybird.co"
          data-token="p.eyJ1IjogIjBhNTljZjQ4LWNhOGMtNDg5NC1iNDgxLTI0ZWE1OGUyNmM3ZSIsICJpZCI6ICI5MjAwZDExOC00NWE0LTQ0ZjQtODYyMy03ZWUxZTM4ZGQwMjkifQ.G1z8AXnHDIjVtlo6sH8USqknKsEzS0NOkbGsEcnlbQo"
        ></script>
        <meta name="robots" content="all" />
      </Head>
      <body className="flex flex-col h-full antialiased bg-gameboy-100 dark:bg-gameboy-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
