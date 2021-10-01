/*
* Posts a note to the backend api
* */
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL
const notesPostEndpoint = baseUrl + "/api/notes"
export default function postNote(note) {
    let note_ = {
        title: "myDummyTitle",
        description:"myDummyDescription"
    }
    console.log("... posting note:", note)
    return axios.post(notesPostEndpoint, note)
        .then( response => {
            console.log("postedd... this is the response", response.data.data)
            return response.data.data
        })
        .catch((err) => {
            console.log("there was a data posting error :(", err)
            return []
        })
}
