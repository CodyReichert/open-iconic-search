// @flow

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

const root = document.getElementById("root")

if (root) {
    ReactDOM.render(<App />, root)
} else {
    throw new Error("Could not find `root` element to mount <App />")
}
