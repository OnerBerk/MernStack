import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from'moment'

const Place =(props)=>{
    const [place, setPlace] = useState(props, []);
    
    //on laisse le deuxieme argument vide pour ne pas avoir de boucle inf
    useEffect (() => {
      getplace()       
    },[])
    
    const getplace = async(props)=>{
         await axios.get('/places')
        .then((res)=>{
          setPlace(res.data.data)
          console.log('on est dans la place')
        })
        .catch(err=>console.error(`ERROR: $(error)`)) 
      }
      
      const displayPlace =(props)=>{
        if(place.length>0){
          return (
            place.map((item,i)=>
            {
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
              {displayPlace()}
            </div>
        )
      
}
export default Place