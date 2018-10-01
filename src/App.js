// @flow

import React, { Component } from "react"

type IconContext = {
    src: string,
    name: string,
}

type AppState = {
    search: string,
}

export default class App extends Component<*, AppState> {
    state = {
        search: "",
    }

    handleSearchChange = (e: SyntheticInputEvent<*>) =>
        this.setState({
            search: e.target.value,
        })

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
                <div className="fixed-top">
                    <div className="bg-primary">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 py-2">
                                    <p className="text-white my-1">
                                        <i className="oi oi-magnifying-glass mr-2" />
                                        OpenIconic Search Tool
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
                    <div className="bg-light">
                        <div className="container py-4">
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-row">
                                        <input
                                            name="iconName"
                                            type="text"
                                            value={this.state.search}
                                            onChange={this.handleSearchChange}
                                            className="form-control"
                                            placeholder="Search icons by name..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ paddingTop: 175 }}>
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
                            <Icon key={icon.src} icon={icon} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

class Icon extends React.Component<{ icon: IconContext }, *> {
    state = { hovering: false }
    toggleHovering = () => this.setState({ hovering: !this.state.hovering })

    handleCopyToClipboard = () => {
        const el = document.createElement("textarea")
        el.value = this.props.icon.name
        document.body && document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body && document.body.removeChild(el)

        return this.setState(
            {
                copied: true,
            },
            () =>
                setTimeout(
                    () =>
                        this.setState({
                            copied: false,
                        }),
                    3000
                )
        )
    }

    render() {
        const cardStyle = {
            cursor: "pointer",
            boxShadow: this.state.hovering ? "#eee 0 0 3px" : "none",
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
                                <img
                                    width="15"
                                    alt={this.props.icon.name}
                                    src={this.props.icon.src}
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
