class Note < ApplicationRecord
    include ActionView::Helpers::DateHelper
    validates :title, presence: true
    validates :body, presence: true
    validates :user_id, presence: true
    validates :notebook_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
    
    belongs_to :notebook,
    foreign_key: :notebook_id,
    class_name: :Notebook

    has_many :taggings, 
    foreign_key: :note_id,
    class_name: :Tagging,
    dependent: :destroy

    has_many :tags, 
    through: :taggings,
    source: :tag

    def time_ago_created
        time_ago_in_words(self.created_at)
    end
    def time_ago_updated
        time_ago_in_words(self.updated_at)
    end

end