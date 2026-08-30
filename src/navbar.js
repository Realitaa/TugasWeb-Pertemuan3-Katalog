import menuIcon from './assets/menu.svg?raw'
import sunIcon from './assets/sun.svg?raw'
import moonIcon from './assets/moon.svg?raw'
import systemIcon from './assets/system.svg?raw'
import { getStorage, setStorage } from './utils.js'

export const navLinks = [
  { label: 'Produk', href: '/', active: true },
  { label: 'Tentang', href: '#' },
  { label: 'Kontak', href: '#' },
]

export function setupNavbar() {
  const toggleBtn = document.getElementById('hs-navbar-example-collapse')
  const navCollapse = document.getElementById('hs-navbar-example')
  const iconContainer = document.getElementById('navbar-toggle-icon')
  const navList = document.getElementById('navbar-list')

  if (iconContainer) {
    iconContainer.innerHTML = menuIcon
  }

  if (navList) {
    navList.innerHTML = navLinks.map(link => {
      const activeClass = link.active 
        ? 'focus:outline-hidden'
        : 'text-sm text-muted hover:text-brand-hover focus:outline-hidden'
      const ariaCurrent = link.active ? 'aria-current="page"' : ''
      return `<li><a class="${activeClass}" href="${link.href}" ${ariaCurrent}>${link.label}</a></li>`
    }).join('')
  }

  if (toggleBtn && navCollapse) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = navCollapse.classList.contains('hidden')
      if (isHidden) {
        navCollapse.classList.remove('hidden')
        toggleBtn.setAttribute('aria-expanded', 'true')
      } else {
        navCollapse.classList.add('hidden')
        toggleBtn.setAttribute('aria-expanded', 'false')
      }
    })
  }

  // Theme switcher: light -> dark -> system -> light
  const themeToggleBtn = document.getElementById('theme-toggle-btn')
  const themeToggleIcon = document.getElementById('theme-toggle-icon')
  const themes = ['light', 'dark', 'system']
  
  const savedTheme = getStorage('theme', 'system')
  let currentThemeIndex = themes.includes(savedTheme) ? themes.indexOf(savedTheme) : themes.indexOf('system')

  function applyTheme(theme) {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (themeToggleIcon) {
      if (theme === 'light') {
        themeToggleIcon.innerHTML = sunIcon
      } else if (theme === 'dark') {
        themeToggleIcon.innerHTML = moonIcon
      } else {
        themeToggleIcon.innerHTML = systemIcon
      }
    }
  }

  applyTheme(themes[currentThemeIndex])

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themes[currentThemeIndex] === 'system') {
      applyTheme('system')
    }
  })

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length
      const nextTheme = themes[currentThemeIndex]
      setStorage('theme', nextTheme)
      applyTheme(nextTheme)
    })
  }
}


