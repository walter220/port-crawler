import React, { PureComponent } from 'react';
import PortCrawler from './PortCrawler';
import HostCrawler from './HostCrawler';

class Crawler extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            method: 'host',
        };
    }

    handleMethod = (method) => {
        this.setState({ method });
    };

    render() {
        const { method } = this.state;

        return (
            <>
                <div className="row mb-3 form-group">
                    <div className="col-12 col-sm-4">
                        <label>Select crawler:</label>
                    </div>
                    <div className="col-12 col-sm-8">
                        <ul className="nav nav-pills">
                            <li className="nav-item mr-4">
                                <button
                                    className={`nav-link 
                                        ${method === 'port' && 'active'}
                                    `}
                                    onClick={() => this.handleMethod('port')}>
                                    Port
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link 
                                        ${method === 'host' && 'active'}
                                    `}
                                    onClick={() => this.handleMethod('host')}>
                                    Host
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                {method === 'port' && <PortCrawler />}
                {method === 'host' && <HostCrawler />}
            </>
        );
    }
}

export default Crawler;
