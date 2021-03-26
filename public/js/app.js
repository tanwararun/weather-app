

const f=document.querySelector('form')
const i=document.querySelector('input')
const p1=document.querySelector('#msg1')
const p2=document.querySelector('#msg2')
const p3=document.querySelector('#msg3')
const p4=document.querySelector('#msg4')

f.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search=i.value
    p1.textContent="Loading....";
    p2.textContent="";
        p3.textContent="";
        p4.textContent="";
   // console.log(search)
    fetch('http://localhost:3000/weather?address='+search).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
        p1.textContent=data.error;
        p2.textContent="";
        p3.textContent="";
        p4.textContent="";
        }
        else{
            var s;
            s="Location : "+data.Location
            p1.textContent=s;
            s="Weather : "+data.Weather
            p2.textContent=s;
            s="Temperature : "+data.Temperature
            p3.textContent=s;
            s="Feels Like : "+data.FeelsLike
            p4.textContent=s;
        }
    })
})
})