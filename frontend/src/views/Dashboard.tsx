import { Component } from "react";
import { Helmet } from "react-helmet";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS &gt; Dashboard</title>
        </Helmet>
        Dashboard View...
      </div>
    );
  }
}

export default Dashboard;