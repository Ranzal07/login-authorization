$(document).ready(function(){
    function getUsers(){
		$.ajax({
			type:"GET",
			data:{action:"getusers_client"},
			url:"src/php/user.php",
			success:function(response){
				users = jQuery.parseJSON(response);
				var table = $("#member_table tbody");
				for(var i = 0; i < users.length; i++){
					appendUser(users[i], table);
				}	
				allUsers();
			},
		});
	}

	function allUsers(){
        var rows = document.querySelectorAll('td');
        var parent;
        rows.forEach((row) => {
            if (row.innerHTML == 'admin') {
                parent = row.parentNode;
                parent.style.backgroundColor = 'rgb(47, 4, 53)';
                parent.style.color = 'rgb(177, 65, 65)';
            }
            else if (row.innerHTML == 'client'){
                parent = row.parentNode;
                parent.style.backgroundColor = '#1d0c50';
                parent.style.color = '#e9e6e6';
            }
        });
    }

    function appendUser(user, table){	
		row = "<tr>"+
				"<td>" + user.username +"</td>"+
				"<td>" + user.email +"</td>"+
				"<td>" + user.role +"</td>"+
			  "</tr>";		
		table.append(row);
	}
    getUsers();
})