class Note < ApplicationRecord
    include ActionView::Helpers::DateHelper
    validates :title, presence: true
    validates :body, presence: true
    validates :user_id, presence: true
    validates :notebook_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    def time_ago_created
        time_ago_in_words(self.created_at)
    end
    def time_ago_updated
        time_ago_in_words(self.updated_at)
    end

end