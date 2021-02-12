
export const fetchTaggings = () => (
    
    $.ajax({
        method: 'GET',
        url: 'api/taggings',
    })
)
export const createTagging = (tagId, noteId) => (
    $.ajax({
        method: 'POST',
        url: 'api/taggings',
        data: {taggings:{tag_id: tagId, note_id: noteId}}
    })
)

export const deleteTagging = (tagId, noteId) => (
    $.ajax({
        method: 'DELETE',
        url: `api/taggings/${tagId.id}`,
        data: {note_id: noteId}
    })
)