import FadeIn from 'react-fade-in';
import 'bulma/css/bulma.min.css';
import { Link } from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useOutletContext} from "react-router-dom";
import ContentLoader from 'react-content-loader'

const CardList = props => (
  <ContentLoader width={355} height={600} viewBox="0 0 355 600" {...props}>
    <rect x="4" y="8" rx="16" ry="16" width="7" height="86" />
    <rect x="6" y="8" rx="16" ry="16" width="675" height="8" />
    <rect x="6" y="86" rx="16" ry="16" width="669" height="8" />
    <rect x="350" y="8" rx="16" ry="16" width="6" height="86" />
    <rect x="25" y="25" rx="16" ry="16" width="200" height="50" />
    <rect x="240" y="25" rx="3" ry="3" width="100" height="10" />
    <rect x="240" y="45" rx="3" ry="3" width="100" height="10" />
    <rect x="240" y="65" rx="3" ry="3" width="100" height="10" />
  </ContentLoader>
)


export default function Chat(user_data) {
    let navigate = useNavigate();
    const [msgs, setMsgs] = useState([]);
    const [msgStrings, setMsgStrings] = useState([]);

    console.log("CHATTT");
    console.log(user_data);

  const handleSend = (msg) => {
    if(msg==""){
        return;
    }
    user_data.user_data.message = msg;
    user_data.user_data.all_prev_messages=msgStrings;

    let user_message = <Message
    model={{
        message: msg,
        sentTime: "just now",
        sender: "student",
        position:"normal",
        direction:"outgoing",
    }}
    />
    setMsgs(msgs.concat([user_message]));
    setMsgStrings(msgStrings.concat([msg]));
    
    const getResponse = async (msg) => {
        let response="TEST";
        let type = "";

        try{
            //https://568d-68-65-175-109.ngrok-free.app/respond
            //https://a676-128-12-123-228.ngrok-free.app/jeopardy
            delete(user_data.user_data.json_string);
            delete(user_data.user_data.video_url);
            
            const rsp = await axios.post('https://aaa2-136-24-74-186.ngrok-free.app/respond',user_data.user_data);
            console.log(Object.keys(rsp.data));
            response = rsp.data.message;
            type = rsp.data.type;
            console.log("OUR RESPONSE");
            console.log(rsp);
            console.log("OUR TYPE");
            console.log(type);

            if(type=="video"){
                user_data.user_data.video_url = response;
                navigate("/combo/video_page",{ state: user_data });
            }
            else if(type=="jeopardy"){
                user_data.user_data.json_string = response;
                navigate("/combo/jeopordy_page",{ state: user_data });
            }
            else{
                navigate("/combo/tree_page",{ state: user_data  });
            }
     
            if(msg == "") return;
            if(type == "jeopardy") return;
            if(type == "video") response="Here's a helpful video!";
    
            let ai_message = <Message
            model={{
                message: response,
                sentTime: "just now",
                sender: "ai",
            }}
            />
    
           setMsgs(msgs.concat([user_message,ai_message]));
           setMsgStrings(msgStrings.concat([msg,response]));
        }
        catch (err) {
        console.log("Could not respond.")
        } 
      };
    getResponse(msg);
};
  
  return (
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div>
                  <FadeIn delay="1000">
                 <MainContainer>
                    <ChatContainer>
                    <MessageList>
                        {
                            msgs
                        }
                    </MessageList>
                    <MessageInput onSend={handleSend} placeholder="Type message here" />
                    </ChatContainer>
                </MainContainer>
                   
                  </FadeIn>
            </div>
          </div>
        </section>
  );
}
