import {Button, Card} from "react-bootstrap";
import React from "react";
import CardHeader from "react-bootstrap/CardHeader";

export default function Note(props) {
   const {id, title, description, deleteNote} = props ;
   return <Card>
       <CardHeader>
           {title}
           <Button
               size={"sm"}
               className={"btn-close"}
               onClick={ () => deleteNote(id)}
           />
       </CardHeader>
       {description}
   </Card>
}