function setup()
{
    noCanvas();
    let video = createCapture(VIDEO);
    video.size(320, 240);
    let locationButton = document.getElementById("getLocation");
    locationButton.addEventListener("click", function()
    {
        if('geolocation' in navigator)
        {
            let name = document.getElementById("name").value;
            video.loadPixels();
            let image64 = video.canvas.toDataURL();
            console.log("geolocation is available");
            navigator.geolocation.getCurrentPosition(position =>
            {
                //logging the postion to the console
                console.log(position);
                //defining the position variables
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                //showing the variables on the page at the spans defined below in the <p> tag
                document.getElementById("latitude").textContent = lat;
                document.getElementById("longitude").textContent = lon;


                //sending the data
                let data = {lat, lon, name, image64};
                let options = {
                    method: "POST",
                    headers:
                    {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                    databaseItemType: "location and name data"
                };
                fetch("/api", options).then(response => {
                    console.log(response.json().then(response => {
                        console.log(response);
                    }));
                });
            });
        }
        else
        {
            console.log("geolocation not available at this time");
        }
    });
}

function goToAll()
{
    window.location = "all.html";
}
