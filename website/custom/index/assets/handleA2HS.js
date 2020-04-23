let deferredPrompt

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the infobar from appearing and stash
  event.preventDefault()
  deferredPrompt = event
})

const ctaButtons = document.querySelectorAll("button[data-cta]")

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (deferredPrompt && button.dataset.cta === "/waiting") {
      deferredPrompt.prompt()
      deferredPrompt = undefined
      return
    }

    window.open(button.dataset.cta)
  })
})
