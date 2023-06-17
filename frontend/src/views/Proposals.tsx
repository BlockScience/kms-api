import { Component } from "react";
import { Helmet } from "react-helmet";

class Proposals extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS &gt; Proposals</title>
        </Helmet>
        Proposals...
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
}

export default Proposals;