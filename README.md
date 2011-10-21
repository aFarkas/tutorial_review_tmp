I. wichtigste Änderungen
================================

I. 1. Entfernung von implied globals
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



I. 2. AJAX ist asynchron
------------------

Es ist nicht bekannt, ob die Response des AJAX-Requests bereits zum Zeitpunkt des ersten timeupdate-Events erfolgreich war. Hier hätte es meherere Möglichkeiten zur Lösung gegebn, andere Techniken sind in anderen Standardsituationen eher angesagt. Die einfach if-Abfrage dürfte ausreichen. Wenn man es ernst nimmt, macht man noch einen check ob es sich um ein Array handelt.


I. 3. #area-productinfo mit CSS "verstecken"
------------------

#area-productinfo hat bei ausgeschaltetem JS keinen Sinn und soll anfangs ausgeblendet sein. Soetwas macht man dann mit CSS.


I. 4. kapseln von zusammenhängenden Code
------------------

Man sollte Spaghetti-Code vermeiden und zusammenhängenden Code entpsrechend kapseln. Hierfür gibt es sehr viele verschiedene Möglichkeiten, welche nicht alle in einem Einsteigertutorial erklärt werden können. Der Entwickler sollte eine Technik erläutern und dann auf diese konsequent aufbauen. Bei jQuery bietet sich als einfachste Möglichkeit die Kapselung in einer callback-Funktion an. Typisch hierfür:

---------------
	$('div.mein-modul').each( erstelleWasMagisches );
---------------


I. 5. mytablets $.each
------------------

mytablets ist ein Array von Strings und Zahlen und kein DOM-Object, keine DOM-Liste, kein Selektor und auch kein Array von DOM-Objekten. Der Aufruf $(Array) erstellt ein jQuery-Object mit den jQuery methoden, bind, addClass, animate etc.. Es sollte klar sein, dass diese Methoden nichts mit String und ähnlichem Anfangen können. Für Arrays gibt es die einfache Methode $.each statt $().each.

II. wichtige Änderungen
================================

II. 1. Trennung von interaktivem Script und Videoeinbindung und noConflict-Fähigkeit
------------------

Unabhängig von einer Kapselung sollte man verschiedene Aufgaben auftrennen.

In sehr vielen Content Management Systemen kann es zu erhablichen Problemen kommen, wenn sich darauf verläßt, dass $ identisch zu jQuery ist. 

II. 2. einfache konfigurierbare HTML-Componente
------------------

Hier werden nun die Konfigurationen herausgezogen. Das data-productsjson ist eine Pfadangabe die grundsätzlich im Markup sehr gut aufgebhoben ist, da das Backend die genauen Pfade kennt. Das data-for funnktioniert ähnlich wie das label[for]. Allerdings ist es eine Behelfskonstruktion. In der Regel würde ich gemeinsame zusammenhängende Componenten mit einem Container wrappen und über diesen Kontext gehen. Aber hierdurch vermeide ich nun eine Umstrukturierung.

Was haben wir hiermit geschafft. Wir haben eine Wiederverwendbare Komponente bekommen. Durch unsere Kapselung und Markup-Konfiguration können mehrere interaktive Videos auf einer Seite eingesetzt werden. Durch unsere vorangegangene Trennung, können normale Video und interaktive Produktvideos gemischt werden.
 