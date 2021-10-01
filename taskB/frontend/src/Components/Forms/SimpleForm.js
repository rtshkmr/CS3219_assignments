import React, {useState} from 'react';
import {Form, Container, Button} from "react-bootstrap";

function SimpleForm (props) {
    const {addNote} = props
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    return (
        <Container>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>write ur note down.</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="name plz"
                        onChange={e => {
                           console.log("name change", e.target.value)
                            setTitle(e.target.value)
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formNote">
                    <Form.Control
                        type="textarea"
                        placeholder="your note plz"
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
                        if(!(title === "" || description === "")) {
                            console.log("non-empty values to submit")
                            const note = {
                                "title": title,
                                "description": description
                            }
                            addNote(note)
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