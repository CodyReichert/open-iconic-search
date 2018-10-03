// @flow

import React, { Component } from "react"
import { ChromePicker } from "react-color"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type IconContext = {
    src: string,
    name: string,
}

type AppState = {
    search: string,
    color: string,
}

export default class App extends Component<*, AppState> {
    state = {
        search: "",
        color: "#6610f2",
    }

    handleSearchChange = (e: SyntheticInputEvent<*>) =>
        this.setState({
            search: e.target.value,
        })

    handleColorChange = (color: string) => this.setState({ color })

    handleClearSearch = () => this.setState({ search: "" })

    render() {
        const icons = loadIcons().filter(
            icon =>
                this.state.search
                    ? icon.name.toLowerCase().includes(this.state.search.toLowerCase())
                    : true
        )

        return (
            <div>
                <ToastContainer />
                <div className="fixed-top">
                    <div className="bg-primary">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 py-2">
                                    <p className="text-white my-1">
                                        <i className="oi oi-magnifying-glass mr-2" />
                                        <strong>Open Iconic Search</strong>
                                        <small className="text-light pl-2">
                                            <i>Find your icon hotness</i>
                                        </small>
                                    </p>
                                </div>
                                <div className="col-sm-6 text-sm-right py-2">
                                    <p className="text-white my-1">
                                        <small>
                                            <a
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                className="text-white"
                                                href="https://useiconic.com/open">
                                                Use Iconic
                                            </a>{" "}
                                            &middot;{" "}
                                            <a
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                className="text-white"
                                                href="https://github.com/CodyReichert/open-iconic-search">
                                                GitHub
                                            </a>{" "}
                                            &middot;{" "}
                                            <a
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                className="text-white"
                                                href="https://github.com/CodyReichert/open-iconic-search">
                                                @CodyReichert
                                            </a>
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light" style={{ borderBottom: "solid 1px #ddd" }}>
                        <div className="container py-4">
                            <div className="row">
                                <div className="col-7">
                                    <input
                                        name="iconName"
                                        type="text"
                                        value={this.state.search}
                                        onChange={this.handleSearchChange}
                                        className="form-control"
                                        placeholder="Search icons by name..."
                                    />
                                </div>
                                <div className="col-sm-5 text-right">
                                    <IconColorPicker
                                        color={this.state.color}
                                        handleColorChange={this.handleColorChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-3" style={{ paddingTop: 175 }}>
                    <div className="row">
                        <div className="col-sm-6">
                            <h3 className="mb-3">
                                {icons.length} icon
                                {icons.length === 1 ? "" : "s"}
                                <small
                                    className="text-muted ml-2"
                                    style={{ fontSize: 12 }}>
                                    <i>(Click an icon to copy it's name)</i>
                                </small>
                            </h3>
                        </div>
                        <div className="col-sm-6 text-sm-right">
                            {this.state.search ? (
                                <button
                                    onClick={this.handleClearSearch}
                                    className="btn btn-sm btn-outline-secondary">
                                    <i className="oi oi-x mr-2" />
                                    <strong>Clear current search filters</strong>
                                </button>
                            ) : null}
                        </div>
                        {icons.map(icon => (
                            <Icon key={icon.src} icon={icon} color={this.state.color} />
                        ))}
                    </div>
                </div>
                <div className="bg-dark text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 my-3">
                                <small>
                                    Made with{" "}
                                    <i className="oi oi-heart" style={{ color: "red" }} />{" "}
                                    in Texas by{" "}
                                    <a
                                        href="https://twitter.com/CodyReichert"
                                        className="text-light"
                                        target="_blank"
                                        rel="noreferrer noopener">
                                        @CodyReichert
                                    </a>
                                </small>
                            </div>
                            <div className="col-sm-6 my-3 text-right">
                                <small>
                                    <a
                                        rel="noreferrer noopener"
                                        target="_blank"
                                        className="text-white"
                                        href="https://twitter.com/CodyReichert">
                                        Twitter
                                    </a>{" "}
                                    &middot;{" "}
                                    <a
                                        rel="noreferrer noopener"
                                        target="_blank"
                                        className="text-white"
                                        href="https://github.com/CodyReichert">
                                        GitHub
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Icon extends React.Component<{ icon: IconContext, color: string }, *> {
    state = { hovering: false }
    toggleHovering = () => this.setState({ hovering: !this.state.hovering })

    handleCopyToClipboard = () => {
        const el = document.createElement("textarea")
        el.value = this.props.icon.name
        document.body && document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body && document.body.removeChild(el)

        return toast(`Copied '${this.props.icon.name}' to clipboard.`)
    }

    render() {
        const cardStyle = {
            cursor: "pointer",
            boxShadow: this.state.hovering ? `${this.props.color} 0 0 3px` : "none",
        }

        return (
            <div className="col-3">
                <div
                    onMouseEnter={this.toggleHovering}
                    onMouseLeave={this.toggleHovering}
                    style={cardStyle}
                    onClick={this.handleCopyToClipboard}
                    className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <i
                                    className={`oi oi-${this.props.icon.name}`}
                                    style={{
                                        color: this.props.color,
                                        fontSize: 17,
                                    }}
                                />
                            </div>
                            <div className="col-sm-9">
                                <small className="text-muted">
                                    {this.props.icon.name}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

type IconColorPickerProps = {
    color: string,
    handleColorChange: string => void,
}

class IconColorPicker extends React.Component<IconColorPickerProps, *> {
    state = { editing: false }

    toggleEditing = () => this.setState({ editing: !this.state.editing })

    render() {
        return (
            <span>
                <button
                    className="btn btn-sm mt-1"
                    onClick={this.toggleEditing}
                    style={{ color: "white", backgroundColor: this.props.color }}>
                    Icon color
                </button>
                {this.state.editing ? (
                    <ChromePicker
                        color={this.props.color}
                        onChangeComplete={c => this.props.handleColorChange(c.hex)}
                    />
                ) : null}
            </span>
        )
    }
}

function loadIcons() {
    // $FlowExpectError
    const icons_ = require.context("open-iconic/svg", true, /\.svg$/)
    return icons_
        .keys()
        .map(icons_)
        .map(icon => ({
            src: icon,
            name: filenameWithoutExtensions(icon),
        }))
}

/* eslint no-useless-escape: 0 */
function filenameWithoutExtensions(p) {
    return p
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -2)
        .join(".")
}
