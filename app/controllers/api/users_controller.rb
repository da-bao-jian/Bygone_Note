class Api::UsersController < ApplicationController

    
    def create
        @user = User.new(user_params)
        if @user.save
            default_notebook = Notebook.create!(title: 'My First Notebook', user_id: @user.id)
            #do not allow user to delete defualt note
            @user.first_notebook_id = default_notebook.id
            @user.save
            login(@user)
            render :show
        else 
          render json: @user.errors.full_messages, status: 422
        end
    end
    
    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end