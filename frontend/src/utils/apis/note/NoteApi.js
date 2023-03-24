import instance from "../../axios/axios";

export const getNote = (userId) => instance.get(`/note?userId=${userId}`)
export const addNote = () => instance.post(`/note`)
export const updateNote = (userId, data) => {
    console.log(data, userId)
    return instance.put(`/note?userId=${userId}`, { title: data })
}
export const addNoteItem = (userId, note) => instance.post(`/note/newNoteItem?userId=${userId}`, {
    note
})
export const deleteNoteItemApi = (userId, noteText) => instance.post(`/note/delete_note_text?userId=${userId}`, {
    note: noteText
})
