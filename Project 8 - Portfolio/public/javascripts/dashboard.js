$(document).ready(function(){
    $('.deleteProject').on('click', deleteProject);
});

function deleteProject(){
    deleteId = $(this).data('id');
    // var confirmation = confirm('Are you sure?')
    // if(confirmation){
        console.log(deleteId)
        $.ajax({
            type: 'DELETE',
            url: '/admin/delete/'+deleteId
        }).done(function(response){

        });
        window.location = '/admin';
        
    // }
    // else{
    //     return false;
    // }
}