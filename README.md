Entfernung von implied globals
------------------

global variablen sind oft böse, da sie zu namenskolissionen führen und die Möglichkeit HTML-Komponenten/Module zu erstellen deutlich erwerschweren unöglich machen.

implied Variablen sind einen zacken schärfer und immer böse. Entwickler können nicht auf einen Blick erkennen, ob dies unbeabsichtigt war oder ob die Variable in einer anderen Datei vorher deklariert wurde etc. Wenn eine globale Variable eingeführt werden soll, sollte man dies ausdrücklich machen.

---------------
	window.mytablets = [];
---------------

Variablen sind am Anfang der function, in der sie gültig sein sollen, zu deklarieren.

---------------
	function foo(){
		var inFooUndBarVar = 1;
		
		function bar(){
			var in BarVar = 2;
		}
	}
---------------



AJAX ist asynchron
------------------

Es ist nicht bekannt, ob die Response des AJAX-Requests bereits zum Zeitpunkt des ersten timeupdate-Events erfolgreich war. Hier hätte es meherere Möglichkeiten zur Lösung gegebn, andere Techniken sind in anderen Standardsituationen eher angesagt. Die einfach if-Abfrage dürfte ausreichen. Wenn man es ernst nimmt, macht man noch einen check ob es sich um ein Array handelt.