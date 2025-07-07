class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :chat_users, dependent: :destroy
  has_many :chats, through: :chat_users
  has_many :messages, dependent: :destroy

  def chat_with(other_user)
    Chat.joins(:chat_users)
        .group('chats.id')
        .having('COUNT(chat_users.user_id) = 2')
        .where(chat_users: { user_id: [self.id, other_user.id] })
        .detect { |c| c.users.sort_by(&:id) == [self, other_user].sort_by(&:id) }
  end

  def chat_exists_with?(other_user)
    !!chat_with(other_user)
  end
end
