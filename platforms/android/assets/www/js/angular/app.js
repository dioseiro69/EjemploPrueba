//var app = angular.module("app", []);
var app = angular.module('app', ['AemetApi']);

//alert("Parando la aplicación para que se vea el icono de que no se ha podido cargar la imagen")

app.controller("PruebaController", function($scope) {
  $scope.imagenRuta = "Weather-icon.png";
  
});

/**
 * Controlador que sirve para manejar la pantalla de entrada. Muestra las zonas de navegación (zonasNavegacion)
 * y también implementa la función de buscar con el GPS la localización.
 * @param {type} param1
 * @param {type} param2
 */
app.controller('EntradaController', ['zonasNavegacion', '$scope', function (zonasNavegacion, $scope) {
        $scope.zonaSel = "";
        this.zonasNavegacion = zonasNavegacion;

        //Establecemos esta función en el scope para que pueda ser llamada por 
        //el botón GPS
             
 
    }]);

/*
 * Servicio para obtener la localización. La obtiene con HTML5 y luego usa
 * el servicio de geocoder de google para sacar la provincia.
 */

app.controller('Toast1Controller',function Ctrl($scope, $window, $timeout) {
    var messageTimer = false,
        displayDuration = 3000; // milliseconds (5000 ==> 5 seconds)

    
    
    $scope.showMessage = false;
    
    $scope.msg = "Buscando localización...";

    $scope.doGreeting = function () {
        if (messageTimer) {
            $timeout.cancel(messageTimer);
        }
   
        $scope.showMessage = true;

        messageTimer = $timeout(function () {
            $scope.showMessage = false;
        }, displayDuration);
    };
});

app.controller('ToastController', function($scope, toaster, $window) {
    
    $scope.bar = 'Hi';
    
    $scope.pop = function(){
        toaster.success({title: "title", body:"text1"});
        toaster.error("title", "text2");
        toaster.pop({type: 'wait', title: "title", body:"text"});
        toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
        toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
        toaster.pop('wait', "title", null, null, 'template');
        toaster.pop('warning', "title", "myTemplate.html", null, 'template');
        toaster.pop('note', "title", "text");
        toaster.pop('success', "title", 'Its address is https://google.com.', 5000, 'trustedHtml', function(toaster) {
            var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
            if (match) $window.open(match[0]);
            return true;
        });
        toaster.pop('warning', "Hi ", "{template: 'myTemplateWithData.html', data: 'MyData'}", 15000, 'templateWithData');
    };
    
    $scope.goToLink = function(toaster) {
      var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
      if (match) $window.open(match[0]);
      return true;
    };
    
    $scope.clear = function(){
        toaster.clear();
    };
});

