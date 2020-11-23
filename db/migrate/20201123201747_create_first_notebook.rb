class CreateFirstNotebook < ActiveRecord::Migration[5.2]
  def change
    create_table :first_notebooks do |t|
      add_column :users, :first_notebook_id, :integer
    end
  end
end
