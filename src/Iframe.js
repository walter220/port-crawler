import React, { PureComponent } from 'react';

class Iframe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ports: [],
            logs: [],
            isScanningFinished: false,
            frames: [],
        };
    }

    onClick = () => {
        const { url, startPort, endPort } = this.props;
        const frames = [];
        for (let i = startPort; i <= endPort; i++) {
            frames.push(`${url}:${i}`);
        }
        this.setState({ frames });
    };

    render() {
        const { frames } = this.state;
        return (
            <>
                <div className="row mb-4">
                    <div className="col-sm-6">
                        <h3>Iframe Port Scanner</h3>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-end">
                        <button className="btn btn-dark" onClick={this.onClick}>
                            Start port scanning
                        </button>
                    </div>
                </div>
                <div className="row">
                    {frames.map((url) => (
                        <div className="col-6 col-sm-4 col-md-3 mb-4" key={url}>
                            <strong>{url}</strong>
                            <iframe
                                src={url}
                                frameborder="0"
                                title={url}
                                className="w-100"
                            />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default Iframe;
