import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["form", "textarea"]

    submitWithEnter(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            this.element.requestSubmit()
        }
    }

    clearAndFocus(event) {
        if (event.detail.success) {
            const textarea = this.textareaTarget
            textarea.value = ""
            textarea.focus()

            // Trigger auto-grow if used
            textarea.style.height = "auto"
        }
    }
}
