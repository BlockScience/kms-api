import { Component } from "react";
import { Helmet } from "react-helmet";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS/Dashboard</title>
        </Helmet>
        Dashboard View...
        <button onClick={() => fetch('/api').then(resp => resp.json()).then(data => { alert(data.message) })}>Summon some data!</button>
      </div>
    );
  }
}

export default Dashboard;