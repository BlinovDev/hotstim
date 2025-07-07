class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_chat

  def create
    @message = @chat.messages.new(message_params)
    @message.user = current_user

    if @message.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to chat_path(@chat) }
      end
    else
      # TODO: handle validation errors
      redirect_to chat_path(@chat), alert: "Message could not be sent."
    end
  end

  private

  def set_chat
    @chat = Chat.find(params[:chat_id])
    unless @chat.users.include?(current_user)
      redirect_to users_path, alert: "Access denied."
    end
  end

  def message_params
    params.require(:message).permit(:body)
  end
end
