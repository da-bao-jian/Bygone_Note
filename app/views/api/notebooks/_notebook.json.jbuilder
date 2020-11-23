json.extract! notebook, :id, :title, :user_id, :created_at, :updated_at
json.notes do 
    json.array! notebook.notes#.ids
    #setting an array of notes that has a top level key 'note'
end

#when creating new notes, no need to use nested route
#only specify the foreign_key


#state shape:
    # [4] pry(main)> Notebook.all[0].notes
    # #   Notebook Load (1.3ms)  SELECT "notebooks".* FROM "notebooks"
    # #   Note Load (3.0ms)  SELECT "notes".* FROM "notes" WHERE "notes"."notebook_id" = $1  [["notebook_id", 1]]
    # [<Note:0x00007f9f1fa3b680
    #  id: 60,
    #  id: 63,
    #  title: "good day",
    #  user_id: 8,
    #  created_at: Mon, 23 Nov 2020 20:01:04 UTC +00:00,
    #  updated_at: Mon, 23 Nov 2020 20:01:04 UTC +00:00,
    #  notebook_id: 1,
    #  body: "with wild card">,
    # #<Note:0x00007f9f1fa39588
    #  id: 64,
    #  title: "good day",
    #  user_id: 8,
    #  created_at: Mon, 23 Nov 2020 20:01:29 UTC +00:00,
    #  updated_at: Mon, 23 Nov 2020 20:01:29 UTC +00:00,
    #  notebook_id: 1,
    #  body: "without wild card">]