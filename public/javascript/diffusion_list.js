
$( document ).ready(function(){
    $(".deleteButton").click(function(){
        var id_to_remove = $(".deleteButton").parent().parent().children("td.hidden.people_id").html();
        $.post("/admin/contacts_list/delete", {people_id:""+id_to_remove},function(data, status){
            if(data["type"] == "success"){
                location.reload();
            }else{
                //error
            }
        });
    });
});


