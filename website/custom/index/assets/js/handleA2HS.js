let deferredPrompt

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the infobar from appearing and stash
  event.preventDefault()
  deferredPrompt = event
})

const ctaButtons = document.querySelectorAll("button[data-cta]")

ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //     if (deferredPrompt && button.dataset.cta === "/waiting") {
    //       deferredPrompt.prompt()
    //       // Wait for the user to respond to the prompt
    //       deferredPrompt.userChoice.then((choice) => {
    //         if (choice.outcome === "accepted") {
    //           console.log("User accepted the A2HS prompt")
    //         } else {
    //           console.log("User dismissed the A2HS prompt")
    //         }
    //         // Clear the saved prompt since it can't be used again
    //         deferredPrompt = null
    //       })
    //       return
    //     }

    window.open(button.dataset.cta)
  })
})
