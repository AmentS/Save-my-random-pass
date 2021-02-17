<?php
require_once './dbConn.php';
/** @var $pdo \PDO */

$statment = $pdo->prepare('select * from web_save');

$statment->execute();
$passwords = $statment->fetchAll(PDO::FETCH_ASSOC);

?>


<?php include './partials/header.php' ?>


<div class="wrap">
    <div class="container">
        <div class="container-2-box">
            <p style="text-align: center;" class="heading-2 margin-b-3">Dashboard</p>

            <label for="" class="heading-1" id="label">Enter website name</label>
            <input type="text" id="web-site" class="input-t">

            <input type="text" id="result" class="input-t margin-t-1"
                   placeholder="Generated password"
                   disabled>
            <a style="" id="clipboard" class="copy">copy</a>

            <div class="check-box">
                <div class="check-box-small">
                    <div class="settings">
                        <label for="" class="heading-1">Password length</label>
                        <input type="number" style="width: 40px" class="input-t-small" id="length" min='4' max='20'
                               value='20'>
                    </div>
                    <div class="settings">
                        <label for="" class="heading-1">Uppercase letters</label>
                        <input type="checkbox" id="uppercase" checked/>
                    </div>
                    <div class="settings">
                        <label for="" class="heading-1">Lowercase letters</label>
                        <input type="checkbox" id="lowercase" checked/>
                    </div>

                </div>
                <div class="check-box-small">
                    <div class="settings">
                        <label for="" class="heading-1">Numbers</label>
                        <input type="checkbox" id="numbers" checked/>
                    </div>
                    <div class="settings">
                        <label for="" class="heading-1">Symbols</label>
                        <input type="checkbox" id="symbols" checked/>
                    </div>
                    <button class="btn" id="generate">Generate password</button>
                </div>
            </div>
            <div class="settings">
                <button class="btn" id="save">Save to database</button>
            </div>

            <div class="box-hidden">
                <div class="show"><a class="allPass">Show saved passwords</a></div>
                <div class="hidden" id="hidden">

                </div>
            </div>

        </div>

    </div>
</div>


<?php include './partials/footer.php' ?>
<script src="./js/app.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script>
    document.addEventListener('click', e => {

        if (e.target.classList.contains('allPass')) {
            const meni = document.querySelector(".hidden");
            meni.classList.toggle("show");

        }
    });



</script>
