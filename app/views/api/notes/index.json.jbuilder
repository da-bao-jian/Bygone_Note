@notes.each do |note|
    json.set! note.id do 
        json.extract! note, :id, :title, :body, :notebook_id, :user_id, :created_at, :updated_at
    end 
end