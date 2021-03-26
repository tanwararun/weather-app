const req=require('postman-request');
const forecast=(lat,long,cb)=>{
const url ='http://api.weatherstack.com/current?access_key=3a8cbcaad6dc882dda3748861fcb40e7&query='+long+','+lat;
req( {url, json : true},(error,response)=>{
    if(error)
    cb("Error with weather services!");
    else if(response.body.error)
    cb("Unable to get weather details!");
  //  const data=JSON.parse(response.body);
   // console.log(response.body.current);
   else{
   const temp=response.body.current.temperature;
   const fl=response.body.current.feelslike;
   cb(undefined,{
       weather : response.body.current.weather_descriptions[0],
       temperature : temp,
       feelsLike : fl
   })
}
} );
}
module.exports=forecast;