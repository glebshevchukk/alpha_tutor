import React from 'react';
import ContentLoader from 'react-content-loader';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import mermaid from "mermaid";

const ThreeDots = props => (

  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
)

export default function Loading() {
    let navigate=useNavigate();
    const { state: { topic } = {} } = useLocation();
    const [userData, setUserData] = useState({});

    useEffect(() => {

        const getInfo = async (topic) => {
            try{
                // let user_data = {
                //     'topic': 'birds',
                //     'subcategories': ["food","life","death","existence","hunting","sport"],
                //     'summary': "birds fly in the sky and are not real.",
                //     'mermaid_graph': "graph TD;Transformers-->LLM;LLM-->Vectors;Vectors-->Numbers;",
                //     'video_url':'https://www.youtube.com/embed/dQw4w9WgXcQ'

                // };
                console.log("Set user data!")
                let udj = await axios.post('https://aaa2-136-24-74-186.ngrok-free.app/generate_topic',{"topic":topic});
                let user_data = udj.data;
                console.log(user_data);
                let mermaidStr=user_data.mermaid_graph;
                console.log(mermaidStr);

                mermaid.parse(mermaidStr);
        
                navigate("/combo/tree_page", { state: {  user_data} });
            }
            catch{
                navigate("/loading", { state: { topic: topic} });
            }
        }

        getInfo(topic);

    });

    return (
        <div class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-2 is-offset-4">
        <div>
            <ThreeDots/>
          
        </div>
      </div>
    </div>
  </div>
</div>
    )
}