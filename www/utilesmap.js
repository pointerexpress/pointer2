function capasmap() {
    if (map.getLayersByName("SearchBuildings").length > 0) {
        vector = map.getLayersByName("SearchBuildings")[0];
    }
    if (map.getLayersByName("SearchBuildings2").length > 0) {
        lsearch2 = map.getLayersByName("SearchBuildings2")[0];
    }
    if (map.getLayersByName("SearchWFS").length > 0) {
        lsearchwfs = map.getLayersByName("SearchWFS")[0];
    }
}

function logp(texto) {
    $('<li>').append($('<span/>', {
        text: texto
    })).appendTo('#logpointer');
}

function limpiabusquedamap() {
    capasmap();
    vector.removeAllFeatures();
    lsearch2.removeAllFeatures();
    lsearchwfs.removeAllFeatures();
    miubicacion.removeAllFeatures();
    mensajeLimpia();
}

function mensajeSeleccion(encab, contenido) {
    $("#hresultado").html("Pointer: " + encab);
    $("#cresultado").html(contenido);
    $("#resultado").fadeIn();
}

function mensajeLimpia() {
    $("#hresultado").html("");
    $("#cresultado").html("");
}

function extender(bvector, blsearch2, bmiubicacion) {

    $.mobile.changePage("#manpage");

    capasmap();

    var cambio = false;
    var bounds = new OpenLayers.Bounds();
    if (bvector) {
        for (var x in vector.features) {
            bounds.extend(vector.features[x].geometry.getBounds());
            cambio = true;
        }
    }
    if (blsearch2) {
        for (var x in lsearch2.features) {
            bounds.extend(lsearch2.features[x].geometry.getBounds());
            cambio = true;
        }
        for (var x in lsearchwfs.features) {
            bounds.extend(lsearchwfs.features[x].geometry.getBounds());
            cambio = true;
        }
    }
    if (bmiubicacion) {
        for (var x in miubicacion.features) {
            bounds.extend(miubicacion.features[x].geometry.getBounds());
            cambio = true;
        }
    }
    if (cambio) {
        map.zoomToExtent(bounds, false);
    }

    $.mobile.changePage("#manpage");

}
/*
$(window).bind('resize', function() {
    console.log('width = ' + $('[data-role="page"]').width());
    console.log('height = ' + $('[data-role="page"]').height());
}).trigger('resize');
*/
function caracteristicas() {
    try{
    logp('Nombre: ' + device.name + '<br />' +
            'PhoneGap: ' + device.phonegap + '<br />' +
            'Plataforma: ' + device.platform + '<br />' +
            'UUID: ' + device.uuid + '<br />' +
            'Version: ' + device.version + '<br />'+
            'Pixel radio: '+window.devicePixelRatio);
    }catch(e){
     logp(e);
    }
}