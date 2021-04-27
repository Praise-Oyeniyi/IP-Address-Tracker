function Loading() {
    document.querySelector('.onload').style.display = 'none';
}

$(document).ready(()=>{
    value ='';
    ipValue(value);
    
    $('#ip-search').keyup(clicked);

    function clicked(e){
        if(e.key === "Enter" || e.keyCode == 13){
            if($('#ip-search').val().length == 0){
            alert('Input a valid IP-address/Domain name')
        }
            search(e.target.value);
        }
    }

    $('.ip-icon').click(()=>{
        if($('#ip-search').val().length == 0){
            alert('Input a valid IP-address/Domain name')
        }
        search($('#ip-search').val());
        
    });

    
    function search(domains){
        ipValue(domains);
        $('#ip-search').val('');
    }

    function ipValue(value){
        $.getJSON("https://geo.ipify.org/api/v1?apiKey=at_JIoMWBdMFHIXRkN4QEnexI7pz6uSV" + "&domain=" +value, function(data){
            ipData(data)
        }
    ).fail(()=>{
        alert('Input a valid IP-address/Domain name');
    });
    }
    
});


// map init
var map = L.map('map').setView([7.79976, 5.33242],10);

function mapPreview(){
    document.querySelector('.mapload').style.display = 'none';
}

// maptiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHJhaXNlLW95ZW5peWkiLCJhIjoiY2tub2pzM2thMHBhOTJ2bGE5cXp2YWtkdiJ9.9Lyndq8LKaq2Uvyt0imyTA'
}).addTo(map);

// marker init position
var marker = L.marker([0, 0]).addTo(map);




function ipData(data){
    var ipAddress = data.ip;
    var location = data.location.region +', ' +data.location.country+', ' +data.location.postalCode;
    var timezone = data.location.timezone;
    var ispInfo = data.isp;
    var lat = data.location.lat;
    var lng = data.location.lng;
    
    


    $('.location').text(location);
    $('.ip-address').text(ipAddress);
    $('.timezone').text(timezone);
    $('.isp').text(ispInfo);
    

    //map marker
    marker.setLatLng([lat, lng]);
}



