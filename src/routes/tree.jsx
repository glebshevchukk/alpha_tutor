import FadeIn from 'react-fade-in';
import 'bulma/css/bulma.min.css';
import React from 'react';
import mermaid from "mermaid";
import { useOutletContext,useLocation } from "react-router-dom";
import Chat from "./chat"


mermaid.initialize({
    theme: 'dark',
    startOnLoad: true,
    'themeVariables': {
        'primaryColor': '#000',
        'primaryTextColor': '#ffffda',
        'primaryBorderColor': '#000',
        'lineColor': '#ffffda',
        'secondaryColor': '#000',
        'tertiaryColor': '#fff',
      }
  });
  
  class Mermaid extends React.Component {
    componentDidMount() {
      mermaid.contentLoaded();
    }
    render() {
      return <div className="mermaid has-text-centered">{this.props.chart}</div>;
    }
  }


export default function Tree() {
    const { state: user_data = {} } = useLocation();
    console.log("TREE");
    console.log(user_data);
    return (

            <div class="column">
        <Mermaid
        chart={user_data.user_data.mermaid_graph}
      />
        </div>
    );
  }