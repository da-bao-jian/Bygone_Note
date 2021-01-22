class Tagging < ApplicationRecord
    validates :tag_id, :note_id, presence: true
    validates :tag_id, uniqueness: { scope: :note_id }

    belongs_to :tag,
    foreign_key: :tag_id,
    class_name: :Tag

    belongs_to :note,
    foreign_key: :note_id,
    class_name: :Note
    
end