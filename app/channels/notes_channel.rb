class NotesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stop_all_streams
    stream_for = Note.find_by(id: params['id'])
  end

  def receive(data)
    # debugger
    @note = Note.find_by(id: data['id'])
    @note.update(data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams

  end
end
