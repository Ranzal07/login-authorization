$(document).ready(function(){
    var users={};

    function getUsers(){
		$.ajax({
			type:"GET",
			data:{action:"getusers_admin"},
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

    function appendUser(user, table){	
		row = "<tr>"+
                "<td id='id'>" + "<b>" + user.id + "</b>" +"</td>"+
				"<td id='username'>" + user.username +"</td>"+
				"<td id='email'>" + user.email +"</td>"+
				"<td id='password'>" + user.password +"</td>"+
				"<td id='role'>" + user.role +"</td>"+
                "<td>" + 
                "<button type='button'" + "class='btn btn-primary edit'" + "id='editBTN'" + "<b>EDIT</b>" + "</button>" + 
                "<button type='submit'" + "class='btn btn-success save'" + "id='saveBTN'" + "<b>SAVE</b>" + "</button>" +
                "<button type='button'" + "class='btn btn-warning cancel'" + "id='cancelBTN'" + "<b>CANCEL</b>" + "</button>" +
                "<button type='button'" + "class='btn btn-danger delete'" + "id='deleteBTN'" + "<b>DELETE</b>" + "</button>" +
                "</td>" +
			  "</tr>";		
		table.append(row);
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

    function save_valueAppend(this_row){
        var user = {};
        var user2 = {};

        user.username = this_row.find('#username').val();
        user.email = this_row.find('#email').val();
        user.password = this_row.find('#password').val();
        user.role = this_row.find('#role').val();

        user2.id2 = this_row.find('#id').val();
        user2.username2 = $('#username2').val();
        user2.email2 = $('#email2').val();
        user2.password2 = $('#password2').val();
        user2.role2 = $('#role2').val();
        
        $.ajax({
			type:"POST",
			data:{action:"edit", user2:user2},
			url:"src/php/user.php",
            dataType: 'json',
			success:function(response){
				if(response=='success'){
					this_row.find('#id2').remove();
                    this_row.find('#username2').remove();
                    this_row.find('#email2').remove();
                    this_row.find('#password2').remove();
                    this_row.find('#role2').remove();
                    
					this_row.find('td:eq(1)').text(user2.username2);
                    this_row.find('td:eq(2)').text(user2.email2);
                    this_row.find('td:eq(3)').text(user2.password2);
                    this_row.find('td:eq(4)').text(user2.role2);
					
                    allUsers();
					swal({
						text: "User Account updated successfully!",
						icon: "success",
						timer: 1500,
						buttons: false
					});
				}else{
                    this_row.find('#id2').remove();
                    this_row.find('#username2').remove();
                    this_row.find('#email2').remove();
                    this_row.find('#password2').remove();
                    this_row.find('#role2').remove();
                
					this_row.find('td:eq(1)').text(user.username);
                    this_row.find('td:eq(2)').text(user.email);
                    this_row.find('td:eq(3)').text(user.password);
                    this_row.find('td:eq(4)').text(user.role);
                    allUsers();

                    swal({
						text: "Opps... failed to save the edit!",
						icon: "error",
						timer: 1500,
						buttons: false
					});
				}
			},
		});
    }

    function cancel_valueAppend(this_row){
        var username = this_row.find('#username').val();
        var email = this_row.find('#email').val();
        var password = this_row.find('#password').val();
        var role = this_row.find('#role').val();

        this_row.find('#username2').remove();
        this_row.find('#email2').remove();
        this_row.find('#password2').remove();
        this_row.find('#role2').remove();

        this_row.find('td:eq(1)').append(username);
        this_row.find('td:eq(2)').append(email);
        this_row.find('td:eq(3)').append(password);
        this_row.find('td:eq(4)').append(role);
    }

    var this_row = null;
    $(document).on("click","#editBTN", function(){ 
        this_row = $(this).closest('tr');

        var username2 = $("<input " + 
                            "id='username2' " + 
                            "type='text'/>");
        var email2 = $("<input " + 
                         "id='email2' " + 
                         "type='text'/>");
        var password2 = $("<input " + 
                            "id='password2' " + 
                            "type='text'/>");
        var role2 = $("<select id='role2'>" +
                        "<option value='client'>client</option>" + 
                        "<option value='admin'>admin</option></select>");

        this_row.find('#editBTN').css({'display': 'none'});;
        this_row.find('#saveBTN').css({'display': 'inline-block'});
        this_row.find('#cancelBTN').css({'display': 'inline-block'});
        this_row.find('#deleteBTN').css({'display': 'none'});;
        this_row.css({'background-color': 'rgb(28, 8, 119)'}); 
        
        var data = this_row.children('td').map(function(){
            return $(this).text();
        }).get();

        this_row.find('td:eq(1)').html(username2);
        this_row.find('#username2').val(data[1]);
        this_row.find('td:eq(2)').html(email2);
        this_row.find('#email2').val(data[2]);
        this_row.find('td:eq(3)').html(password2);
        this_row.find('#password2').val(data[3]);
        this_row.find('td:eq(4)').html(role2);
        this_row.find('#role2').val(data[4]);

        this_row.find('#id').val(data[0]);
        this_row.find('#username').val(data[1]);
        this_row.find('#email').val(data[2]);
        this_row.find('#password').val(data[3]);
        this_row.find('#role').val(data[4]);
    });

    $(document).on("click","#saveBTN", function(){
        this_row = $(this).closest('tr');

        this_row.find('#editBTN').css({'display': 'inline-block'});
        this_row.find('#saveBTN').css({'display': 'none'});
        this_row.find('#cancelBTN').css({'display': 'none'});
        this_row.find('#deleteBTN').css({'display': 'inline-block'});

        save_valueAppend(this_row);
    });

    $(document).on("click","#cancelBTN", function(){
        this_row = $(this).closest('tr');

        var data = this_row.children('td').map(function(){
            return $(this).text();
        }).get();
        
        this_row.find('#editBTN').css({'display': 'inline-block'});
        this_row.find('#saveBTN').css({'display': 'none'});
        this_row.find('#cancelBTN').css({'display': 'none'});
        this_row.find('#deleteBTN').css({'display': 'inline-block'}); 

        cancel_valueAppend(this_row, data);
        allUsers();
    });

    $(document).on("click", "#deleteBTN", function(){  
        this_row = $(this).closest('tr');

        swal({
			text: "Are you sure you want to delete this member?",
			icon: "warning",
			buttons: ["NO", "YES"],
			dangerMode: true,
		})
		.then((willDelete) => {
			if(willDelete){
				this_row.remove();
            }
		});
    });  
    getUsers();
})