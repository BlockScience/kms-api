import { Component } from "react";
import { Helmet } from "react-helmet";

class Notifications extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS &gt; Notifications</title>
        </Helmet>
        Notifications...
        <ol>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
}

export default Notifications;