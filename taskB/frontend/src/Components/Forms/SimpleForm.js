import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";

function SimpleForm(props) {
    const {noteId, currentTitle, currentDescription, submitHandler} = props
    const [title, setTitle] = useState(currentTitle)
    const [description, setDescription] = useState(currentDescription)
    return (
        <Container>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>
                        {(!currentTitle || !currentDescription) ? "write ur new note down." : " edit your note"
                        }


                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={
                            title ? "previous title: \n" + title
                                : "Enter title"

                        }
                        onChange={e => {
                            console.log("name change", e.target.value)
                            setTitle(e.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formNote">
                    <Form.Control
                        type="textarea"
                        placeholder={description ? "previous description: \n" + description
                            : "Enter description"}
                        onChange={e => {
                            console.log("note change", e.target.value)
                            setDescription(e.target.value)
                        }}
                    />
                </Form.Group>
                <Button
                    variant="outline-danger"
                    type="reset"
                    onClick={(e) => {
                        console.log("pressed submit, here's the event", e)
                        if (!(title === "" || description === "")) {
                            console.log("non-empty values to submit")
                            const note = {
                                "_id": noteId,
                                "title": title,
                                "description": description
                            }
                            submitHandler(note)
                        }
                    }}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );

}

export default SimpleForm;