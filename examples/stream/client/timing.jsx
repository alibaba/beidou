import React from 'react';

/* eslint-disable no-alert */

class Timing extends React.Component {
  constructor() {
    super();
    this.state = {
      TTFB: null,
      contentDownload: null,
      total: null,
    };
  }

  componentDidMount() {
    if (window.performance && window.performance.timing) {
      const { timing } = window.performance;
      const { requestStart, responseEnd, responseStart } = timing;
      const TTFB = responseStart - requestStart;
      const contentDownload = responseEnd - responseStart;
      const total = responseEnd - requestStart;
      // eslint-disable-next-line
      this.setState({
        TTFB,
        contentDownload,
        total,
      });
    }
  }

  render() {
    const { TTFB, contentDownload, total } = this.state;
    return (
      <div>
        <p>
          Use <a href="/">renderToString()</a>
        </p>
        <p>
          Use <a href="/?stream=1">renderToNodeStream()</a>
        </p>
        <h3>Timing</h3>
        {TTFB && (
          <div style={{ backgroundColor: '#f2f2f2' }}>
            <p>TTFB: {TTFB} ms</p>
            <p>Content Download: {contentDownload} ms</p>
            <p>Total: {total} ms</p>
          </div>
        )}
      </div>
    );
  }
}

export default Timing;
