import FadeIn from 'react-fade-in';
import 'bulma/css/bulma.min.css';
import { useOutletContext,useLocation } from "react-router-dom";
import Chat from "./chat";

export default function Video() {
    const { state:  user_data  = {} } = useLocation();
    console.log("VIDEO");
    console.log(user_data.user_data.video_url);
  return (

            <section class="hero is-fullheight">
          <div class="hero-body">
            <div>
                  <FadeIn delay="1000">
                    <div class="video has-text-centered">
                    <iframe class="video_elem" src={user_data.user_data.video_url}>
                    </iframe>
                    </div>
                  </FadeIn>
            </div>
          </div>
        </section>
  );
}
