$(function(){

  $(".dropdown-menu a").click(function(e){
    var currentId = e.target.id;
    console.log(currentId);
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());

  });

});
