import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as Three from 'three';
import Globe from 'react-globe.gl';
import { SizeMe } from 'react-sizeme'
import FadeIn from 'react-fade-in';


const markerHTML = `
<img src="https://w1.pngwing.com/pngs/933/945/png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png" alt="Avatar" class="avatar">
`;

var N = 50;
const gData = [];
const {cities} = require('./routes/cities.js');
for(var i = 0; i < N; i++) {
  var randomIndex=Math.floor(Math.random()*cities.length)
  var newSpot = {
    lat: cities[randomIndex][0],
    lng: cities[randomIndex][1],
    size: 20,
    color: 'white'
  }
  gData.push(newSpot);
}

const colorInterpolator = t => `rgba(255,255,255,0.5*${Math.sqrt(1-t)})`;

const { useEffect, useRef } = React;
  
    const World = () => {
      const globeEl = useRef();
      // useEffect((globeEl) => {
      //   const globe = globeEl.current;
  
      //   // Auto-rotate
      //   globe.controls().autoRotate = true;
      //   globe.controls().autoRotateSpeed = 0.35;
      // }, []);
  
      return <SizeMe monitorHeight render={({ size }) =>
      <div class="all-columns">
      <div class="navbar is-transparent">
        <div class="navbar-start">

        </div>

        <div class="navbar-end">
          <a class="navbar-item">
            <b>Home</b>
         
          </a>
          <a class="navbar-item">
           <b>Background</b>
          </a>
          <a class="navbar-item">
            <b>Conversations</b>
          </a>
        </div>
      </div>
      <div class="columns">
        <div class="column earth-column">
          <Globe
          ref={globeEl}
          animateIn={false}
          width={size.width/2}
          globeImageUrl="https://unpkg.com/three-globe@2.27.2/example/img/earth-night.jpg"
          bumpImageUrl="https://unpkg.com/three-globe@2.27.2/example/img/earth-topology.png"
          htmlElementsData={gData}
          htmlElement={d => {
          const el = document.createElement('div');
          el.innerHTML = markerHTML;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;

          el.style['pointer-events'] = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => console.info(d);
          return el;
        }}
          
        />
        </div>
        <div class="column info-column">
        <section class="hero is-fullheight">
          <div class="hero-body has-text-centered">
            <div class="container">
                  <FadeIn delay="1000">
                    <div class="title">Human OS is not a chatbot</div>
                    <div class="title">They're a friend </div>
                    <div class="title">They live in the world</div>
                    <div class="title">They reach out to you</div>
                    <div class="title">All over text</div>
                    <div class="title"><a>Get started.</a></div>
                  </FadeIn>
            </div>
          </div>
        </section>
        </div>
      </div>
      </div>
      }/>;
      
    };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <World/>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
