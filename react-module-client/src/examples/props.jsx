import React, { Component } from "react";
// import React, { Component } from "react"; > React.Component > Component

// Example.01
class Props01 extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.body}</p>
      </div>
    );
  }
}

// Example.02
function Props02(props) {
  return (
    <div>
      <main>
        <h1 style={{ color: props.color }}>안녕하세요. {props.name} 입니다.</h1>
      </main>
    </div>
  );
}

// Example.03
/* function Props03(props) {
  return <h2>I am a {props.brand}!</h2>;
}

function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}
function Garage() {
  return (
    <>
      <h1>Who Lives in my garage?</h1>
      <Car brand="Ford" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Garage />);
 */

// Example.04-this.props.children
class Childrentest extends Component {
  render() {
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Childrentest;
