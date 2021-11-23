import React from 'react'
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import ActivityDetails from '../activities/ActivityDetails//ActivityDetails';
import ActivityForm from '../activities/Forms/ActivityForm';
import ActivityList from './ActivityList';


interface Props{
   activities: Activity[];
   selectedActivity:Activity| undefined;
   selectActivity : (id:string)=>void;
   cancelSelectActivity:()=>void;
   editMode:boolean;
   openForm:(id:string)=>void;
   closeForm:()=>void;
   createAndEdit:(activity:Activity)=>void;
   submitting:boolean
   deleteActivity:(id:string)=>void;
}

export default function ActivitieDashboard({activities,selectedActivity,selectActivity,
      cancelSelectActivity,editMode,openForm, closeForm,createAndEdit,submitting,deleteActivity}:Props){
      return (
           <Grid>
                 <Grid.Column width='10'>
                 <ActivityList 
                       activities={activities}
                       selectActivity={selectActivity}
                       deleteActivity={deleteActivity}
                       submitting={submitting}
                         />
                 </Grid.Column>

                 <Grid.Column width="6">
                  {
                        selectedActivity && !editMode &&
                        <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm} />
                   }
                   {editMode && 
                  <ActivityForm closeForm={closeForm} activity={selectedActivity} createAndEdit={createAndEdit} 
                  submitting={submitting} />}
                 </Grid.Column>
           </Grid>
      )
}
