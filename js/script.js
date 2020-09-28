$(document).ready(function(){

  $(".input_element").val("");

  viewElement();

  $("#click_input_element").click(function () {
    addElement();
    $(".input_element").val("");
  });

  $("#list_element").on("click", ".delete_element", function () {
    var element = $(this).parent();
    var id = element.attr("id");
    deleteElement(element, id);
  });

});

function viewElement() {
  $.ajax(
    {
      "url": "http://157.230.17.132:3009/todos",
      "method": "GET",
      "success": function(data) {
        renderElement(data);
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
}

function deleteElement(element, id) {
  $.ajax(
    {
      "url": "http://157.230.17.132:3009/todos/"+ id,
      "method": "DELETE",
      "success": function(data) {
        element.remove();
      },
      "error" : function(error) {
        alert("ERRORE!");
      }
    }
  );
}

function addElement() {
  var input = $(".input_element").val().toLowerCase();
  if (input != "") {
    $.ajax(
      {
        "url": "http://157.230.17.132:3009/todos",
        "method": "POST",
        "data" : {
          "text" : input
        },
        "success": function(data) {
          renderAddElement(data);
        },
        "error" : function(error) {
          alert("ERRORE!");
        }
      }
    );
  }
}

function renderElement (data) {
  var source = $("#list_template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++) {
    var context = {
      "id" : data[i].id,
      "text" : data[i].text
    };
    var html = template(context);
    $("#list_element").append(html);
  }
}

function renderAddElement (data) {
  var source = $("#list_template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id" : data.id,
    "text" : data.text
  };

  var html = template(context);
  $("#list_element").append(html);
}

function modifyElement() {

}
