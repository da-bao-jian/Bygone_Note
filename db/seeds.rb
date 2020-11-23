# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
demo_user = User.create!([{email: 'demo@gmail.com', password: '123456'}])
demo_first_notebook = Notebook.create!([{title: 'My First Notebook', user_id: demo_user[0].id}])
demo_user[0].first_notebook_id=demo_first_notebook[0].id
demo_user[0].save
