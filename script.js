const nav = document.querySelector(".nav")
const navLinksContainer = document.querySelector(".nav-links")
const navLinks = document.querySelectorAll(".nav-link")
const menuToggle = document.querySelector(".menu-toggle")
const sections = document.querySelectorAll("section[id]")
const revealElements = document.querySelectorAll(".reveal-up")
const heroContent = document.querySelector(".hero-content")

function setNavScrolledState() {
  nav?.classList.toggle("scrolled", window.scrollY > 24)
}

function closeMenu() {
  if (!menuToggle || !navLinksContainer) return
  menuToggle.classList.remove("open")
  menuToggle.setAttribute("aria-expanded", "false")
  navLinksContainer.classList.remove("open")
}

function toggleMenu() {
  if (!menuToggle || !navLinksContainer) return
  const isOpen = menuToggle.classList.toggle("open")
  navLinksContainer.classList.toggle("open", isOpen)
  menuToggle.setAttribute("aria-expanded", String(isOpen))
}

function updateActiveLink() {
  let currentSection = ""
  sections.forEach((section) => {
    const top = section.offsetTop - 120
    const height = section.offsetHeight
    if (window.scrollY >= top && window.scrollY < top + height) {
      currentSection = section.id
    }
  })

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`
    link.classList.toggle("active", isActive)
  })
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  )

  revealElements.forEach((el) => observer.observe(el))
}

function onDocumentClick(event) {
  const anchor = event.target.closest('a[href^="#"]')
  if (!anchor) return

  const href = anchor.getAttribute("href")
  if (!href) return

  const target = document.querySelector(href)
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: "smooth", block: "start" })
  closeMenu()
}

function onWindowScroll() {
  setNavScrolledState()
  updateActiveLink()

  if (heroContent) {
    const scrolled = Math.min(window.scrollY, 500)
    heroContent.style.transform = `translateY(${scrolled * 0.18}px)`
    heroContent.style.opacity = String(1 - scrolled / 900)
  }
}

menuToggle?.addEventListener("click", toggleMenu)
document.addEventListener("click", onDocumentClick)
window.addEventListener("scroll", onWindowScroll)
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu()
})

setNavScrolledState()
updateActiveLink()
initRevealObserver()
