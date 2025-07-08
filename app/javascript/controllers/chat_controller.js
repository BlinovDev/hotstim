import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static values = {
        currentUserId: Number
    }

    connect() {
        this.alignAllMessages()
        this.scrollToBottom()
        this.observeNewMessages()
    }

    alignAllMessages() {
        const currentUserId = this.currentUserIdValue
        const messages = this.element.querySelectorAll(".chat-message")
        messages.forEach(message => this.alignMessage(message, currentUserId))
    }

    alignMessage(message, currentUserId) {
        const senderId = parseInt(message.dataset.userId, 10)
        const isMine = senderId === currentUserId

        message.classList.add("d-flex")
        message.classList.remove("justify-content-start", "justify-content-end")
        message.classList.add(`justify-content-${isMine ? "end" : "start"}`)

        const bubble = message.querySelector(".message-bubble")
        if (!bubble) return

        bubble.classList.remove("bg-light", "bg-primary", "text-white", "text-dark")

        if (isMine) {
            bubble.classList.add("bg-primary", "text-white")
        } else {
            bubble.classList.add("bg-light", "text-dark")
        }
    }

    observeNewMessages() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList.contains("chat-message")) {
                        this.alignMessage(node, this.currentUserIdValue)
                        this.scrollToBottom()
                    }
                })
            })
        })

        observer.observe(this.element, { childList: true })
    }

    scrollToBottom() {
        this.element.scrollTop = this.element.scrollHeight
    }
}
