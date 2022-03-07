<?php 
	require ('connect.php');

	if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="register"){
		$pdo->beginTransaction();
		try {
			$sql = 'INSERT INTO user(username, email, password, role) 
			VALUES(:username, :email, :password, :role)';
			$statement = $pdo->prepare($sql);
			$statement->execute([
				':username' => $_POST['user']['username'],
				':email' => $_POST['user']['email'],
				':password' => $_POST['user']['password'],
				':role' => $_POST['user']['role']
			]);
			echo $pdo->lastInsertId();
			$pdo->commit();
		} catch (Exception $e) {
			$pdo->rollback();
		}
	}

	else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action']=="getusers_admin"){
		$sql = "SELECT * FROM user";
		$statement = $pdo->query($sql);
		$users = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($users);
	}

	else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action']=="getusers_client"){
		$sql = "SELECT * FROM user";
		$statement = $pdo->query($sql);
		$users = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($users);
	}

    else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="login"){
		$pdo->beginTransaction();
		try {
			$query = "SELECT * FROM user where (username = :both OR email = :both) AND password = :password AND role = :role";
		    $statement = $pdo->prepare($query);
            $statement->execute(
                array(
                    'both' => $_POST['user']['both'],
				    'password' => $_POST['user']['password'],
					'role' => $_POST['user']['role']
                )
            );
            $user = $statement->rowCount();
            if ($user>0) {
                $response = array("status" => "success");       
                $pdo->commit();
            }
            else{
                $response = array("status" => "error");
            }
            echo json_encode($response);
		} catch (Exception $e) {
			$pdo->rollback();
		}
	}

	else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="edit"){
		$pdo->beginTransaction();
		try {
			$id2 = $_POST['user2']['id2'];
			$username2 = $_POST['user2']['username2'];
			$email2 = $_POST['user2']['email2'];
			$password2 = $_POST['user2']['password2'];
			$role2 = $_POST['user2']['role2'];

			$sql = "UPDATE user SET 
			username = '$username2', 
			email = '$email2', 
			password = '$password2',
			role = '$role2',  
			WHERE id = '".$id2."'";

			$statement = $pdo->prepare($sql);
			$statement->execute();
			$result = $statement->rowCount();
			
            if ($result>0) {
                $response = array("status" => "success");       
                $pdo->commit();
            }
            else{
                $response = array("status" => "error");
            }
            echo json_encode($response);
		} catch (Exception $e) {
			$pdo->rollback();
		}
	}

 ?>

 
