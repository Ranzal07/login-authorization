$(document).ready(function(){
    var show;
    var user={};

    $(document).on("click",".showBTN", function(){
        if(show==1){
            document.getElementById('password').type='password';
            document.getElementById('showBTN').innerHTML='SHOW';  
            show=0;
        }
        else{
            document.getElementById('password').type='text';
            document.getElementById('showBTN').innerHTML='HIDE';  
            show=1;    
        }
    });

    function login(e){
        user.both = $('#both').val();
        user.password = $('#password').val();
        user.role = $('#role').val();
        var show_error = document.getElementById('response_error');
        
        $.ajax({
            type:"POST",
            data:{action:"login", user:user},
            url:"src/php/user.php",
            dataType: 'json',
            success:function(response){
                if(response.status=="success"){
                    if(user.role == 'client'){
                        window.location.href = "client.html";
                    }
                    else{
                        window.location.href = "admin.html";
                    }
                }
                else{
                    show_error.style.display = "block";
                    setTimeout(function(){
                        show_error.style.display = "none";
                    }, 2500);
                    $('#both').val('')
                    $('#password').val('')
                }
            },
        });
        e.preventDefault();
    }
    $("#login-form").submit(login);
})