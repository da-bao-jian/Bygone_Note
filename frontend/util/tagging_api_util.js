// export const fetchTags = () => (
//     $.ajax({
//         method: 'GET',
//         url: 'api/tags'
//     })
// )
// export const fetchTagging = taggingId => (
//     $.ajax({
//         method: 'GET',
//         url: `api/taggings/${taggingId}`,
//     })
// )
export const createTagging = (tagId, noteId) => (
    $.ajax({
        method: 'POST',
        url: 'api/taggings',
        data: {tag_id: tagId, note_id: noteId}
    })
)

export const deleteTagging = (tagging) => (
    $.ajax({
        method: 'DELETE',
        url: `api/taggings/${tagging.id}`,
        // data: {tag_id: tagId, note_id: noteId}
    })
)