import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import CardHeader from "react-bootstrap/CardHeader";
import SimpleForm from "../Forms/SimpleForm";


const editIconSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-pen" viewBox="0 0 16 16">
    <path
        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>


export default function Note(props) {
    const {id, title, description, deleteNote, editNote} = props;
    const [isEditing, setIsEditing] = useState(false)
    const toggleIsEdit = () => setIsEditing(!isEditing);
    const editIcon = <div onClick={() => {
        console.log("want to edit?")
        console.log("edit before status", isEditing)
        toggleIsEdit()
        console.log("edit after status", isEditing)
    }
    }>
        {editIconSvg}
    </div>

    return <Card className={"d-flex justify-content-between"}>
        <CardHeader className={"d-flex justify-content-between"}>
            {editIcon}
            Title: {title}
            <Button
                size={"sm"}
                className={"btn-close right-align"}
                onClick={() => {
                    deleteNote(id)
                }}
            />
        </CardHeader>

        {isEditing
            ? <SimpleForm
                submitHandler={editNote}
                currentTitle={title}
                currentDescription={description}
                noteId={id}/>
            : description
        }
    </Card>

}