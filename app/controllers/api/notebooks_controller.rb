class Api::NotebooksController < ApplicationController
    def index
        @notebooks = Notebook.all.where(user_id: current_user.id).sort_by{|notebook| notebook.title}
        render :index
    end

    def show
        @notebook = Notebook.find(params[:id])
        render :show 
    end

    def create
        @notebook = Notebook.new(notebook_params)
        @notebook.user_id = current_user.id
        # debugger 
        if @notebook.save
            render :show
        else  
            render json: @notebook.errors.full_messages, status: 422
        end
    end

    def update
        @notebook = Notebook.find_by(id: params[:id])
        if @notebook.update(notebook_params)
            render :show 
        else  
            render json: @notebook.errors.full_messages, status: 422
        end
    end

    def destroy 
        @notebook = Notebook.find_by(id: params[:id])
        # debugger
        if @notebook.destroy
            render :show 
        else  
            render json: @notebook.errors.full_messages, status: 422
        end
    end

    private 
    def notebook_params
        params.require(:notebook).permit(:title, :user_id) 
    end


end