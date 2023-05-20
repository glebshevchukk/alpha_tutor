import FadeIn from 'react-fade-in';
import 'bulma/css/bulma.min.css';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

export default function Opener() {
  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.currentTarget);
    let input = formData.get('topic');
    navigate("/loading", { state: { topic: input } });


  }
  return (
        <section class="hero is-fullheight has-text-centered">
          <div class="opener-body is-centered">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  <FadeIn>
                
                    <div class="subtitle">Welcome to AlphaTutor.  </div>
                    
                    <div class="subtitle">It helps you learn about
                    your schoolwork</div>
             
                    <div class="subtitle">through chat, games, and videos.</div>
                  
                    <br/>
                    <div class="subtitle">What would you like to learn about first?  </div>
                    <br/>

                    <form onSubmit={handleSubmit}>
                    <input name="topic" type="text" class="input is-rounded topic-input" placeholder="Tell me about something you want to learn about."/>
                    </form>
                  </FadeIn>
          </div>
        </section>
  );
}
