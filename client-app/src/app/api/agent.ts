import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
//base url 
axios.defaults.baseURL='http://localhost:5000/api';



//adding loader
const sleep=(delay:number)=>{
      return new Promise((resolve)=>{
           setTimeout(resolve,delay);
      })
}



//response body return back  none generic 
//const responseBody=(response:AxiosResponse)=> response.data;

// const requests={
//       get:(url:string)=> axios.get(url).then(responseBody),
//       post:(url:string, body:{})=> axios.post(url,body).then(responseBody),
//       put:(url:string, body:{})=> axios.put(url,body).then(responseBody),
//       del:(url:string)=> axios.delete(url).then(responseBody),
// }

//---------------------------------------------------------------

//Generic 
const responseBody=<T>(response:AxiosResponse<T>)=> response.data;

//Create intercepters
axios.interceptors.response.use( async response=>{
      try {
            await sleep(1000);
            return response;

      } catch (error) {
            console.log(error);
            return await Promise.reject(error);
            
      }
//      return  sleep(1000).then(()=>{
//             return response;
//       }).catch((error)=>{
//             console.log(error);
//             return Promise.reject(error);
//       })

})



//Our Reaquests
const requests={
      get:<T>(url:string)=> axios.get<T>(url).then(responseBody),
      post:<T>(url:string, body:{})=> axios.post<T>(url,body).then(responseBody),
      put:<T>(url:string, body:{})=> axios.put<T>(url,body).then(responseBody),
      del:<T>(url:string)=> axios.delete<T>(url).then(responseBody),
}


const Activities={
      list :() => requests.get<Activity[]>('/activities'),
      details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
      create:(activity:Activity)=>requests.post<void>('/activities',activity),
      update:(activity:Activity)=>requests.put<void>('/activities',activity),
      delete:(id:string)=>requests.del<void>(`/activities/${id}`)

}

const agent={
      Activities
}

export default agent