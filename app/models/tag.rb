class Tag < ApplicationRecord
    validates :title, presence: true

    has_many :taggings,
    foreign_key: :tag_id,
    class_name: :Tagging,
    dependent: :destroy

    has_many :notes,
    through: :taggings,
    source: :note 

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end