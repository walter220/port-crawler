import React, { PureComponent } from 'react';
import XHRHostScanner from './XHRHostScanner';

class HostCrawler extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hosts: ['0.0.0.0', '127.0.0.1', 'localhost'],
            protocol: 'http://',
            port: 3000,
            path: '/',
        };
        this._addHostRef = React.createRef();
    }

    handleProtocolChange = (e) => {
        const { value } = e.target;
        this.setState({ protocol: value });
    };

    handlePortChange = (e) => {
        const { value } = e.target;
        this.setState({ port: value });
    };

    handlePathChange = (e) => {
        const { value } = e.target;
        this.setState({ path: value });
    };

    addHost = () => {
        this.setState(
            { hosts: [...this.state.hosts, this._addHostRef.current.value] },
            () => {
                this._addHostRef.current.value = '';
            },
        );
    };

    removeHost = (host) => {
        const { hosts } = this.state;
        this.setState({
            hosts: hosts.filter((item) => item !== host),
        });
    };

    render() {
        const { hosts, protocol, port, path } = this.state;

        return (
            <>
                <div className="row mb-3 form-group">
                    <div className="col-12">
                        <h2>Host crawler - Settings</h2>
                    </div>
                </div>

                <div className="row mb-3 form-group">
                    <div className="col-sm-6">
                        <h5>Hosts</h5>
                        <ul className="list-group mb-4">
                            {hosts.map((host) => (
                                <li
                                    key={host}
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    {host}
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => this.removeHost(host)}>
                                        <i className="fa fa-trash" />
                                    </button>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <input
                                    type="text"
                                    name="url"
                                    className="form-control mr-3"
                                    ref={this._addHostRef}
                                />
                                <button
                                    className="btn btn-success"
                                    onClick={this.addHost}>
                                    <i className="fa fa-plus" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="start">Protocol:</label>
                            <input
                                type="text"
                                name="protocol"
                                className="form-control"
                                value={protocol}
                                onChange={this.handleProtocolChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start">Port:</label>
                            <input
                                type="number"
                                name="port"
                                className="form-control"
                                value={port}
                                onChange={this.handlePortChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start">Path:</label>
                            <input
                                type="text"
                                name="path"
                                className="form-control"
                                value={path}
                                onChange={this.handlePathChange}
                            />
                        </div>
                        <p>
                            Example:&nbsp;
                            <pre className="d-inline">
                                {protocol + hosts[0] + ':' + port + path}
                            </pre>
                        </p>
                    </div>
                </div>

                <hr />

                <XHRHostScanner {...this.state} />
            </>
        );
    }
}

export default HostCrawler;
