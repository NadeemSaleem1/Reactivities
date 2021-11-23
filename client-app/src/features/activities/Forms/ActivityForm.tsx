import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';
interface Props{
      activity:Activity | undefined;
      closeForm:()=>void;
      createAndEdit:(activity : Activity)=>void;
      submitting:boolean
} 

export default function ActivityForm ({activity: selectedActivity,closeForm,createAndEdit,submitting}:Props) {


      const initailState = selectedActivity ??{
            id:          '',
            title:       '',
            date:        '',
            description: '',
            category:    '',
            city:        '',
            venue:       ''
      };


      const [activity, setactivity] = useState(initailState);

      function handleSubmit(){
            createAndEdit(activity);
      }

      function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
            const {name,value}=event.target;
            setactivity({...activity,[name]:value});


      }


      return (
          <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                      <Form.Input placeholder='Title' value={activity.title} name='Title' onChange={handleInputChange} />
                      <Form.TextArea placeholder='Description' value={activity.description} name="Description" onChange={handleInputChange}/>
                      <Form.Input placeholder='Category' value={activity.category} name="Category" onChange={handleInputChange}/>
                      <Form.Input type='date' placeholder='Date' value={activity.date} name="Date" onChange={handleInputChange}/>
                      <Form.Input placeholder='City' value={activity.city} name="City" onChange={handleInputChange}/>
                      <Form.Input placeholder='Venue' value={activity.venue} name="Venu" onChange={handleInputChange}/>
                      <Button floated="right" positive type="submit" content="submit" loading={submitting} />
                      <Button onClick={closeForm} floated="right" positive type="button" content="cancel"/>
                </Form>
          </Segment>

      )
}
