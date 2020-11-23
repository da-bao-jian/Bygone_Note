json.extract! @note, :id, :title, :body, :notebook_id, :user_id, :created_at, :updated_at
json.time_ago_created @note.time_ago_created
json.time_ago_updated @note.time_ago_updated