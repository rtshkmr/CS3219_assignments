/*
* Fetches all notes from the backend api
* */
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL
const notesGetEndpoint = baseUrl + "/api/notes"
export default function fetchExistingNotes() {
    return axios.get(notesGetEndpoint)
        .then( response => {
            console.log(response.data.data)
            return response.data.data
        })
        .catch((err) => {
            console.log("there was a data fetching error :(", err)
            return []
        })
}
