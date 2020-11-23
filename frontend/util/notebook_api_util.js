export const fetchNotebooks = () => (
    $.ajax({
        method: 'GET',
        url: 'api/notebooks'
    })
)
export const fetchNotebook = notebookId => (
    $.ajax({
        method: 'GET',
        url: `api/notes/${notebookId}`,
    })
)
export const createNotebook = notebook => (
    $.ajax({
        method: 'POST',
        url: 'api/notebooks',
        data: {notebook}
    })
)
export const updateNotebook = (notebook) => ( 
    $.ajax({
        method: 'PATCH',
        url: `api/notebooks/${notebook.id}`,
        data: {notebook}
    })
)
export const deleteNote = noteId => (
    $.ajax({
        method: 'DELETE',
        url: `api/notebooks/${noteId}`,
    })
)