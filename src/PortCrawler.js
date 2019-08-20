import React, { PureComponent } from 'react';
import XHRPortScanner from './XHRPortScanner';
import IframeScanner from './Iframe';

class PortCrawler extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://localhost',
            startPort: 2999,
            endPort: 3003,
            method: 'Iframe',
            ports: [],
            logs: [],
            isScanningFinished: false,
            warning: '',
        };
    }

    handleUrl = (e) => {
        const newUrl = e.target.value;
        this.setState({ url: newUrl });
    };

    handleStart = (e) => {
        const port = e.target.value;
        const { endPort } = this.state;
        let warning = '';
        if (port >= endPort)
            warning = 'Port is higher than endport, this can cause issues';
        this.setState({ startPort: port, warning });
    };

    handleEnd = (e) => {
        const port = e.target.value;
        const { startPort } = this.state;
        let warning = '';
        if (port <= startPort)
            warning = 'Port is lower than startport, this can cause issues';
        this.setState({ endPort: port, warning });
    };

    handleMethod = (method) => {
        this.setState({ method });
    };

    render() {
        const { url, startPort, endPort, method, warning } = this.state;

        return (
            <>
                <div className="row mb-3 form-group">
                    <div className="col-12">
                        <h2>Port crawler - Settings</h2>
                    </div>

                    <div className="col-sm-6 col-md-4">
                        <label htmlFor="start">Url:</label>
                        <input
                            type="text"
                            name="url"
                            className="form-control"
                            value={url}
                            onChange={this.handleUrl}
                        />
                        <small className="pl-2">
                            <i>Do not add : on the end ;)</i>
                        </small>
                    </div>

                    <div className="col-sm-3 col-md-2">
                        <label htmlFor="start">Start port:</label>
                        <input
                            type="number"
                            name="start"
                            className="form-control"
                            value={startPort}
                            onChange={this.handleStart}
                        />
                    </div>

                    <div className="col-sm-3 col-md-2">
                        <label htmlFor="end">End port:</label>
                        <input
                            type="number"
                            name="end"
                            className="form-control"
                            value={endPort}
                            onChange={this.handleEnd}
                        />
                    </div>

                    <div className="col-sm-12 col-md-4">
                        <label>Select method:</label>
                        <ul className="nav nav-pills">
                            <li className="nav-item mr-4">
                                <button
                                    className={`nav-link 
                                        ${method === 'XHR' && 'active'}
                                    `}
                                    onClick={() => this.handleMethod('XHR')}>
                                    XHR
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link 
                                        ${method === 'Iframe' && 'active'}
                                    `}
                                    onClick={() => this.handleMethod('Iframe')}>
                                    Iframe
                                </button>
                            </li>
                        </ul>
                    </div>
                    {warning && (
                        <div className="col-12">
                            <div class="alert alert-danger" role="alert">
                                {warning}
                            </div>
                        </div>
                    )}
                </div>

                <hr />

                {method === 'XHR' && (
                    <XHRPortScanner
                        url={url}
                        startPort={startPort}
                        endPort={endPort}
                    />
                )}

                {method === 'Iframe' && (
                    <IframeScanner
                        url={url}
                        startPort={startPort}
                        endPort={endPort}
                    />
                )}
            </>
        );
    }
}

export default PortCrawler;
