import { Component } from "react";
import { Helmet } from "react-helmet";

class Activity extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS/Activity</title>
        </Helmet>
        Activity...
        <ol>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
}

export default Activity;