$(function() {
  // Esta es la fucnión que correrá cuando este listo el DOM 
  new Board('#board');
});


var Board = function(selector) {
  // Aqui deberá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $(selector);
  
  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $elem.dblclick(function(event){
      var x = event.clientX;
      var y = event.clientY;
      console.log(x);
      console.log(y);
      var postit = new PostIt(x, y);
      $elem.append(postit.element)
      // leer las posisiones donde se hizo el doble click y después
      // pasaselas al post-it
      $(".header").on("mousedown", function(){
         $(".post-it").draggable({});
      })
      $(".header").on("mouseup", function(){
         $(".post-it").draggable("destroy");
      })

      $(".close").click(function(){
        $(this).addClass("delete")
        var par = $(".delete").parent().parent();
        par.remove();
      });
    });
  };

  initialize();
};

var PostIt = function(x, y) {
  // Aquí va el código relacionado con un post-it
  this.element = "<div id='master' class='post-it' style='left:"+x+"px; top:"+y+"px'><div class='header'><div class='close'>X</div></div><div class='content' contenteditable='true'>...</div></div>" 
};

