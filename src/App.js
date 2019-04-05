import React, { PureComponent } from 'react';
import axios from 'axios';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://localhost',
            startPort: 3001,
            endPort: 3012,
            ports: [],
            logs: [],
            isScanningFinished: false,
        };
    }

    handleUrl = (e) => {
        const newUrl = e.target.value;
        this.setState({ url: newUrl });
    };

    handleStart = (e) => {
        const port = e.target.value;
        const { endPort } = this.state;
        if (port >= endPort) return;
        this.setState({ startPort: port });
    };

    handleEnd = (e) => {
        const port = e.target.value;
        const { startPort } = this.state;
        if (port <= startPort) return;
        this.setState({ endPort: port });
    };

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
        const { url, startPort, endPort } = this.state;

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
        const {
            url,
            startPort,
            endPort,
            ports,
            logs,
            isScanningFinished,
        } = this.state;

        return (
            <>
                <div className="row mb-3 form-group align-items-center">
                    <label htmlFor="start" className="col-md-2">
                        Url:
                    </label>

                    <div className="col-md-7">
                        <input
                            type="text"
                            name="url"
                            className="form-control"
                            value={url}
                            onChange={this.handleUrl}
                        />
                        <small className="ml-2">
                            <i>
                                When changing the url, do not add : on the end
                                ;)
                            </i>
                        </small>
                    </div>
                </div>

                <div className="row mb-3 form-group align-items-center">
                    <label htmlFor="start" className="col-md-2 mb-md-0">
                        Start port:
                    </label>

                    <div className="col-md-2">
                        <input
                            type="number"
                            name="start"
                            className="form-control"
                            value={startPort}
                            onChange={this.handleStart}
                        />
                    </div>

                    <label
                        htmlFor="end"
                        className="col-md-2 offset-md-1 mt-2 mt-md-0 mb-md-0">
                        End port:
                    </label>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="end"
                            className="form-control"
                            value={endPort}
                            onChange={this.handleEnd}
                        />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12">
                        <button className="btn btn-dark" onClick={this.onClick}>
                            Start scanning
                        </button>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 col-sm-6">
                        <h2>Results</h2>

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
                        <h2>Logs</h2>
                        <table>
                            <thead>
                                <th>
                                    <td>Port</td>
                                    <td>Result</td>
                                </th>
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

export default App;
