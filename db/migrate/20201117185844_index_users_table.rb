class IndexUsersTable < ActiveRecord::Migration[5.2]
  def change
    add_index :users, [:email, :session_token], unique: true
    add_index :users, :password_digest
  end
end
