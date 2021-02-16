<?php
require_once './dbConn.php';
/** @var $pdo \PDO */


?>


<?php include './partials/header.php' ?>


<div class="wrap">
    <div class="container">
        <div class="container-2-box">
            <p style="text-align: center;" class="heading-2 margin-b-3">Dashboard</p>

            <label for="" class="heading-1">Enter website name</label>
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
                <button class="btn" id="generate">Save to database</button>
            </div>



        </div>

    </div>
</div>


<?php include './partials/footer.php' ?>
<script src="./js/app.js"></script>
