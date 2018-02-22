$(document).ready(function(){
    $('.deletebook').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('bookId');
      $.ajax({
        type:'DELETE',
        url: '/book/'+id,
        success: function(response){
          alert('Deleting book');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });
  