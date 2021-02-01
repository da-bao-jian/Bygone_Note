class Api::TagsController < ApplicationController
    def index
        @tags = Tag.all.where(user_id: current_user.id)
        render :index
    end

    def create
        
        @tag = Tag.new(tags_params)
        @tag.user_id = current_user.id
        
        if @tag.save
            render :show
        else
            render json: @tag.errors.full_messages, status: 422
        end
    end 

    def show 
        @tag = current_user.tags.find_by(id: params[:id])
        render :show
    end 

    def update 
        @tag = current_user.tags.find_by(id: params[:id])
        if @tag.update(tags_params) 
            render :show
        else 
            render json: @tag.errors.full_messages, status: 422
        end
    end 

    def destroy 
        @tag = current_user.tags.find_by(id: params[:id])
        if @tag.destroy
            render :show
        else 
            render json: @note.errors.full_messages, status: 422
        end
    end


    private
    def tags_params
        params.require(:tag).permit(:title)
    end
end
