import React from 'react'
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../app/models/activity';
import ActivityDetails from '../activities/ActivityDetails//ActivityDetails';
import ActivityForm from '../activities/Forms/ActivityForm';
import ActivityList from './ActivityList';


interface Props{
   activities: Activity[];

}

export default function ActivitieDashboard({activities}:Props){
      return (
           <Grid>
                 <Grid.Column width='10'>
                 <ActivityList activities={activities}/>
                 </Grid.Column>
                 <Grid.Column width="6">
                       {activities[0] &&
                  <ActivityDetails activity={activities[0]} />}
                  <ActivityForm/>
                 </Grid.Column>
           </Grid>
      )
}