class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.string :body
      t.integer :note_book_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :notes, :title
    add_index :notes, :body
  end
end
