class Api::TaggingsController < ApplicationController

    # def index 
    #     @taggings = Tagging.all
    # end


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
        @tagging = Tagging.find_by(tag_id: params[:id])
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