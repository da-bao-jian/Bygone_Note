json.extract! @note, :id, :title, :body, :notebook_id, :user_id, :created_at, :updated_at
json.time_ago @note.time_ago