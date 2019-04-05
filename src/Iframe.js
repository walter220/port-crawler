import React, { PureComponent } from 'react';

class Iframe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ports: [],
            logs: [],
            isScanningFinished: false,
        };
    }
    render() {
        const { ports, logs, isScanningFinished } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <h2>Iframe scanner</h2>
                    </div>
                </div>
            </>
        );
    }
}

export default Iframe;
