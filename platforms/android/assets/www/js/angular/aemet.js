// Hay que arrancar chrome: google-chrome-stable --disable-web-security --user-data-dir

var aemetapi = angular.module('AemetApi', []);

/*
 * Creamos un objeto en la factoria para poder inyectarlo a cualquier controlador.
 * Esto está bien para compartir datos entre varios controladores.
 * Zonas de navegación. Definimos las zonas que van a estar disponibles en la app.
 */
aemetapi.factory('zonasNavegacion', function () {
    var zonasNavegacion = new Object();
    zonasNavegacion["A Coruña"] = {
        nombre: "A Coruña",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX40MM.xml",
        area:"gal1",
        codigo: 7115
    };
    zonasNavegacion["Alicante"] = {
        nombre: "Alicante",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX46MM.xml",
        area:"val1",
        codigo: 7703
    };
    zonasNavegacion["Almería"] = {
        nombre: "Almería",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX47MM.xml",
        area:"and2",
        codigo: 6104
    };
    zonasNavegacion["Asturias"] = {
        nombre: "Asturias",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX41MM.xml",
        area: "can1",
        codigo: 6333,
        zona:41,
        codMapaSig:"ast",//Mapas significativos. Último elaborado.
        latlon:[43.3,-5.8],
        estaciones:[
            {cod:'1208H',pos:[43.559723,-5.700833 ]},
            {cod:'1210X',pos:[43.2,-5.7]},
            {cod:'1283U',pos:[43.569164,-6.469998]}]
        
    };
    zonasNavegacion["Barcelona"] = {
        nombre: "Barcelona",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX45MM.xml",
        area:"cat1",
        codigo: 6908
    };
    zonasNavegacion["Bizkaia"] = {
        nombre: "Bizkaia",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX41MM.xml",
        area:"can1",
        codigo: 7548
    };
    zonasNavegacion["Cádiz"] = {
        nombre: "Cádiz",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX47MM.xml",
        codigo: 6111
    };
    zonasNavegacion["Cantabria"] = {
        nombre: "Cantabria",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX41MM.xml",
        area:"can1",
        codigo: 6639,
        zona:41,
        codMapaSig:"can",
        latlon:[43.13,-4],
        estaciones:[
            {cod:'1111X',pos:[43.491055,-3.800431]},
            {cod:'1083L',pos:[43.39473,-3.233884]}]
    };
    zonasNavegacion["Castellón"] = {
        nombre: "Castellón",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX46MM.xml",
        area:"val1",
        codigo: 7712
    };
    zonasNavegacion["Gipuzkoa"] = {
        nombre: "Gipuzkoa",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX41MM.xml",
        area:"can1",
        codigo: 7520
    };
    zonasNavegacion["Girona"] = {
        nombre: "Girona",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX45MM.xml",
        area:"cat1",
        codigo: 6917
    };
    zonasNavegacion["Gran Canaria"] = {
        nombre: "Gran Canaria",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX43MM.xml",
        area:"coo1",
        codigo: 6590
    };
    zonasNavegacion["Granada"] = {
        nombre: "Granada",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX47MM.xml",
        area:"and2",
        codigo: 6118
    };
    zonasNavegacion["Lugo"] = {
        nombre: "Lugo",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX40MM.xml",
        area:"gal1",
        codigo: 7127
    };
    zonasNavegacion["Málaga"] = {
        nombre: "Málaga",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX47MM.xml",
        area:"and2",
        codigo: 6129
    };
    zonasNavegacion["Menorca"] = {
        nombre: "Menorca",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX44MM.xml",
        area:"bal1",
        codigo: 6455
    };
    zonasNavegacion["Mallorca"] = {
        nombre: "Mallorca",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX44MM.xml",
        area:"bal1",
        codigo: 6454
    };
    zonasNavegacion["Murcia"] = {
        nombre: "Murcia",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX46MM.xml",
        area:"val1",
        codigo: 7330
    };
    zonasNavegacion["Pontevedra"] = {
        nombre: "Pontevedra",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX40MM.xml",
        area:"gal1",
        codigo: 7136
    };
    zonasNavegacion["Tarragona"] = {
        nombre: "Tarragona",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX45MM.xml",
        area:"cat1",
        codigo: 6943
    };
    zonasNavegacion["Valencia"] = {
        nombre: "Valencia",
        prediccionMarUrl: "http://www.aemet.es/xml/maritima/FQXX46MM.xml",
        area:"val1",
        codigo: 7746
    };

    return zonasNavegacion;
});

/*
 * En este caso creamos un servicio para definir una función global que va a servir
 * en varios sitios. Es verdad que solo la usa un controlador y la podríamos haber definido
 * dentro pero así descargamos un poco de código el controlador y queda más limpio.
 * Este servicio pide un XML remoto y lo transofrma a objetos en JavaScript
 */
aemetapi.service('XMLRetrieverService', ['$http', function ($http) {
        this.GetXML = function (url) {
            return $http.get(url,
                    {
                        transformResponse: function (cnv) {
                            var x2js = new X2JS();
                            var aftCnv = x2js.xml_str2json(cnv);
                            return aftCnv;
                        }
                    });
        };
    }]);

aemetapi.service('AemetGetRest',['$http', function ($http) {
    api_key='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZ2xlejgyQGdtYWlsLmNvbSIsImp0aSI6ImIzM2NiNWZhLTc2YzMtNGFiNC05OTUyLWYyZDNhZDEwYjUwMyIsImV4cCI6MTQ5MzQxODcxNCwiaXNzIjoiQUVNRVQiLCJpYXQiOjE0ODU2NDI3MTQsInVzZXJJZCI6ImIzM2NiNWZhLTc2YzMtNGFiNC05OTUyLWYyZDNhZDEwYjUwMyIsInJvbGUiOiIifQ.FsJAJt34jrfGl0mji6SsgJlrylfRMOGp6PpimAK97Jg';
    baseUrl = 'https://opendata.aemet.es/opendata/api';
    this.GetRest = function(url)
    {
        console.log("Haciendo petición:"+baseUrl);
        return $http.get(baseUrl+url,{params:{'api_key':api_key}}).
        then(function(response) {
            if (response.data.descripcion==='exito')
            {
                console.log("Todo ok.Segunda peticion...")
                return $http.get(response.data.datos);
            } 
        });
    };
    
    this.GetRestImage = function(url)
    {
        return $http.get(baseUrl+url,{params:{'api_key':api_key}});
    };
}]);

aemetapi.service('AemetService', ['AemetGetRest','XMLRetrieverService','zonasNavegacion','$q','$http', function (AemetGetRest,XMLRetrieverService,zonasNavegacion,$q,$http) {
        this.GetPrediccionMaritima = function(provincia) {
            return XMLRetrieverService.GetXML(zonasNavegacion[provincia].prediccionMarUrl);
        };
        this.GetTempAgua = function()
        {
            peticionURL="/satelites/producto/sst/";
            return AemetGetRest.GetRestImage(peticionURL);
        };
        this.GetMapaFrentes = function()
        {
            peticionURL="/mapasygraficos/analisis/";
            return AemetGetRest.GetRestImage(peticionURL);
        };
        this.GetMapsSignificativos = function(provincia)
        {
            return $q(function(resolve, reject) {
                peticionURL="/mapasygraficos/mapassignificativos/";
                var response = {};
                response.datos = [];
                //Un buen ejemplo de como implementar una Promise. Aquí hacemos 4 llamadas al webservice y no podemos devolver el 
                //array #response.datos hasta que no tengamos las cuatro respuestas
                AemetGetRest.GetRestImage(peticionURL+zonasNavegacion[provincia].codMapaSig+'/c/').success(function(rc)
                {
                    response.datos.push({'id':0,'src':rc.datos});
                    peticionURL="/mapasygraficos/mapassignificativos/";
                    AemetGetRest.GetRestImage(peticionURL+zonasNavegacion[provincia].codMapaSig+'/d/').success(function(rd)
                    {
                        response.datos.push({'id':1,'src':rd.datos});
                        resolve(response);
                    });
                });
            });
        };
        this.GetPrediccionProvincia = function(provincia,fecha)
        {
            codigo = zonasNavegacion[provincia].codigo;
            return XMLRetrieverService.GetXML("http://www.aemet.es/xml/provincias/" + fecha + "_Provincias_" + codigo + ".xml");
        }
        //Devuelve todas las estaciones para una provincia que se recibe como parámetro
        this.GetEstacionesProvincia = function(provincia)
        {
            return zonasNavegacion[provincia].estaciones;
        }
        //Devuelve los datos de una estación concreta
        this.GetDatosEstacion = function(codEstacion)
        {
            peticionURL="/observacion/convencional/datos/estacion/"+codEstacion;
            return AemetGetRest.GetRest(peticionURL);
        };
        this.GetMapasPrediccionMar = function(provincia)
        {
            return $q(function(resolve, reject) {
                $http.get("http://www.aemet.es/es/eltiempo/prediccion/maritima?opc1=0&opc3=0&area="+zonasNavegacion[provincia].area)
                    .success(function (response) {
                        mapasMar = [];
                        indice = 0;
                        j=0;
                        while (indice!==-1)
                        {
                            indice = response.indexOf('/imagenes_d/eltiempo/prediccion/mod_maritima/',indice);
                            if (indice>0)
                            {
                                indice2 = response.indexOf('"',indice);
                                if (indice2>indice)
                                {
                                    ruta = "http://www.aemet.es"+response.substring(indice,indice2);
                                    altindice = response.indexOf('alt',indice2)+35;
                                    if (altindice>0)
                                    {
                                        altindice2 = response.indexOf('"',altindice);
                                        titulo = response.substring(altindice,altindice2);
                                        indice = altindice2;
                                    }
                                    mapasMar.push({"id": j++, "src": ruta, "titulo": titulo});
                                }
                            }
                        }
                        resolve(mapasMar);
                    });
                });
        };
        this.GetModelosHirlam = function()
        {
            return $q(function(resolve, reject) {
                $http.get("http://www.aemet.es/es/eltiempo/prediccion/modelosnumericos/hirlam")
                    .success(function (response) {
                        hirlam = [];
                        indice = 0;
                        j=0;
                        while (indice!==-1)
                        {
                            indice = response.indexOf('/imagenes_d/eltiempo/prediccion/modelos_num/hirlam/',indice);
                            if (indice>0)
                            {
                                indice2 = response.indexOf('"',indice);
                                if (indice2>indice)
                                {
                                    ruta = "http://www.aemet.es"+response.substring(indice,indice2);
                                    altindice = response.indexOf('alt',indice2)+11;
                                    if (altindice>0)
                                    {
                                        altindice2 = response.indexOf('"',altindice);
                                        titulo = response.substring(altindice,altindice2);
                                        indice = altindice2;
                                    }
                                    hirlam.push({"id": j++, "src": ruta, "titulo": titulo});
                                }
                            }
                        }
                        resolve(hirlam);
                    });
                });
        };
    }]);
