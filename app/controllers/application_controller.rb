class ApplicationController < ActionController::Base
    # debugger
    skip_before_action :verify_authenticity_token
    def current_user
        # debugger
        return nil unless session[:session_token]
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    
    def login(user)
        user.reset_session_token! 
        session[:session_token] = user.session_token
        # @current_user = user
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def loggedin?
        !!current_user
    end
end
