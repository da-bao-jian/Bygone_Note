class Api::NotesController < ApplicationController
    def index
        @notes = Note.all.where(user_id: current_user.id)
        render :index
    end

    def show
        @note = Note.find(params[:id])
        render :show 
    end

    def create
        @note = Note.new(note_params)
        @note.user_id = current_user.id
        if @note.save
            render :show
        else  
            render json: @note.errors.full_messages, status: 422
        end
    end

    def update
        @note = Note.find_by(id: params[:id])
        if @note.update(note_params)
            render :show 
        else  
            render json: @note.errors.full_messages, status: 422
        end
    end

    def destroy 
        @note = Note.find_by(id: params[:id])
        # debugger
        if @note.destroy
            render :show 
        else  
            render json: @note.errors.full_messages, status: 422
        end
    end

    private 
    def note_params
        params.require(:note).permit(:title, :body, :notebook_id) 
        #no :user_id since when create a new note :user_id will be assigned to current_user.id
    end

end