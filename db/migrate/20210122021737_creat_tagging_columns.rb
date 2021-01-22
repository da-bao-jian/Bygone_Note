class CreatTaggingColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :taggings, :note_id, :integer, null:false
    add_column :taggings, :tag_id, :integer, null:false

    add_timestamps(:taggings)

    add_index :taggings, [:note_id]
    add_index :taggings, [:tag_id]

  end
end
