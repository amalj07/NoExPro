$(document).ready( () => {
  $('.delete-article').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/articles/'+id,
      success: (response) => {
        alert('Delete article?');
        window.location.href='/';
      },
      erorr: (error) => {
        console.log(error);
      }
    });
  });
});
