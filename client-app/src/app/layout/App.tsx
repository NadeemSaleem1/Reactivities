import { Fragment, useEffect, useState } from "react";
import { Container, List } from "semantic-ui-react";
import NavBar from "./NavBar";
import axios from "axios";
import ActivitieDashboard from "../../features/dashboard/ActivitieDashboard";
import { Activity } from "../models/activity";
function App() {

  const [Activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
     axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response=>{
       console.log(response);
           setActivities(response.data);
     })   
  }, [])

  return (
    <Fragment>
     <NavBar/>
     <Container style={{marginTop:'60px'}}>
       <ActivitieDashboard activities={Activities}/>
     </Container>
    </Fragment>
  );
}

export default App;
