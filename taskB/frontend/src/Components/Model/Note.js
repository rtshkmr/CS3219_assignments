import {Card} from "react-bootstrap";
import React from "react";
import CardHeader from "react-bootstrap/CardHeader";

export default function Note(props) {
   const {title, description} = props ;
   return <Card>
       <CardHeader>
           {title}
       </CardHeader>
       {description}
   </Card>
}