<?php
    session_start();
    session_destroy();
    session_abort();
    ?>

    <script>
        location.replace("../../index.php");
    </script>