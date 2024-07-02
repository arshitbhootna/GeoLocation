const button = document.getElementById("btn");
button.addEventListener("click",()=>{
    console.log(navigator);
    if(navigator.geolocation){
        console.log(navigator.geolocation);
        button.innerText="Allow to detect Location";
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
        // if everything is correct , success will be call otherwise error fcuntion
        console.log(navigator.geolocation.getCurrentPosition);
    }
    else{
        button.innerText="Browser not support location access";
    }
});
function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=660f1e3e1da94eed8cf88764893d4f95`)
    .then(response =>{
       return response.json()}).then(response =>{
        console.log(response);
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {county, postcode, country} = allDetails;
        button.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}

//     let temp= fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longtitude}&key=${apikey}`).then(response=> response.json()).then(result=>{

//     let allDetails = result.results[0].components;
//     console.table(allDetails);
// }

//   ) 
        

    

function onError(error){
    console.log(error);
    if(error.code==1){
        btn.innerText="User denied Geolocation permission";
    }
    else{
        btn.innerText="Something went wrong";
    }
    btn.setAttribute("disabled","true");
}