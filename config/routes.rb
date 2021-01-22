Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
  # receiving clients connections
  
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :notes, only: [:index, :show, :create, :update, :destroy]
    resources :notebooks, only: [:index, :show, :create, :update, :destroy] do 
      resources :notes, only: [:index, :create]
    end 
    resources :tags, only: [:index, :show, :create, :update, :destroy]
    resources :taggings, only: [:create, :destroy]

  end
end
