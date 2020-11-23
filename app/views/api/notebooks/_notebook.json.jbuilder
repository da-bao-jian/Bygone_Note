json.extract! notebook, :id, :title, :user_id, :created_at, :updated_at
json.note do 
    json.array! notebook.notes.ids
    #setting an array of notes that has a top level key 'note'
end