import React, { PureComponent } from 'react';
import XHRPortScanner from './xhr';
import IframeScanner from './Iframe';

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://localhost',
            startPort: 3001,
            endPort: 3012,
            method: 'XHR',
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

    handleMethod = (method) => {
        this.setState({ method });
    };

    render() {
        const { url, startPort, endPort, method } = this.state;

        return (
            <>
                <div className="row mb-3 form-group">
                    <div className="col-12">
                        <h2>Settings</h2>
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
                </div>

                <hr />

                {method === 'XHR' && (
                    <XHRPortScanner
                        url={url}
                        startPort={startPort}
                        endPort={endPort}
                    />
                )}

                {method === 'Iframe' && <IframeScanner />}
            </>
        );
    }
}

export default App;
