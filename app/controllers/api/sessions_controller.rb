class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user.nil?
            render json: ['Nope. wrong email/password combination!'], status: 422
        else  
            login(@user)
            render 'api/users/show'
        end
    end


    def destroy
        @user = current_user
        if @user
            logout! 
            render json: {} 
        else  
            render json: ['no current user'], status: 404
        end
    end

end
