import React, {PureComponent} from 'react';
import axios from 'axios';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      url: 'http://localhost',
      startPort: 3001,
      endPort: 3012,
      ports: [],
      isScanningFinished: false,
    }
  }

  handleUrl = (e) => {
    const newUrl = e.target.value;
    this.setState({ url: newUrl});
  };

  handleStart = (e) => {
    const port = e.target.value;
    const { endPort } = this.state;
    if (port >= endPort) return;
    this.setState({ startPort: port});
  };

  handleEnd = (e) => {
    const port = e.target.value;
    const { startPort } = this.state;
    if (port <= startPort) return;
    this.setState({ endPort: port});
  };

  onClick = () => {
    const {
      url,
      startPort,
      endPort,
    } = this.state;

    this.setState({
      ports: [],
      isScanningFinished: false,
    }, () => {
      for (let i = startPort; i <= endPort; i++) {
        axios
          .get(`${url}:${i}`)
          .then(res => {
              console.log(`Ok at ${i}`);
              const { ports } = this.state;
              const newPorts = [...ports, {
                portNumber: i,
              }];
              this.setState({
                ports: newPorts,
              })
            }
          )
          .finally(() => {
            if (i >= endPort) {
              this.setState({
                isScanningFinished: true,
              })
            }
          });
      }
    });
  };

  render() {
    const {
      url,
      startPort,
      endPort,
      ports,
      isScanningFinished,
    } = this.state;

    return (
        <div className="container">
          <div className="row m-4">
            <div className="col-12">
              <h1>TV port finder</h1>

              <hr/>

              <div className="row mb-3 form-group">
                <div className="col-md-2">
                  <label htmlFor="start">Url:</label>
                </div>
                <div className="col-md-8">
                  <input value={url} onChange={this.handleUrl} name="url" type="text" className="form-control"/>
                  <small className="ml-2">
                    <i>When changing the url, don't add : on the end ;)</i>
                  </small>
                </div>
              </div>

              <div className="row mb-3 form-group">
                <div className="col-md-2">
                  <label htmlFor="start">Start port:</label>
                </div>
                <div className="col-md-2 mb-3">
                  <input value={startPort} onChange={this.handleStart} name="start" type="number" className="form-control"/>
                </div>

                <div className="col-md-2 offset-md-2">
                  <label htmlFor="end">End port:</label>
                </div>
                <div className="col-md-2">
                  <input value={endPort} onChange={this.handleEnd} name="end" type="number" className="form-control"/>
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <button className="btn btn-dark" onClick={this.onClick}>
                    Click me
                  </button>
                </div>

              </div>

              <hr/>

              <h2>Found ports:</h2>

              <ul>
                {ports.map(({ portNumber }) => (
                  <li key={portNumber}>{portNumber}</li>
                ))}
              </ul>

              {isScanningFinished && (
                ports.length === 0 ? (
                  <span>Nothing found :(</span>
                ) : (
                  <span>Done, found {ports.length} port{ports.length > 1 && 's'}.</span>
                )
              )}

            </div>
          </div>
        </div>
    );
  }
}

export default App;
