function initMap(){
    //saber las coordenadas del sitio
    const localizacion = {lat: 40.0467833, lng: -4.2696005};
    //llamamiento a la caja del mapa
    const mapa = document.getElementById("cajaMap");
    //creacion del mapa
    const map = new google.maps.Map(mapa, {
        zoom: 19,
        center: localizacion,
    });

    //creacion de marcador
    const marcador = new google.maps.Marker({
        position: localizacion,
        map: map,
        draggable:true, //mover la ubicación
    });

    //contenido de la ubicacion
    const contenido = '<h1 class="map">Nails Glow</h1>'+
    '<img src="../images/navegacion.jpg">';

    const infowindow = new google.maps.InfoWindow({
        content: contenido,
    });

    //creacion de evento al marcador
    marcador.addListener("click", () => {
        //ventana de informacion
        infowindow.open({
            //configuramos parametros
            anchor: marcador,
            map,
            shouldFocus: false,
        });
    });

    //creacion de una ruta
    const directionsService = new google.maps.DirectionsService(); //realizar el calculo de la ruta
    const directionsRenderer = new google.maps.DirectionsRenderer({  //renderizar ruta
        draggable: true,
        map: map,
        panel: document.getElementById("panel"),
        suppressMarkers: true,  //eliminar todas las marcas del mapa
    });

    //coordenadar de inicio y fin
    const destination = localizacion;
    window.calculateRoute = function() {
        const originAddress = document.getElementById("origin").value;
        if (originAddress) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: originAddress }, (results, status) => {
                if (status === "OK") {
                    const origin = results[0].geometry.location;
                    displayRoute(origin, destination, directionsService, directionsRenderer);
                } else {
                    alert("No se pudo encontrar la dirección de origen: " + status);
                }
            });
        } else {
            alert("Por favor, ingresa una dirección de origen.");
        }
    };
}


//calculo y dibujo de desplazamiento
function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin, //inicio
        destination: destination,  //final
        travelMode: google.maps.TravelMode.DRIVING,  //modo de desplazamiento
        avoidTolls: true,
    })

    //mostramos resultado de ruta
    .then((result) => {
        display.setDirections(result);
    })
    .catch((e) => {
        alert("Error al calcular la ruta: " + e);
    });
}

window.initMap = initMap;

