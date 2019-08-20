import React, { PureComponent } from 'react';
import axios from 'axios';

class XHRHostScanner extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            logs: [],
            isScanningFinished: false,
        };
    }

    onClick = () => {
        console.log('clicked');
        this.setState(
            {
                result: [],
                logs: [],
                isScanningFinished: false,
            },
            () => this._handleHostSearch(),
        );
    };

    _handleHostSearch = () => {
        const { hosts, protocol, port, path } = this.props;
        console.log('hosts', hosts);

        hosts.map((host, i) => {
            const url = `${protocol}${host}:${port}${path}`;
            axios
                .get(url)
                .then(() => {
                    const { results } = this.state;
                    this.setState(
                        {
                            results: [...results],
                        },
                        this._handleLog(url, 'OK'),
                    );
                })
                .catch(() => {
                    this._handleLog(url, 'ERR');
                })
                .finally(() => {
                    console.log(i, hosts.length);
                    if (i >= hosts.length) {
                        this.setState({
                            isScanningFinished: true,
                        });
                    }
                });
        });
    };

    _handleLog = (url, result) => {
        const { logs } = this.state;
        this.setState({
            logs: [
                ...logs,
                {
                    url,
                    result,
                },
            ],
        });
    };

    render() {
        const { results, logs, isScanningFinished } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-sm-6">
                        <h3>XHR host Scanner</h3>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <button className="btn btn-dark" onClick={this.onClick}>
                            Start host scanning
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <strong>Results</strong>

                        <ul>
                            {results.map(({ url }) => (
                                <li key={url}>{url}</li>
                            ))}
                        </ul>

                        {isScanningFinished &&
                            (results.length === 0 ? (
                                <div className="alert alert-dark" role="alert">
                                    Nothing found :(
                                </div>
                            ) : (
                                <div
                                    className="alert alert-success"
                                    role="alert">
                                    Done, found {results.length} port
                                    {results.length > 1 && 's'}.
                                </div>
                            ))}
                    </div>
                    <div className="col-12 col-sm-6">
                        <strong>Logs</strong>
                        <table>
                            <thead>
                                <tr>
                                    <th>Url</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map(({ url, result }) => (
                                    <tr key={url}>
                                        <td>
                                            <pre>{url}</pre>
                                        </td>
                                        <td>
                                            <pre
                                                className={
                                                    result === 'OK'
                                                        ? 'text-success'
                                                        : 'text-danger'
                                                }>
                                                {result}
                                            </pre>
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

export default XHRHostScanner;
