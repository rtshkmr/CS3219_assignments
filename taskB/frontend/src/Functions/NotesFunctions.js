/*
* Fetches all notes from the backend api
* */
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL
const endpoint = baseUrl + "/api/notes"

export function fetchExistingNotes() {
    return axios.get(endpoint)
        .then( response => {
            console.log(response.data.data)
            return response.data.data
        })
        .catch((err) => {
            console.log("there was a data fetching error :(", err)
            return []
        })
}

export function postNote(note) {
    console.log("... posting note:", note)
    return axios.post(endpoint, note)
        .then( response => {
            console.log("postedd... this is the response", response.data.data)
            return response.data.data
        })
        .catch((err) => {
            console.log("there was a data posting error :(", err)
            return []
        })
}


export function deleteNote(id) {
    console.log("...deleting note with id:", id);
    const deleteEndpoint = endpoint + "/" + id
    return axios.delete(deleteEndpoint)
        .then( response => {
            console.log("deleted " + id + " ... this is the response", response.data.data)
        })
        .catch((err) => {
            console.log("there was a data posting error :(", err)
        })
}