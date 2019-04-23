<?php
/*
$tm = time();
$fil = "shared_code/" . string($tm) . ".shared.txt";
echo $fil;
if (strlen($_REQUEST["shared_code"] > 16384)) {
	die("File too large");
}
$fptr = fopen($fil, "w") or die("Unable to create share!");
fwrite($fptr, $_REQUEST["shared_code"]);
fclose($fptr);
echo $tm;
 */
?>
