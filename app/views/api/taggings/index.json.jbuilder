@taggings.each do |tagging|
    json.partial! 'api/taggings/tagging', tagging: tagging
end