import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import axios from "axios";
import ActivitieDashboard from "../../features/dashboard/ActivitieDashboard";
import { Activity } from '../models/activity';
function App() {

  const [Activities, setActivities] = useState<Activity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity| undefined>(undefined);
  const [EditMode, setEditMode] = useState(false);


  function handleSlectActivity(id:string)
  {
    setSelectedActivity(Activities.find(x=>x.id===id));
  }

 function handleCancelSelectActivities()
 {
   setSelectedActivity(undefined);
 }

 function handleFormOpen(id?:string){
   id?handleSlectActivity(id):handleCancelSelectActivities();
   setEditMode(true);
 }


 function handleFormClose(){
   setEditMode(false);
 }


 function handleCreateandEditActivity(activity:Activity){
   activity.id 
   ? setActivities([...Activities.filter(x=>x.id!==activity.id),activity])
   : setActivities([...Activities,activity]);
   setEditMode(false);
   setSelectedActivity(activity);
 }


  useEffect(() => {
     axios.get<Activity[]>('http://localhost:5000/api/Activities').then(response=>{
       console.log(response);
           setActivities(response.data);
     })   
  }, [])

  return (
    <Fragment>
     <NavBar openForm={handleFormOpen}/>
     <Container style={{marginTop:'60px'}}>
       <ActivitieDashboard activities={Activities}
        selectedActivity={SelectedActivity} 
        selectActivity={handleSlectActivity}
        cancelSelectActivity={handleCancelSelectActivities}
        editMode={EditMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createAndEdit={handleCreateandEditActivity}
       />
     </Container>
    </Fragment>
  );
}

export default App;
