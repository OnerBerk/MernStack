import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from'moment'
import './place.css'

const Place =(props)=>{
    const [place, setPlace] = useState(props, []);
    const placeUrl ="http://localhost:8080/api/v1/"
    
    //on laisse le deuxieme argument vidde pour ne pas avoir de boucle inf
    useEffect (() => {
      getplace()       
    },[])
    
    const getplace = async(props)=>{
        const response = await axios.get(`${placeUrl}places`)
        .then((res)=>{setPlace(res.data.data)})
        .catch(err=>console.error(`ERROR: $(error)`)) 
        console.log(response)
      }
      console.log(place)
      
      
      
      const displayPlace =(props)=>{
        if(place.length>0){
          return (
            place.map((item,i)=>
            {
              console.log(item)
              return(
                <div className="article" key={i} >
                <h2>{item.title}</h2>
                <p className="date">{moment(item.date).format("MMM Do YY") }</p>
                <p>{item.content}</p>
              </div>
              )    
            })
            )}
        else{return(<h3>pas encore d'article</h3>)}
        }

        return (
            <div>
              {displayPlace(props)}
            </div>
        )
      
}
export default Place