class Add < ActiveRecord::Migration[5.2]
  def change
    add_index :notes, [:body]
  end
end
