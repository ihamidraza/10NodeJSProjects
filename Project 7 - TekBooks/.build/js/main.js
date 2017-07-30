$(document).ready(function () {
    $('.removeBook').click(function (e) {
        
        deleteId = $(this).data('id');
        
        
        $.ajax({
            url: '/manage/books/delete/' + deleteId,
            type: 'DELETE',
            success: function () {
                alert('Book Deleted...'+ deleteId);
            }
        });
        window.location = '/manage/books';
    });
});
$(document).ready(function () {
    $('.removeCategory').click(function (e) {
        
        deleteId = $(this).data('id');
        
        
        $.ajax({
            url: '/manage/categories/delete/' + deleteId,
            type: 'DELETE',
            success: function () {
                alert('Category Deleted...'+ deleteId);
            }
        });
        window.location = '/manage/categories';
    });
});
