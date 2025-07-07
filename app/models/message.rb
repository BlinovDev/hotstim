class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :user

  validates :body, presence: true

  after_create_commit -> {
    broadcast_append_to "chat_#{chat.id}",
                        target: "messages",
                        partial: "messages/message",
                        locals: { message: self }
  }
end
