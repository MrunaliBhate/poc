import React, { useContext, useState ,useEffect,Component } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import { AuthContext } from "../App";
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
  const [repo,setrepo]=useState([]);
  const [event, setevent] = useState([]);

  
  useEffect(() => {
    const getrepo =()=> {
      return axios({
        method: 'get',
        url: `https://api.github.com/repos/MrunaliBhate/test`,
        config: { headers: {
          Authorization: state.user,
        }
      }
    })
    }
    
    const getpublicevents =()=> {
      return axios({
        method: 'get',
        url: `https://api.github.com/events`,
        config: { headers: {
          Authorization: state.user,
        }
      }
    })
    }
    getrepo().then(response => {
      console.log(response.data);
      setrepo(response.data.full_name);});
    getpublicevents().then(response => {
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

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
  
    }
  }
}
`;