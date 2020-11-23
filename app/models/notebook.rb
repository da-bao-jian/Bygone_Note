class Notebook < ApplicationRecord
    validates :title, presence: true
    validates :user_id, presence: true

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    has_many :notes,
    foreign_key: :notebook_id,
    class_name: :Note,
    dependent: :destroy

    def time_ago_updated
        time_ago_in_words(self.updated_at)
    end

end