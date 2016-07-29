$(function() {
  // Esta es la fucnión que correrá cuando este listo el DOM 
  $("#button").click(function(){
    var title = prompt("Please enter the new board's title")
    if (title != null) {
      var board = new Board("#board", title)
      $("#menu").append("<li><a id='link' href=''>" + board.element + "</a></li>")
    }
  })
});



counter = 0;

var Board = function(selector, title) {
  // Aqui deberá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $(selector);
  this.element = title;
  this.postits = [];
  postits = this.postits;
  board = this;
  console.log("BOARD");
  console.log(this);

  function save(postits){
    console.log("SAVE SAVE")
    console.log(board)
    board.postits = postits
    console.log(board)
  }

  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $elem.dblclick(function(event){
      var target = $(event.target);
      if (target.is($elem)){      
      var x = event.clientX;
      var y = event.clientY;
      var postit = new PostIt(x, y);
      postits.push(postit);
    } 

      $elem.append(postit.element)
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
          console.log("Index en each");
          console.log(index);
          console.log("Value id en each");
          console.log(value.id);
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

