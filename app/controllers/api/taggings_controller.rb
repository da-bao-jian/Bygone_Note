class Api::TaggingsController < ApplicationController
    def index 
        @current_tags = []
        @taggings = []
        Tag.all.each do |tag|
            if tag.user_id == current_user.id
                @current_tags.push(tag.id)
            end
        end
        Tagging.all.each do |tagging|
            if @current_tags.include? (tagging.tag_id)
                @taggings.push(tagging)
            end
        end
        
        render :index
    end

    def create 
        tagging_params[:note_id] = tagging_params[:note_id].to_i 
        tagging_params[:tag_id] = tagging_params[:tag_id].to_i 
        @tagging = Tagging.new(tagging_params)
        if @tagging.save
            render :show 
        else 
            render json: @tagging.errors.full_messages, status: 422
        end
    end 

    def destroy 
        params[:note_id] = params[:note_id].to_i 
        @tagging = Tagging.find_by(tag_id: params[:id], note_id: params[:note_id])
        if @tagging.destroy
            render :show
        else
            render json: {error: "Tagging not found"}
        end    
    end 

    private
    def tagging_params
        params.require(:taggings).permit(:note_id, :tag_id)
    end
end