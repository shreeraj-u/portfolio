// Smooth scroll for navigation links
document.addEventListener("click", (e) => {
  const target = e.target
  const anchor = target.closest('a[href^="#"]')
  if (anchor) {
    e.preventDefault()
    const href = anchor.getAttribute("href")
    if (href) {
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }
})

// Add active state to navigation links on scroll
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveLink() {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".project-card, .research-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Add parallax effect to hero section
function handleScroll() {
  const hero = document.querySelector(".hero-content")
  if (hero) {
    const scrolled = window.scrollY
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
    hero.style.opacity = String(1 - scrolled / 600)
  }
}

window.addEventListener("scroll", handleScroll)
