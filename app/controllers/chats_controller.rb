class ChatsController < ApplicationController
  before_action :authenticate_user!

  def create
    other_user = User.find(params[:user_id])

    chat = Chat.joins(:chat_users)
               .group('chats.id')
               .having('COUNT(chat_users.user_id) = 2')
               .where(chat_users: { user_id: [ current_user.id, other_user.id ] })
               .detect { |c| c.users.sort_by(&:id) == [ current_user, other_user ].sort_by(&:id) }

    unless chat
      chat = Chat.create!
      chat.users << current_user
      chat.users << other_user
    end

    redirect_to chat_path(chat)
  end

  def show
    @chat = Chat.find(params[:id])

    # TODO: move to before_action
    unless @chat.users.include?(current_user)
      redirect_to users_path, alert: "You are not a participant of this chat"
      return
    end

    @message = Message.new
    @messages = @chat.messages.includes(:user).order(:created_at)
  end
end

