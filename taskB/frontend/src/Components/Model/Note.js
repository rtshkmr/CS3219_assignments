import {Card} from "react-bootstrap";
import React from "react";
import CardHeader from "react-bootstrap/CardHeader";

export default function Note(props) {
   const {name, description} = props ;
   return <Card>
       <CardHeader>
           {name}
       </CardHeader>
       {description}
   </Card>
}