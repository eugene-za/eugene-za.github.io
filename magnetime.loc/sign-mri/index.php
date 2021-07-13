<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> -=- МАГНИ ТАЙМ -=- Запись на МРТ </title>
<meta name="Keywords" content="МАГНИТАЙМ">
<meta name="Description" content="МАГНИТАЙМ"><link rel="stylesheet" href="../style/style.css">
<script type="text/javascript">
function height() {
	function getDocHeight() {
		var D = document;
		return Math.max(
			Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
			Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
			Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		};
		var s = document.getElementById('content').style;
		s.height = ""+getDocHeight() - 236+"px"
}
</script>
</head>

<body onload="height()">
<div id="wrapper" class="wrapper-border-rad">
    <div id="header">
    	<div id="header-top">НОВЫЙ ВЗГЛЯД НА МЕДИЦИНУ В ЦЕЛОМ!</div>
        <img src="../style/img/header-logo.png" id="logo" />
        <img src="../style/img/header-mrt.png" />
    </div>

    <div id="left-side">
        <div id="ls-first" class="ls-radius-shadow">Первые в Украине<br />и первые в Одессе<br />абсолютно безвредные<br />магнитно-резонансные<br />томографы открытого типа<br />"Magnetom Espree" и<br />"Magnetom Concerto"</div>
        <div id="ls-mrt" class="ls-radius-shadow">
            <img src="../img/ls-slide4.png" />
            <div>МРТ молочной железы</div>
        </div>
        <div id="ls-contacts">
        	<span id="ls-contacts-tel">Тел./факс:<br />(0482) <span>37-20-20</span></span>
            <span id="ls-contacts-addr">ЦЕНТР МЕДИЦИНСКОЙ<br />ДИАГНОСТИКИ "МАГНИ ТАЙМ"<br />65044 Украина, г. Одесса,<br />ул. Мариинская</span>
        </div>
    </div>
    <div id="content" class="wrapper-border-rad">
    	<div class="cont-border-img" style="top:-5px; right:0"></div>
        <div class="cont-border-img" style="bottom:0; left:-5px"></div>
        <div id="top-menu-wrapper">
            <ul id="top-menu">
                <li><a href="../">ГЛАВНАЯ</a></li>
                <li><a href="../service/">УСЛУГИ</a></li>
                <li><a href="../opportunity/">ВОЗМОЖНОСТИ</a></li>
                <li><a href="" onclick="return false" class="menu-active">ЗАПИСЬ НА МРТ</a></li>
                <li><a href="../contacts/">КОНТАКТЫ</a></li>
            </ul>
        </div>
    	<div id="cont-shape" class="wrapper-border-rad">
        	<div id="content-wrapper" class="contacts"><!--Для контента-->

<?
    $action = $_POST;
    if (!empty($action))
    {
        if (!empty($_POST["entry"]) && !empty($_POST["time"]) && !empty($_POST["phone"]) && !empty($_POST["name"]))
        {
            $check = '';
            if (is_array($_POST["entry"]))
                {
                    $check = implode("<br />", $_POST["entry"]);
                }
            $recipient = "ez010286@gmail.com";
            $subject = "Запись на МРТ";
            $message = "<html>\n
                            <body>\n\n<br />
                                Пациент - <b>".$_POST["name"]."</b><br />\n
                                Номер телефона - <b>".$_POST["phone"]."</b><br />\n
                                Желаемый день недели - <b>".$_POST["day"]."</b><br />\n
                                Желаемое время - <b>".$_POST["time"]."</b><br />\n
                                МРТ каких органов: <br /><b>".$check."</b><br />\n
                            </body>\n
                     </html>\n";
            $headers = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'From: Magnetime.com.ua';
            $verify = mail($recipient, $subject, $message, $headers);
            if ($verify == true)
            {
                echo "<p style='color:green'>Ваша заявка отправлена успешно, в течение часа мы Вам перезвоним.</p>
                    <input type='button' value='Назад' onclick=\"location.href=''\" />";
            }
            else
            {
                echo "<p style='color:red'>Сообщение не отправлено</p>
                <input type='button' value='Назад' onclick=\"location.href=''\" />";
            }
        }
        else
        {
            echo "<p style='color:red'>Пожалуйста, заполните все поля формы.</p>";
            include "form.php";
        }
    }
    if (empty($action))
    {
        echo "<div>Для того чтобы записаться на магнитно-резонансную томографию, заполните эту форму и нажмите внизу кнопку \"Готово\"</div>";
        include "form.php";
    }
?>
            </div>
		</div>
	</div>
</div>
</body>
</html>