import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = {
        currentUserId: Number
    }

    connect() {
        this.alignMessages()
    }

    alignMessages() {
        const currentUserId = parseInt(this.currentUserIdValue)
        const messages = this.element.querySelectorAll(".chat-message")

        messages.forEach(message => {
            const senderId = parseInt(message.dataset.userId)
            const isMine = senderId === currentUserId

            // Debug (можно потом убрать):
            console.log(`sender: ${senderId}, me: ${currentUserId}, isMine: ${isMine}`)

            message.classList.add("d-flex", "justify-content-" + (isMine ? "end" : "start"))

            const bubble = message.querySelector("div")
            bubble.classList.remove("bg-light", "bg-primary", "text-white", "text-dark")

            if (isMine) {
                bubble.classList.add("bg-primary", "text-white")
            } else {
                bubble.classList.add("bg-light", "text-dark")
            }
        })
    }
}
