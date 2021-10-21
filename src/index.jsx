// import React from 'react';
// import ReactDOM from 'react-dom';

// function App() {
//   return (
//     <div className="App">
//       <h1>Exemplo React</h1>
//       <ul>
//         <li>Declarative</li>
//         <li>Component-based</li>
//         <li>Learn once, write anywhere</li>
//       </ul>      
//     </div>
//   );
// }

function createElement(typeElement, props, ...children) {
  const elementProps = {
    ...props,
    children
  }
  if(typeof typeElement === 'function') {
    return typeElement(elementProps)
  }
  return {
    tagName: typeElement,
    props: elementProps
  }

}

function render(element, root) {
  console.log(JSON.stringify(element, null, 4))
  const elementHTML = toHTML(element)
  root.appendChild(elementHTML)
}

function toHTML(virtualElement) {

  if(typeof virtualElement === 'string' ) {
    return document.createTextNode(virtualElement)
  }

  const htmlElement = document.createElement(virtualElement.tagName)
  virtualElement.props.children.forEach((child) => htmlElement.appendChild(toHTML(child)))

  delete virtualElement.props.children
  const attributes = Object.entries(virtualElement.props)
  attributes.forEach((prop) => htmlElement.setAttribute(prop[0], prop[1]))  

  return htmlElement
}

const ReactDOM = {
  render
}

const React = {
  createElement
}

function App() {
  return(
  React.createElement("div", {    className: "App",    id: "main"  },
  React.createElement("h1", null, "Exemplo React"),
  React.createElement("ul", null,
    React.createElement("li", null, "Declarative"),
    React.createElement("li", null, "Component-based"),
    React.createElement("li", null, "Learn once, write anywhere"))));
}


ReactDOM.render(  React.createElement(App, null), document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));
