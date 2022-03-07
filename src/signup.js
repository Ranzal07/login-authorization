$(document).ready(function(){
    var user={};
    var show;
    var pass1 = document.getElementById('password');
    var showBTN = document.getElementById('showBTN');
    var strength = document.getElementById('strength_pass');
    var pass2 = document.getElementById('confirm_pass');
    var showBTN2 = document.getElementById('showBTN2');
    var confirm = document.getElementById('confirm_text');

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

    $(document).on("click",".showBTN2", function(){
        if(show==1){
            document.getElementById('confirm_pass').type='password';
            document.getElementById('showBTN2').innerHTML='SHOW';  
            show=0;
        }
        else{
            document.getElementById('confirm_pass').type='text';
            document.getElementById('showBTN2').innerHTML='HIDE';  
            show=1;    
        }
    });

    function strengthPass() {
        let regExpWeak = /[a-z]/;
        let regExpMedium = /\d+/;
        let regExpStrong = /[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
        
        var pass1 = document.getElementById('password').value;
        var no;
        
        if(pass1 != ""){
            pass2.style.display = "block";
            showBTN2.style.display = "block";

            if(pass1.length <= 3 && ((pass1.match(regExpWeak) || pass1.match(regExpMedium) || pass1.match(regExpStrong))))
                no = 1;
            if(pass1.length >= 4 && ((pass1.match(regExpWeak) && pass1.match(regExpMedium)) || (pass1.match(regExpMedium) && pass1.match(regExpStrong)) || (pass1.match(regExpWeak) && pass1.match(regExpStrong))))
                no = 2;
            if(pass1.length >= 7 && pass1.match(regExpWeak) && pass1.match(regExpMedium) && pass1.match(regExpStrong))
                no = 3;

            if(no==1){
                strength.style.display = "block";
                strength.style.color = "red";
                strength.textContent = "Your password is weak!"; 
            }
            if(no==2){
                strength.style.display = "block";
                strength.style.color = "orange";
                strength.textContent = "Your password is medium!"; 
            }
            if(no==3){
                strength.style.display = "block";
                strength.style.color = "rgb(15, 226, 26)";
                strength.textContent = "Your password is strong!";
            }
        }
        else{
            pass2.value = "";
            strength.style.display = "none"; 
            pass2.style.display = "none";
            showBTN2.style.display = "none";
        }
    }

    function matchPass() {
        var pass1 = document.getElementById('password').value;
        var pass2 = document.getElementById('confirm_pass').value;

        if(pass2 != ""){
            if(pass1 == pass2){
                confirm.style.display = "block";
                confirm.style.color = "rgb(15, 226, 26)";
                confirm.textContent = "These passwords matched!";
            }
            else{
                confirm.style.display = "block";
                confirm.style.color = "yellow";
                confirm.textContent = "These passwords do not matched!";
            }
        }
        else{
            confirm.style.display = "none";
        }
    }

    function register(e){
        user.username = $('#username').val();
        user.email = $('#email').val();
        user.password = $('#password').val();
        user.confirm_pass = $('#confirm_pass').val();
        user.role = $('#role').val();

        if (user.password == user.confirm_pass){
            $.ajax({
                type:"POST",
                data:{action:"register", user:user},
                url:"src/php/user.php",
                success:function(){
                    swal({
                        text: "New member added successfully!",
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });
                    $('#username').val('');
                    $('#email').val('');
                    $('#password').val('');
                    $('#confirm_pass').val('');

                    strength.style.display = "none";
                    pass2.style.display = "none";
                    showBTN2.style.display = "none";
                    confirm.style.display = "none";      
                    
                    pass1.type='password';
                    showBTN.innerHTML='SHOW'; 
                    pass2.type='password';
                    showBTN2.innerHTML='SHOW';  
                },
            });
        }
        else{
            swal({
                text: "Opps... failed to add new member!",
                icon: "error",
                timer: 2000,
                buttons: false
            });
        }
        e.preventDefault();
    }
    
    pass1.addEventListener("keyup", strengthPass);
    pass1.addEventListener("keyup", matchPass);
    pass2.addEventListener("keyup", matchPass);
    $("#signup-form").submit(register);
})