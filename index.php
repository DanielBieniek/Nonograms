<?php

	include("head.phtml");
	
	$dir = "zagadki";
	$jakiePliki = scandir($dir);
	$iloscPlikow = count($jakiePliki);
	$nazwaPliku = 'zagadki/ryba.txt';
	echo '
		<div id="formularz">
			<form action="" method="post">
			<select name="zagadka">
	';
	for($q = 2; $q < $iloscPlikow; $q++) {
		echo '<option>'.$jakiePliki[$q].'</option>';
	}
	echo '
			<input type="submit" style="margin-left: 15px;">
			</form>
		</div>
	';
	if($_POST["zagadka"]) {
		$nazwaPliku = 'zagadki/'.$_POST["zagadka"];
	}
	$plik = file($nazwaPliku);
	$wielkosci = explode(" ",$plik[0]);
	$szerokosc = $wielkosci[0];
	$wysokosc = $wielkosci[1];
	$iloscX = 0;
	$iloscY = 0;
	
	for($m = 1; $m <= $szerokosc; $m++) {
		$x = count(explode(" ",$plik[$m]));
		if($x > $iloscX) {
			$iloscX = $x;
		}
	}
	for($n = 1 + $szerokosc; $n <= $wysokosc + $szerokosc; $n++) {
		$y = count(explode(" ",$plik[$n]));
		if($y > $iloscY) {
			$iloscY = $y;
		}
	}
	$margin = $iloscY * 28 + 1;
	$width = ($iloscY + $szerokosc) * 28 + floor($szerokosc/5) + 2;
	$czy = count(explode(" ",$plik[$m]));
	echo '<div id="wlasciwy" style="width: '.$width.'px;">';
	echo '<table id="gora" style="margin-left:'.$margin.'px;">';
		for($o = 0; $o < $iloscX; $o++) {
		echo '<tr>';
			for($k = 0; $k < $szerokosc; $k++) {
			echo '<td>';
				$v = explode(" ",$plik[$k + 1]);
				$v = array_reverse($v,false);
				echo $v[$iloscX - $o - 1];
			echo '</td>';
			}
		echo '</tr>';
		}
	echo '</table>';
	
	echo '<table id="lewo">';
		for($l = 0; $l < $wysokosc; $l++) {
		echo '<tr>';
			for($p = 0; $p < $iloscY; $p++) {
			echo '<td>';
				$w = explode(" ",$plik[$l + 1 + $szerokosc]);
				$w = array_reverse($w,false);
				echo $w[$iloscY - $p - 1];
			echo '</td>';
			}
		echo '</tr>';
		}
	echo '</table>';
	
	echo '<table id="pole">';
		for($i = 0; $i < $wysokosc; $i++) {
		echo '<tr>';
			for($j = 0; $j < $szerokosc; $j++) {
				echo '<td class="kratka">';
				echo '</td>';
			}
		echo '</tr>';
		}
	echo '</table>';
	echo '<p id="zw"></p></div>';
	echo '<span style="clear:both;">';

	include("tail.phtml");
	
?>