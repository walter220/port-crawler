import React, { PureComponent } from 'react';
import axios from 'axios';

class XHRHostScanner extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            isScanningFinished: true,
        };
    }

    onClick = () => {
        this.setState(
            {
                logs: [],
                isScanningFinished: false,
            },
            () => this._handleHostSearch(),
        );
    };

    _handleHostSearch = () => {
        const { hosts, protocol, port, path } = this.props;

        hosts.forEach((host, i) => {
            const url = `${protocol}${host}:${port}${path}`;
            axios
                .get(url)
                .then(() => this._handleLog(url, 'OK'))
                .catch(() => this._handleLog(url, 'ERR'))
                .finally(() => {
                    console.log('check is finished', i, hosts.length);
                    if (i >= hosts.length - 1) {
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
        const { logs, isScanningFinished } = this.state;

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
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <p>
                            <strong>Results</strong>
                        </p>
                        {logs.length <= 0 ? (
                            isScanningFinished ? (
                                <strong>Start searching</strong>
                            ) : (
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            )
                        ) : isScanningFinished ? (
                            <table className="table">
                                <thead className="thead-dark">
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
                        ) : (
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default XHRHostScanner;
