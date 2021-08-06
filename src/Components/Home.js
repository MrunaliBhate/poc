import React, { useContext, useState ,useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { JsonToTable } from "react-json-to-table";
import {Services} from "../Services/Services";
import {Wrapper} from "../Resources/HomeStyle"

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  const [repo,setrepo]=useState([]);
  const [event, setevent] = useState([]);

  
  useEffect(() => {

    Services.Getrepo(state.user).then(response => {
      setrepo(response.data.full_name);});

    Services.getpublicevents(state.user).then(response => {
      const result = response.data.map(item => {
        return {
          id: item.id,
          type: item.type
        };
      });
     setevent(result)});

  
     
}, []);



  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  

       
             
  return (
    <Wrapper>
      <div className="container">
        <button onClick={()=> handleLogout()}>Logout</button>
        <div>
          <div className="content">            
            <span>{state.user} - Access Token</span>
            <span>{repo} - Repository</span>
            <span>Event Table</span>            
            <div>
            <JsonToTable json={event.slice(0,5)} />         
      </div>
             
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

;