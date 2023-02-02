<?php
    $con = new mysqli("localhost","root","");
    include "config.php";

    /*CREAMOS BASE DE DATOS */
    $se = "DROP DATABASE IF EXISTS $db";
    $consulta = $con->prepare($se);
    $consulta->execute();
    $consulta->close();

    $se = "CREATE DATABASE IF NOT EXISTS $db";
    $consulta = $con->prepare($se);
    $consulta->execute();
    $consulta->close();
    echo"BASE DE DATOS CREADA";

    $con->select_db($db);
    /*CREAMOS TABLA*/
    $se = "CREATE TABLE $table
    (
        id VARCHAR(20),
        title VARCHAR(50),
        category VARCHAR(50),
        img VARCHAR(500),
        price DECIMAL(6,2),
        launch DATE,
        video VARCHAR(100),
        PRIMARY KEY(id)
    )";
    $consulta = $con->prepare($se);
    $consulta->execute();
    $consulta->close();
    
    /*INSERTAMOS DATOS*/
    $se = "INSERT INTO $table (id, title, category, img, price, launch, video) VALUES
	('rec43w3ipXvP28vog', 'The Evil Within 2', 'Survival-Horror', 'https://s1.gaming-cdn.com/images/products/2133/616x353/the-evil-within-2-pc-juego-steam-cover.jpg?v=1650450943', '5.99', '2017/05/23', 'https://www.youtube.com/embed/vSAbHd1J4Us'),
	('rec43w3ipXvP28xog', 'Outer Wilds', 'Mejor juego de la historia', 'https://s1.gaming-cdn.com/images/products/2586/616x353/outer-wilds-pc-juego-steam-cover.jpg?v=1671637488', '9.16', '2017/03/14', 'https://www.youtube.com/embed/d6LGnVCL1_A'),
	('rec43w3ipXvP243vo3', 'Resident Evil Village', 'Survival-Horror', 'https://s3.gaming-cdn.com/images/products/6329/616x353/resident-evil-village-pc-juego-steam-cover.jpg?v=1651568947', '14.32', '2021/05/23', 'https://www.youtube.com/embed/ztj8fv6Ttp8'),
	('rec4343ipXvP243vo3', 'Metro Exodus', 'Mundo Abierto', 'https://s3.gaming-cdn.com/images/products/6512/616x353/metro-exodus-gold-edition-gold-edition-pc-juego-steam-cover.jpg?v=1651160153', '7.16', '2019/02/23', 'https://www.youtube.com/embed/l3dfIglDzAs'),
	('rec4343ipXvP243vr3', 'Days Gone', 'Mundo Abierto', 'https://s3.gaming-cdn.com/images/products/6791/616x353/days-gone-pc-juego-steam-cover.jpg?v=1651574197', '9.99', '2019/05/19', 'https://www.youtube.com/embed/FKtaOY9lMvM'),
	('rec4343ipXvK243vo3', 'Fallout: New Vegas', 'Mundo Abierto', 'https://s3.gaming-cdn.com/images/products/155/616x353/fallout-new-vegas-ultimate-ultimate-pc-juego-steam-europe-cover.jpg?v=1662374421', '2.99', '2019/05/19', 'https://www.youtube.com/embed/l-x-1fm2cq8'),
	('rec4343ipXvKyt3vo3', 'Elden Ring', 'Souls', 'https://s1.gaming-cdn.com/images/products/4824/616x353/elden-ring-pc-juego-steam-europe-cover.jpg?v=1650985585', '42', '2021/05/19', 'https://www.youtube.com/embed/l-x-1fm2cq8'),
	('rec4343ipXvKyt3xh3', 'Dark Souls', 'Souls', 'https://s1.gaming-cdn.com/images/products/2364/616x353/dark-souls-remastered-pc-juego-steam-cover.jpg?v=1657531277', '24', '2012/04/19', 'https://www.youtube.com/embed/l-x-1fm2cq8'),
	('rec4343FpXvKyt3xh3', 'Dark Souls III', 'Souls', 'https://s3.gaming-cdn.com/images/products/857/616x353/dark-souls-3-pc-juego-steam-cover.jpg?v=1644693960', '27.99', '2017/04/19', 'https://www.youtube.com/embed/l-x-1fm2cq8'),
	('rec4343FpXvGZt3xh3', 'Hogwarts Legacy', 'Mundo Abierto', 'https://s2.gaming-cdn.com/images/products/7072/616x353/hogwarts-legacy-pc-juego-steam-europe-cover.jpg?v=1673455163', '45.99', '2023/02/10', 'https://www.youtube.com/embed/l-x-1fm2cq8'),
	('rec4343ipXer763vo3', 'Minecraft', 'Sandbox', 'https://s2.gaming-cdn.com/images/products/442/616x353/minecraft-java-y-bedrock-edition-pc-juego-cover.jpg?v=1671725699', '25.99', '2009/05/09', 'https://www.youtube.com/embed/chuRE9nxLT4'),
	('rec4343ipXer763vx3', 'God of War 4', 'Mundo Abierto', 'https://s3.gaming-cdn.com/images/products/7325/616x353/god-of-war-pc-juego-steam-cover.jpg?v=1668157899', '21.99', '2018/05/23', 'https://www.youtube.com/embed/K0u_kAWLJOA'),
	('rec4343ipXesw63vo3', 'Horizon Zero Dawn', 'Mundo Abierto', 'https://s2.gaming-cdn.com/images/products/6202/616x353/horizon-zero-dawn-complete-edition-pc-juego-steam-cover.jpg?v=1651566259', '6.54', '2017/05/23', 'https://www.youtube.com/embed/_BvZvkT5QHw'),
	('rec4343ipXesw6svo3', 'Call of Duty: Modern Warfare II', 'FPS', 'https://s3.gaming-cdn.com/images/products/12827/616x353/call-of-duty-modern-warfare-ii-cross-gen-bundle-xbox-one-xbox-series-x-s-cross-gen-bundle-xbox-one-xbox-series-x-s-juego-microsoft-store-cover.jpg?v=1669138987', '40.25', '2022/07/22', 'https://www.youtube.com/embed/VWqqQUhzSDg'),
	('QWc4343ipXesw63vo3', 'Sniper Elite 4', 'FPS', 'https://s3.gaming-cdn.com/images/products/8864/616x353/sniper-elite-4-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-juego-microsoft-store-europe-cover.jpg?v=1654528086', '23.99', '2021/05/21', 'https://www.youtube.com/embed/lGBRAEvXZ94'),
	('QWc4343ipXesw7ovo3', 'SCORN', 'Aventura', 'https://s3.gaming-cdn.com/images/products/8255/616x353/scorn-pc-juego-steam-cover.jpg?v=1665734659', '10', '2022/05/23', 'https://www.youtube.com/embed/imuJeL51A0E'),
	('QWc434yipXesw7ovo3', 'Hollow Knight', 'Aventura', 'https://s3.gaming-cdn.com/images/products/2198/616x353/hollow-knight-pc-mac-juego-steam-cover.jpg?v=1649252899', '15.25', '2019/05/23', 'https://www.youtube.com/embed/UAO2urG23S4'),
	('QWc4341ipXesw7ovo3', 'Imp Of The Sun', 'Aventura', 'https://s2.gaming-cdn.com/images/products/10666/616x353/imp-of-the-sun-pc-juego-steam-cover.jpg?v=1649358538', '12.5', '2022/09/23', 'https://www.youtube.com/embed/9CTHxgiROtU'),
	('QWc4323ipXesw7ovo3', 'The Knight Witch', 'Aventura', 'https://s2.gaming-cdn.com/images/products/10948/616x353/the-knight-witch-pc-juego-steam-cover.jpg?v=1669797506', '9.99', '2022/02/22', 'https://www.youtube.com/embed/9CTHxgiROtU'),
	('QWc4323ipXesw7lvo3', 'Goat Simulator 3', 'Sandbox', 'https://s2.gaming-cdn.com/images/products/12121/616x353/goat-simulator-3-pc-juego-epic-games-europe-cover.jpg?v=1673341137', '10.99', '2022/08/22', 'https://www.youtube.com/embed/-t0VIf0GAl8'),
	('QWc4323ipXesw7lbo3', 'Kerbal Space Program', 'Sandbox', 'https://s1.gaming-cdn.com/images/products/918/616x353/kerbal-space-program-pc-mac-juego-steam-cover.jpg?v=1666359335', '3.99', '2015/03/12', 'https://www.youtube.com/embed/aA');";

    $consulta=$con->prepare($se);
    $consulta->execute();
    $consulta->fetch();
    $consulta->close();
    $con->close();
    echo"<br>INSERCIONES CORRECTAS";
?>