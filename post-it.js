$(document).ready(function(){
  // Esta es la fucnión que correrá cuando este listo el DOM 
  $("#button").click(function(){
    var title = prompt("Please enter the new board's title")
    if (title != null) {
      var board = new Board(".board", title)
      $("#menu").append("<li><a id='link_"+ board.id +"' class='link' href=''>" + board.element + "</a></li>")
    }
  });

  $("body").on('click', '.link', function(event){
    event.preventDefault();
    var id_content = $(this).attr("id")
    id_number = id_content.substr(id_content.length - 1);
    $("#" + id_number).css("visibility", "visible");
  });

});



counter = 0;

var Board = function(selector, element) {
  // Aqui deberá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $(selector);
  console.log($elem);
  this.id = counter++;
  this.element = element;
  this.postits = [];
  postits = this.postits;
  board = this;

  function save(postits){
    console.log("SAVE SAVE")
    // console.log(board)
    board.postits = postits
    console.log(board)
  }

  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $("#append_board").append("<div id='"+board.id+"'class='board'></div>")
    $("body").on("dblclick", $elem, function(event){
      // var target = $(event.target);
      // console.log(target);
      // if (target.is($elem)){    
        console.log("IN dblclick")  
        var x = event.clientX;
        var y = event.clientY;
        console.log(x);
        console.log(y);
        var postit = new PostIt(x, y);
        console.log(postit);
        postits.push(postit);
        console.log(postits);
      // } 
        console.log("ELEM")
        console.log($elem);

      $("#"+counter).append(postit.element)

      $(".header").on("mousedown", function(){
         $(".post-it").draggable({});
      })
      $(".header").on("mouseup", function(){
         $(".post-it").draggable("destroy");
      })

      $(".close").click(function(){
        var parent = $(this).parent().parent();
        
        id = parent.attr("id");
        
        var ind;
        $.each(postits, function(index, value){
          // console.log("Index en each");
          // console.log(index);
          // console.log("Value id en each");
          // console.log(value.id);
          if (value.id == id){
            ind = value;
          }
        });

        console.log("IND")
        console.log(ind);

        postits = postits.filter(function(e){return e!==ind});

        console.log("Post-its:");
        console.log(postits);

        var par = $(this).parent().parent().addClass("delete");
        par.remove();
        // find object by class in attribute element

        save(postits);

      });

    });
  };
  initialize();
};

var PostIt = function(x, y) {
  // Aquí va el código relacionado con un post-it
  this.id = counter++;
  this.element = "<div id='"+this.id+"'<div id='master' class='post-it' style='left:"+x+"px; top:"+y+"px'><div class='header'><div class='close'>X</div></div><div class='content' contenteditable='true'>...</div></div></div>" 
};

