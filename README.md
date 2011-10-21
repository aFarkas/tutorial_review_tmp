I. wichtigste Änderungen
================================

I. 1. [Entfernung von implied globals](https://github.com/aFarkas/tutorial_review_tmp/commit/f5cfe4a9b88d389edb63be956c69bbb5d8c7c673)
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



I. 2. [AJAX ist asynchron](https://github.com/aFarkas/tutorial_review_tmp/commit/cd33a169daada6fa0143598282f25071189890e3)
------------------

Es ist nicht bekannt, ob die Response des AJAX-Requests bereits zum Zeitpunkt des ersten timeupdate-Events erfolgreich war. Hier hätte es meherere Möglichkeiten zur Lösung gegebn, andere Techniken sind in anderen Standardsituationen eher angesagt. Die einfach if-Abfrage dürfte ausreichen. Wenn man es ernst nimmt, macht man noch einen check ob es sich um ein Array handelt.


I. 3. [area-productinfo mit CSS "verstecken"](https://github.com/aFarkas/tutorial_review_tmp/commit/4d00b034f30cdf3ce85db2fec161bacad0251f06)
------------------

area-productinfo hat bei ausgeschaltetem JS keinen Sinn und soll anfangs ausgeblendet sein. Soetwas macht man dann mit CSS.


I. 4. [kapseln von zusammenhängenden Code](https://github.com/aFarkas/tutorial_review_tmp/commit/b7f45f6e9caeae772a55cf730576dfbe44bb15eb)
------------------

Man sollte Spaghetti-Code vermeiden und zusammenhängenden Code entpsrechend kapseln. Hierfür gibt es sehr viele verschiedene Möglichkeiten, welche nicht alle in einem Einsteigertutorial erklärt werden können. Der Entwickler sollte eine Technik erläutern und dann auf diese konsequent aufbauen. Bei jQuery bietet sich als einfachste Möglichkeit die Kapselung in einer callback-Funktion an. Typisch hierfür:

---------------
	$('div.mein-modul').each( erstelleWasMagisches );
---------------


I. 5. [mytablets $.each](https://github.com/aFarkas/tutorial_review_tmp/commit/f3f3b502757e3910bb0aac5a494f06bf21837538)
------------------

mytablets ist ein Array von Strings und Zahlen und kein DOM-Object, keine DOM-Liste, kein Selektor und auch kein Array von DOM-Objekten. Der Aufruf $(Array) erstellt ein jQuery-Object mit den jQuery methoden, bind, addClass, animate etc.. Es sollte klar sein, dass diese Methoden nichts mit String und ähnlichem Anfangen können. Für Arrays gibt es die einfache Methode $.each statt $().each.

II. wichtige Änderungen
================================

II. 1. [Trennung von interaktivem Script und Videoeinbindung und noConflict-Fähigkeit](https://github.com/aFarkas/tutorial_review_tmp/commit/96a4152ee8848a7075b857d39a2ab889a5af9705)
------------------

Unabhängig von einer Kapselung sollte man verschiedene Aufgaben auftrennen.

In sehr vielen Content Management Systemen kann es zu erhablichen Problemen kommen, wenn sich darauf verläßt, dass $ identisch zu jQuery ist. 

II. 2. [einfache konfigurierbare HTML-Componente](https://github.com/aFarkas/tutorial_review_tmp/commit/9a3588c1d1f05873f440aaa67752310ce273e55b)
------------------

Hier werden nun die Konfigurationen herausgezogen. Das data-productsjson ist eine Pfadangabe die grundsätzlich im Markup sehr gut aufgebhoben ist, da das Backend die genauen Pfade kennt. Das data-for funnktioniert ähnlich wie das label[for]. Allerdings ist es eine Behelfskonstruktion. In der Regel würde ich gemeinsame zusammenhängende Componenten mit einem Container wrappen und über diesen Kontext gehen. Aber hierdurch vermeide ich nun eine Umstrukturierung.

Was haben wir hiermit geschafft. Wir haben eine Wiederverwendbare Komponente bekommen. Durch unsere Kapselung und Markup-Konfiguration können mehrere interaktive Videos auf einer Seite eingesetzt werden. Durch unsere vorangegangene Trennung, können normale Video und interaktive Produktvideos gemischt werden.

II. 3. [fals-y/truth-y Werte entweder strikt oder verkürzt prüfen (type coercion)](https://github.com/aFarkas/tutorial_review_tmp/commit/76e4c4bc7d0c9a934a7f6ef7413661784e291633)
------------------

Eine Prüfung wie beispielsweise (bla == false) oder (foo != 0) oder (bar == "") hat in JS keinen anderen Sinn wie (!bla) oder (foo) oder (!bar), gleichzeitig kann dies zu Verwirrung führen, ob der Entwickler eine strikte Prüfung wollte (bla === false).

II. 4. [Vermeidung von removeClass ohne Parameter](https://github.com/aFarkas/tutorial_review_tmp/commit/22f1583c8a022c84beecc1d0f2ffd4697f87cfdc)
------------------

Das Entfernen aller Klassen ist nicht sher schön, da hierdurch eventuelle Hooks für das CSS verloren gehen. Durch unsere zusätzliche Variable lastProduct schlagen wir zwei fliegen mit einer Klappe: 1. wir entfernen keine Klassen mehr und 2. benötigen wir für unseren Test keinen aufwendigen DOM-Zugriff. Gleichzeitig können wir für das Anzeigen eine Animation einbauen und wir beheben den Fehler, dass es nicht passende Produktinfos gibt, wenn der User nach vorne springt oder sich das Vidoe von vorne anschaut.

 