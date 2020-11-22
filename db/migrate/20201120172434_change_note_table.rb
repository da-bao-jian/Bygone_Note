class ChangeNoteTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :notes, :note_book_id
    remove_column :notes, :body

    add_column :notes, :notebook_id, :integer, null:false
    add_column :notes, :body, :string, null:false
  end
end
