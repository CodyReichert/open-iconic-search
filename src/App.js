// @flow

import React, { Component } from "react"

const icons_ = require.context("open-iconic/svg", true, /\.svg$/)
const icons = icons_
    .keys()
    .map(icons_)
    .map(icon => ({
        src: icon,
        name: filenameWithoutExtensions(icon),
    }))

console.log(icons)

export default class App extends Component {
    render() {
        return (
            <div>
                <header className="text-center">
                    <i className="oi oi-person" />
                    <h1>OpenIconic Search</h1>
                </header>
                <div className="container">
                    <div className="row">
                        {icons.map(({ src, name }) => (
                            <div className="col-3 text-center" style={{ padding: 20 }}>
                                <img width="45" alt={name} src={src} />
                                <br />
                                <small className="text-muted">{name}</small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

/* eslint no-useless-escape: 0 */
function filenameWithoutExtensions(p) {
    return p
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -2)
        .join(".")
}
