import React, { PureComponent } from 'react';
import axios from 'axios';

class XHRPortScanner extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ports: [],
            logs: [],
            isScanningFinished: false,
        };
    }

    onClick = () => {
        this.setState(
            {
                logs: [],
                ports: [],
                isScanningFinished: false,
            },
            () => this._handlePortSearch(),
        );
    };

    _handlePortSearch = () => {
        const { url, startPort, endPort } = this.props;

        for (let i = startPort; i <= endPort; i++) {
            axios
                .get(`${url}:${i}`)
                .then(() => {
                    const { ports } = this.state;
                    const newPorts = [
                        ...ports,
                        {
                            portNumber: i,
                        },
                    ];
                    this.setState(
                        {
                            ports: newPorts,
                        },
                        this._handleLog(i, 'OK'),
                    );
                })
                .catch(() => {
                    this._handleLog(i, 'ERR');
                })
                .finally(() => {
                    if (i >= endPort) {
                        this.setState({
                            isScanningFinished: true,
                        });
                    }
                });
        }
    };

    _handleLog = (port, result) => {
        const { logs } = this.state;
        let newLogs = [
            ...logs,
            {
                port,
                result,
            },
        ];
        newLogs = newLogs.sort((a, b) =>
            a.port > b.port ? 1 : b.port > a.port ? -1 : 0,
        );
        this.setState({ logs: newLogs });
    };

    render() {
        const { ports, logs, isScanningFinished } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>XHR Port Scanner</h3>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <button className="btn btn-dark" onClick={this.onClick}>
                            Start port scanning
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <strong>Results</strong>

                        <ul>
                            {ports.map(({ portNumber }) => (
                                <li key={portNumber}>{portNumber}</li>
                            ))}
                        </ul>

                        {isScanningFinished &&
                            (ports.length === 0 ? (
                                <div className="alert alert-dark" role="alert">
                                    Nothing found :(
                                </div>
                            ) : (
                                <div
                                    className="alert alert-success"
                                    role="alert">
                                    Done, found {ports.length} port
                                    {ports.length > 1 && 's'}.
                                </div>
                            ))}
                    </div>
                    <div className="col-12 col-sm-6">
                        <strong>Logs</strong>
                        <table>
                            <thead>
                                <tr>
                                    <th>Port</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(({ port, result }) => (
                                    <tr key={port}>
                                        <td>
                                            <pre>{port}</pre>
                                        </td>
                                        <td>
                                            <pre>{result}</pre>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default XHRPortScanner;
