import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivitieDashboard from "../../features/dashboard/ActivitieDashboard";
import { Activity } from '../models/activity';
import agent from '../api/agent';
import LoadingComponent from "./LoadingComponent";
function App() {

  const [Activities, setActivities] = useState<Activity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<Activity| undefined>(undefined);
  const [EditMode, setEditMode] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Submitting, setSubmitting] = useState(false);
  const [deleteActivity, setdeleteActivity] = useState();


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


 function handleDelateActivity(id:string){
   setSubmitting(true);
   agent.Activities.delete(id).then(()=>{
     setActivities([...Activities.filter(x=>x.id!==id)]);
     setSubmitting(false);

   })


 }


 function handleCreateandEditActivity(activity:Activity){

  setSubmitting(true);
  if (activity.id) {
    agent.Activities.update(activity).then(()=>{
      setActivities([...Activities.filter(x=>x.id!==activity.id),activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
    
  }else{
   // activity.id
    agent.Activities.create(activity).then(()=>{
      setActivities([...Activities,activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);

    });
  }


  //  activity.id 
  //  ? setActivities([...Activities.filter(x=>x.id!==activity.id),activity])
  //  : setActivities([...Activities,activity]);
  //  setEditMode(false);
  //  setSelectedActivity(activity);
 }


  useEffect(() => {
     agent.Activities.list().then(response=>{
       console.log(response);

       //Declearing Empty Arry 
       let activities:Activity[]=[];

       //Apply Condition
       response.forEach(activity => {
         activity.date=activity.date.split('T')[0];
         activities.push(activity);
         setLoading(false);
       });

       //Set date in SetActivities
       setActivities(activities);
     })   
  }, [])



  //Loading component
   if(Loading) return <LoadingComponent content='loading app' />

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
        submitting={Submitting}
        deleteActivity={handleDelateActivity}
       />
     </Container>
    </Fragment>
  );
}

export default App;
