import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";


let tagData = document.createElement("div")
tagData.id = "tag-data"
document.body.appendChild(tagData)
let locationTag = window.location

if (locationTag.href == "http://localhost:8080/") {
    ReactDOM.render(<App />, document.getElementById("tag-data"));
} else {
    ReactDOM.render(<App />, document.getElementById('tag-data'));
}
