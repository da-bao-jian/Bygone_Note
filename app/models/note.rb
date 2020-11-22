class Note < ApplicationRecord
    include ActionView::Helpers::DateHelper
    validates :title, presence: true
    validates :body, presence: true
    validates :user_id, presence: true
    validates :notebook_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    def time_ago
        time_ago_in_words(self.created_at)
    end

end