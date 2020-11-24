json.extract! notebook, :id, :title, :user_id, :created_at, :updated_at
json.updated_in_word notebook.time_ago_updated
json.notes do 
    json.array! notebook.notes
    #setting an array of notes that has a top level key 'note'
end

#when creating new notes, no need to use nested route
#only specify the foreign_key


#state shape:
    # 0:
        # created_at: "2020-11-23T21:06:37.279Z"
        # id: 8
        # notes: Array(2)
            # 0: {id: 84, title: "Untitled", user_id: 22, created_at: "2020-11-24T03:05:54.597Z", updated_at: "2020-11-24T03:05:54.597Z", …}
            # 1: {id: 85, title: "Untitled", user_id: 22, created_at: "2020-11-24T03:05:56.928Z", updated_at: "2020-11-24T03:05:56.928Z", …}
        # length: 2
        # __proto__: Array(0)
        # title: "My First Notebook"
        # updated_at: "2020-11-23T21:06:37.279Z"
        # user_id: 22