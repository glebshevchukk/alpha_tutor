import 'bulma/css/bulma.min.css';
import Chat from "./chat"
import { Outlet, useLocation} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default function Root() {
  let { state: user_data } = useLocation();
  let savedData = user_data;

  let st = {"padding-left":"5vw"};
  return (
    <>
      <div class="all-columns is-fullheight">
      <div class="navbar is-transparent">

      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <div class="subtitle" style={st}>AlphaTutor</div>
        </a>
      </div>
      </div>
      <div class="columns">
        <div class="column"><Chat {...user_data}/></div>
        <div class="column"><Outlet/></div>
      </div>
      </div>
    </>
  );
}
