//HIER WIRD PFAD UND FILENAME DEFINIERT
const path = "/htmlsonoff.html";                   //FIlenamen definieren
const home ='vis.0'                                 //wo soll das file im iobroker-file-system liegen ? (oder z.b auch iqontrol.meta)
let   braucheEinFile=false;                          // bei true wird ein file geschrieben
let   braucheEinVISWidget=true;                     // bei true wird ein html-tabelle in einen dp geschrieben - siehe nächste zeile
let dpVIS="0_userdata.0.sonoff_tabelle"         //WICHTIG wenn braucheEinVISWidget auf true gesetzt !!  dp zusätzlich für VIS-HTML-Basic-Widget
let dpAnzahl="0_userdata.0.sonoff_tabelle_anzahl";  //WICHTIG datenpunkt erstellen vom typ "number" - bei 0 kein alarm und größer 0 die anzahl der schlechten batterien
let htmlColorDeviceUeberschrift="white"            //  Farbe der Geräte Marken 
let HTMLbrandSetting="b"                              // style der geräte marken:  möglich b fett; i kursiv; span normal
let triggerBySonoffPower=true;


 //  ---    hier einstellen, was man für ein device  hat - die nicht gebraucht werden auf false setzen !!!
var pow=false;
var generic=true;            var genericMitDiv=true;   // anzeige mit DIVersen Sensoren
var th10=false;    
var basic=false;              var basicMitTemp=true;    // anzeige mit DIVersen Sensoren
var mini=false;
var externalMitInfo=false; //noch nicht integriert
var externalOhneInfo=false;  //noch nicht integriert
var schalter2ch=false; 
var schalter3ch=false;
var dual=false; 
var schalter1ch=false;
var channel4=false;             //Sonoff 4CH                                             
var rfbridge=false;
var stdoseS2X=false;
var teckin=false;
var sv=false;
var blitzwolf_shp=false;      //SHP9 ist in 3ch, SHP7 ist in 2ch integriert
var sonoffDev=false;
var gosundSP1x=true;
var shelly=true;
var twoNice=false;
var ohneInfo=false;             // bei manchen fehlt der INFO ordner - diese werden hier erfasst
//Sonderfall
var linganSteckdose =false;
var ehz=true;				//elektronischer Haushaltszähler

const mitSchalter=true;           // für freigabe von schaltern für POWER
const mitYesterday=true;          // Für anzeige der yestersay werte bei energie-aufzeichnenden geräten (poe, blitzwolf, teckin, ..)
const mitLink=true;               // link zum sonoff-web-interface
const farbeNichtConnected="lightblue";
const styleNichtErreichbar="i";             // möglich i=schräg, b ist fett und span ist normal - nur eines  davon !!!
const farbeSchalterON="lightblue"               // farbe des schalters für ON
const farbeSchalterOFF="grey"               // farbe des schalters für OFF


var symbolOK="✅";  // auch möglich: ="⚪"}      
var symbolKO="❌";     //z.b. auch "<font color=\"red\"><b>X</b>" für ein rotes kreuz ❌"  ⚪  ⚫ ⭕  🔴 🔵 ⏱ 💀 👍 👎 📑 💲 👀
var symbolWARN="⚠️";    // ="⚠️"
var symbolSwitch="🔄"
var symbolLink="🌎";



let mySchedule="  * * * * * "; 

//HIER DIE SPALTEN ANZAHL DEFINIEREN - jede Spalte einen Wert - in diesem Beispiel sind es 5
var htmlFeld1='Device';       var Feld1lAlign="left";                 // überschrift Tabellen Spalte1 und  Ausrichtung left,right or center
var htmlFeld2='Status';        var Feld2lAlign="center";              // überschrift Tabellen Spalte2 und  Ausrichtung left,right or center
var htmlFeld3='Version';         var Feld3lAlign="center";            
var htmlFeld4='WLAN';        var Feld4lAlign="right";                 // usw..
var htmlFeld5='IP';        var Feld5lAlign="left";                   
var htmlFeld6='';        var Feld6lAlign="center";                   
var htmlFeld7='';        var Feld7lAlign="center";                  
var htmlFeld8='';        var Feld8lAlign="center";                   
// --------------



//hier werden die styles für die tabelle definiert
//ÜBERSCHRIFT ÜBER TABELLE
let   htmlUberschrift=true;                           // mit Überschrift über der tabelle
let   htmlSignature=true;                              // anstatt der Überscghrift eine signature: - kleiner - anliegend
const htmlFeldUeber='Sonoff Devices';              // Überschrift und Signature
const htmlFarbUber="white";                         // Farbe der Überschrift
const htmlSchriftWeite="normal";                       // bold, normal - Fettschrift für Überschrift
const htmlÜberFontGroesse="18px";                       // schriftgröße überschrift
//MEHRERE TABELLEN NEBENEINANDER
let   mehrfachTabelle=1;                              // bis zu 4 Tabellen werden nebeneinander geschrieben-  verkürzt das Ganze, dafür etwas breiter - MÖGLICH 1,2,3,oder 4 !!!
const trennungsLinie="2";                             //extra trennungslinie bei mehrfachtabellen - evtl auf 0 stellen, wnn htmlRahmenLinien auf none sind
const farbetrennungsLinie="white";
const htmlFarbZweiteTabelle="white";                // Farbe der Überschrift bei jeder 2.ten Tabelle
const htmlFarbTableColorUber="lightblue";               // Überschrift in der tabelle - der einzelnen Spalten
//ÜBERSCHRIFT SPALTEN
const UeberSchriftHöhe="35";                          //Überschrift bekommt mehr Raum - darunter und darüber - Zellenhöhe
const LinieUnterUeberschrift="2";                   // Linie nur unter Spaltenüberschrift - 
const farbeLinieUnterUeberschrift="lightblue";
const groesseUeberschrift=16;
const UeberschriftStyle="normal"                     // möglich "bold"
//GANZE TABELLE
let abstandZelle="1";
let farbeUngeradeZeilen="#000000";                     //Farbe für ungerade Zeilenanzahl - Hintergrund der Spaltenüberschrift bleibt bei htmlFarbTableColorGradient1/2
let farbeGeradeZeilen="#151515";                        //Farbe für gerade Zeilenanzahl - Hintergrund der Spaltenüberschrift bleibt bei htmlFarbTableColorGradient1/2
let weite="auto";                                     //Weite der Tabelle
let zentriert=true;                                   //ganze tabelle zentriert
const backgroundAll="#000000";                        //Hintergrund für die ganze Seite - für direkten aufruf oder iqontrol sichtber - keine auswirkung auf vis-widget
const htmlSchriftart="RobotoCondensed-Regular" //"Helvetica";
const htmlSchriftgroesse="16px";
//FELDER UND RAHMEN
let   UeberschriftSpalten=true;                // ein- oder ausblenden der spatlen-überschriften
const htmlFarbFelderschrift="#D8D8D8";                  // SchriftFarbe der Felder
const htmlFarbFelderschrift2="#D8D8D8";                 // SchriftFarbe der Felder für jede 2te Tabelle
const htmlFarbTableColorGradient1="#1c1c1c";          //  Gradient - Hintergrund der Tabelle - Verlauffarbe
const htmlFarbTableColorGradient2="#1c1c1c";          //  Gradient - Hintergrund der Tabelle - ist dieser Wert gleich Gradient1 gibt es keinen verlauf
const htmlFarbTableBorderColor="grey";             // Farbe des Rahmen - is tdieser gleich den gradienten, sind die rahmen unsichtbar
let htmlRahmenLinien="cols";                            // Format für Rahmen: MÖGLICH: "none" oder "all" oder "cols" oder "rows"
const htmlSpalte1Weite="auto";                   //  Weite der ersten beiden  Spalten oder z.b. 115px

// HIER NICHTS  ÄNDERN

let borderHelpBottum;
let borderHelpRight;
let htmlcenterHelp;
let htmlcenterHelp2;

if(htmlRahmenLinien=="rows") {borderHelpBottum=1;borderHelpRight=0;}
if(htmlRahmenLinien=="cols") {borderHelpBottum=0;borderHelpRight=1;}
if(htmlRahmenLinien=="none") {borderHelpBottum=0;borderHelpRight=0;}
if(htmlRahmenLinien=="all")  {borderHelpBottum=1;borderHelpRight=1;}
zentriert ? htmlcenterHelp="auto" : htmlcenterHelp="left";
zentriert ? htmlcenterHelp2="center" : htmlcenterHelp2="left";


const htmlZentriert='<center>'
const htmlStart=    "<!DOCTYPE html><html lang=\"de\"><head><title>Vorlage</title><meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">"+
                  "<style> * {  margin: 0;} body {background-color: "+backgroundAll+"; margin: 0 auto;  }"+
                  " p {padding-top: 10px; padding-bottom: 10px; text-align: "+htmlcenterHelp2+"}"+
                 // " div { margin: 0 auto;  margin-left: auto; margin-right: auto;}"+
                  " td { padding:"+abstandZelle+"px; border:0px solid "+htmlFarbTableBorderColor+";  border-right:"+borderHelpRight+"px solid "+htmlFarbTableBorderColor+";border-bottom:"+borderHelpBottum+"px solid "+htmlFarbTableBorderColor+";}"+ 
                  " table { width: "+weite+";  margin: 0 "+htmlcenterHelp+"; border:1px solid "+htmlFarbTableBorderColor+"; border-spacing=\""+abstandZelle+"0px\" ; }"+   // margin macht center
                  "td:nth-child(1) {width: "+htmlSpalte1Weite+"}"+"td:nth-child(2) {width:"+htmlSpalte1Weite+"}"+
                  " </style></head><body> <div>";
                   
const htmlTabStyle= "<table bordercolor=\""+htmlFarbTableBorderColor+"\" border=\"2px\" cellspacing=\""+abstandZelle+"\" cellpadding=\""+abstandZelle+"\" width=\""+weite+"\" rules=\""+htmlRahmenLinien+"\" style=\"color:"+htmlFarbFelderschrift+";  font-size:"+htmlSchriftgroesse+
                     "; font-family:"+htmlSchriftart+";background-image: linear-gradient(42deg,"+htmlFarbTableColorGradient2+","+htmlFarbTableColorGradient1+");\">";
const htmlTabUeber1="<tr height=\""+UeberSchriftHöhe+"\" style=\"color:"+htmlFarbTableColorUber+"; font-size: "+groesseUeberschrift+"px; font-weight: "+UeberschriftStyle+" ;  border-bottom: "+LinieUnterUeberschrift+"px solid "+farbeLinieUnterUeberschrift+" \">";
const htmlTabUeber3="</tr>";


const buttonScript =  '<script> function setOnDblClickCustom( myvalue ) {	var Self = this; var objID = myvalue;	Self.servConn.getStates(objID, (error, states) => {  console.log(states);  Self.servConn.setState(objID, !states[objID].val); }); } </script>'


var htmlTabUeber2="<td width="+htmlSpalte1Weite+" align="+Feld1lAlign+">&ensp;"+htmlFeld1+"&ensp;</td><td width="+htmlSpalte1Weite+" align="+Feld2lAlign+">&ensp;"+htmlFeld2+"&ensp;</td><td  align="+Feld3lAlign+">&ensp;"+htmlFeld3+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+htmlFeld4+"&ensp;</td><td  align="+Feld5lAlign+">&ensp;"+htmlFeld5+"&ensp;</td><td  align="+Feld6lAlign+">&ensp;"+htmlFeld6+"&ensp;</td><td  align="+Feld7lAlign+">&ensp;"+htmlFeld7+"&ensp;</td><td  align="+Feld8lAlign+">&ensp;"+htmlFeld8+"&ensp;</td>";
var htmlTabUeber2_1="<td width="+htmlSpalte1Weite+" align="+Feld1lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld1+"&ensp;</td><td width="+htmlSpalte1Weite+" align="+Feld2lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld3+
                    "&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld3+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld4+
                    "&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld5+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld6+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld7+"&ensp;</td><td align="+Feld8lAlign+" style=\"color:"+htmlFarbZweiteTabelle+"\">&ensp;"+htmlFeld8+"&ensp;</td>";
                        //  ------------
let triggerBySonoffSwitch=false;
var anzahl;
var AkkuAlarm=[];
var htmlOut="";
var mix;
var counter;
var arrTrigger=[];
var val1; var val2; var val0; var val3; var val4; var val5; var val6; var val7;
var htmlTabUeber="";
if (mitSchalter) triggerBySonoffPower=true;

function writeHTML(){

	anzahl=0;
	htmlOut="";

	counter=-1;
	htmlTabUeber="";
	switch (mehrfachTabelle) { 
		case 1: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber3;  break;
		case 2: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber3; break;
		case 3: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2+htmlTabUeber2+htmlTabUeber3; break;
		case 4: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber3; break;
	};
	
	if (!UeberschriftSpalten) {
		htmlTabUeber="";
	}  

	if (triggerBySonoffPower) {
		$('sonoff.*.*.POWER*').each(function(id, i) {           
        arrTrigger.push(id) });
	}
        
	if (triggerBySonoffSwitch) {      
		$('sonoff.*.*.Switch*').each(function(id, i) {           
        arrTrigger.push(id) });
	}

	var myColl=[];
	var val1help;
	var tempArr=[];var humArr=[];var illArr=[];var sw1Arr=[];var sw2Arr=[];var irArr=[];
	var powArr=[];var disArr=[];
	$('sonoff.*.*.*').each(function(id, i)	{   var ida = id.split('.'); if(ida[3].indexOf("_Temperature")>-1) tempArr.push(id);
																		if(ida[3].indexOf("_Humidity")>-1)  humArr.push(id); 
																		if(ida[3].indexOf("_Illuminance")>-1) illArr.push(id);
																		if(ida[3].indexOf("POWER1")>-1) sw1Arr.push(id);
																		if(ida[3].indexOf("POWER2")>-1) sw2Arr.push(id);
																		if(ida[3].indexOf("_Distance")>-1) disArr.push(id);
																		if(ida[3].indexOf("IrReceived_Data")>-1) irArr.push(id);
																		if(ida[3].match(/POWER$/)!=null) powArr.push(id);
	});

   
	if (pow){
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
                val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
             
        for(var i=0;i<mehrfachTabelle;i++ ) {
                  if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Sonoff Pow (R2)</b>";} else{val0=""; }
                   val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Gesamt";
                   if (mitYesterday) {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute(Gestern)";} else {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute";}
                   val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
                   counter++;tabelleBind();
		} 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
			if (getState(id).val=="Sonoff Pow" || getState(id).val=="Sonoff Pow R2") {
           
				anzahl++;
				var ida = id.split('.');
                                                             
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")      
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
         
				// val7 definition
				ichWillSchalten(id);
          
				if (mitYesterday) {      var val6_1=getState(id.replace("INFO.Module","ENERGY_Yesterday")).val
                                    val6=(getState(id.replace("INFO.Module","ENERGY_Today")).val.toString())+" ("+val6_1.toString()+")";
                                  } 
                                  else  {val6=getState(id.replace("INFO.Module","ENERGY_Today")).val.toString();
								  }

				val5=getState(id.replace("INFO.Module","ENERGY_Total")).val.toString();
         
				inaktiv(id);

				tabelleBind();  
			} 
		});

	} //end pow

	if (gosundSP1x){
		tabelleAusbessern()
		counter=-1;
            
		for(var i=0;i<mehrfachTabelle;i++ ) {
        	val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
		}
              
		for(var i=0;i<mehrfachTabelle;i++ ) {
            if(i==0){
				val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Gosund</b>";} else{val0=""; }
                val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Gesamt";
                if (mitYesterday) {
					val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute(Gestern)";
				} else {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute";}
                val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
				counter++;
				tabelleBind();
		} 
 
		$('sonoff.*.*.INFO.Info1.Module').each(function(id, i) {           
			if ( getState(id).val == "Gosund SP1"   || 
				 getState(id).val == "Gosund SP11"   || 
				 getState(id).val == "Gosund SP111" ||
				 getState(id).val == "Gosund SP112" ||
				 getState(id).val == "GOSUND SP112" ||
				 getState(id).val == "Gosund_P1"    || 
				 getState(id).val == "SP111 v1.1" ) {
           
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Info1.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Info1.Module","Info2.IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")    
				val3=getState(id.replace("INFO.Info1.Module","STATE.Wifi.RSSI")).val.toString()+" %"; 
           
				if (mitYesterday) { var val6_1=getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Yesterday")).val
                                        val6=(getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Today")).val.toString())+" ("+val6_1.toString()+")";} 
				else {val6=getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Today")).val.toString();}
								  
				val5=getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Total")).val.toString();
				let val6helping=val6;
				if(getState(id).val=="Gosund SP112" || getState(id).val=="Gosund_P1" || getState(id).val=="GOSUND SP112"  ) {

					let val6_1; val6_1=getState(id.replace("INFO.Info1.Module","STATE.POWER1")).val;  
					val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val6=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Info1.Module","STATE.POWER1")
						val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
					let val7_1; val7_1=getState(id.replace("INFO.Info1.Module","STATE.POWER2")).val;  
					val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Info1.Module","STATE.POWER2")
						val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
      
					val7= val6+" "+val7
					val6=val6helping;
					if( getState(id).val=="Gosund_P1" ) {
						let val11; let val12;
						let val6_1; val6_1=getState(id.replace("INFO.Module","POWER3")).val;  
						val6_1 ? val11=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val11=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
						if (mitSchalter){
							let valButton=id.replace("INFO.Module","POWER3")
							val6_1 ? val11="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
							val11="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
						} else {val6_1 ? val11=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val12=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
					let val7_1; val7_1=getState(id.replace("INFO.Module","POWER4")).val;  
					val7_1 ? val12=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val12=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Module","POWER4")
						val7_1 ? val12="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val12="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val7_1 ? val12=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val12=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}

					val7=val7+" "+val11+" "+val12;
					}

				} else {
					// val7 definition
					ichWillSchalten(id);
				}
         
				inaktiv(id);
    
				tabelleBind();  
			} 
		});    
	} //end gosundSP1x

	if (twoNice){
		tabelleAusbessern()
        counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">2Nice</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";
            val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Temp";
            val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
            counter++;tabelleBind();
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="2NICE SP111") {
          
			anzahl++;
			var ida = id.split('.');
        
			counter++; 
              
			val1=getState(id.replace("INFO.Module","alive")).val;                              
			val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
			val4=(getState(id.replace("Module","IPAddress")).val)
			if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
			val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
			val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
         
			val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			val6=getState(id.replace("INFO.Module","ANALOG_Temperature")).val.toString()+" °C"
          
            ichWillSchalten(id);
         
            inaktiv(id);
        
			tabelleBind();  
     
			} 
		});    
	} //end twoNice

	if (teckin){
		tabelleAusbessern()
        counter=-1;
          
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Teckin</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Gesamt";
            if (mitYesterday) {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute(Gestern)";} else {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute";}
            val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
            counter++;tabelleBind();
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Teckin" || getState(id).val=="Teckin SS42") {
          
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				if (mitYesterday) { var val6_1=getState(id.replace("INFO.Module","ENERGY_Yesterday")).val
                                    val6=(getState(id.replace("INFO.Module","ENERGY_Today")).val.toString())+" ("+val6_1.toString()+")";} 
                else  {val6=getState(id.replace("INFO.Module","ENERGY_Today")).val.toString();}

				val5=getState(id.replace("INFO.Module","ENERGY_Total")).val.toString();

				let val6helping=val6;
				if(getState(id).val=="Teckin SS42") {

					let val6_1; val6_1=getState(id.replace("INFO.Module","POWER1")).val;  
					val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val6=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Module","POWER1")
						val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
					let val7_1; val7_1=getState(id.replace("INFO.Module","POWER2")).val;  
					val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Module","POWER2")
						val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
      
					val7= val6+" "+val7
					val6=val6helping;
				} 
         
				inaktiv(id);

				tabelleBind();    
			} 
		});    
	} //end teckin 
 
    if (blitzwolf_shp){
		tabelleAusbessern()
        counter=-1;
           
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">BlitzWolf SHP</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Gesamt";
            if (mitYesterday) {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute(Gestern)";} else {val6="<font color=\""+htmlColorDeviceUeberschrift+"\">kWh Heute";}
				val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
                counter++;tabelleBind();
		} 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="BlitzWolf SHP" || getState(id).val=="BlitzWolf SHP8" || getState(id).val=="BlitzWolf SHP6" || getState(id).val=="SHP5") {
          
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")    
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				if (mitYesterday) { var val6_1=getState(id.replace("INFO.Module","ENERGY_Yesterday")).val
                                    val6=(getState(id.replace("INFO.Module","ENERGY_Today")).val.toString())+" ("+val6_1.toString()+")"; 
                } else  {val6=getState(id.replace("INFO.Module","ENERGY_Today")).val.toString();}

				val5=getState(id.replace("INFO.Module","ENERGY_Total")).val.toString();
           
				ichWillSchalten(id);
                
				inaktiv(id);
       
				tabelleBind();  
     
			} 
		});    
	} //end blitzwolf_shp
	
	if(ehz){
		tabelleAusbessern()
        counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){
				val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">eHZ</b>";
			} else { 
				val0=""; 
			}
			val1=""; 
			val2="";
			val3="";
			val4="";
			val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";
			val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Zählerstand";
			val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Tarif";
			counter++;
			tabelleBind();
           
        } 
  
		$('sonoff.*.*.INFO.Info1.Module').each(function(id, i) {           
    
			if (getState(id).val=="eHZ") {
         
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Info1.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Info1.Module","Info2.IPAddress")).val)
				if (mitLink && val1) {
					val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				}
				val5=getState(id.replace("INFO.Info1.Module","STATE.Uptime")).val.toString()
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")   
				val3=getState(id.replace("INFO.Info1.Module","STATE.Wifi.RSSI")).val.toString()+" %"; 
				
				val6="  ";
				
				//-----Zählerstand HT
				var val6help="sonoff.0.eHZLogger.SENSOR.STROM.HT";
				for (var i=0;i<disArr.length;i++ ) { if (disArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=disArr[i]} 
				if (val6help != "xxx") {val6="HT: " + getState(val6help).val + " kWh"} 

				//-----Zählerstand NT
				var val6help="sonoff.0.eHZLogger.SENSOR.STROM.NT";
				for (var i=0;i<disArr.length;i++ ) { if (disArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=disArr[i]} 
				if (val6help != "xxx") {val6 +="<br>NT: " + getState(val6help).val + " kWh"} 

                val7 = getState("0_userdata.0.tarifauswertung.Tarif").val.toString();
                
                // var val7_1="finde"
                
                // for (var i=0;i<powArr.length;i++ ) {
				    // if (powArr[i].indexOf(ida[0] + "." + ida[1] + "." + ida[2]) >-1 ) {
                        // val7_1=getState(id.replace("INFO.Module","POWER")).val.toString();
					// }
				// }
         
				// if (val7_1!="finde"){    
                    // ichWillSchalten(id); 
                // }

				inaktiv(id);
          		      
				tabelleBind();  
			}
		});  
  
	} //end eHZLogger

	if (generic){
		tabelleAusbessern()
        counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){
				val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Generic</b>";
			} else { val0=""; }
			val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Div";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";
			counter++;
			tabelleBind();
            if (genericMitDiv) {val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Div";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power"}
        } 
  
		$('sonoff.*.*.INFO.Info1.Module').each(function(id, i) {           
    
			if (getState(id).val=="Generic") {
         
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Info1.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Info1.Module","Info2.IPAddress")).val)
				if (mitLink && val1) {
					val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				}
				val5=getState(id.replace("INFO.Info1.Module","STATE.Uptime")).val.toString()
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")   
				val3=getState(id.replace("INFO.Info1.Module","STATE.Wifi.RSSI")).val.toString()+" %"; 
				val7=" - "; 
                
                var val7_1="finde"
                
                for (var i=0;i<powArr.length;i++ ) {
				    if (powArr[i].indexOf(ida[0] + "." + ida[1] + "." + ida[2]) >-1 ) {
                        val7_1=getState(id.replace("INFO.Module","POWER")).val.toString();
					}
				}
         
				if (val7_1!="finde"){    
                    ichWillSchalten(id); 
                }
              
				val6="  ";
				if (genericMitDiv) { 
					var val6_1="";
					var val6_2="";
					
					//--------TEMP
					var val6help="xxx";
					for (var i=0;i<tempArr.length;i++ ) { if (tempArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=tempArr[i]} 
					if (val6help != "xxx") {val6_1=getState(val6help).val+" °C"} else {val6_1=""}
					
					//---------HUM
					var val6help1="xxx";
					for (var i=0;i<humArr.length;i++ ) { if (humArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help1=humArr[i]} 
					if (val6help1 != "xxx") {val6_2=(getState(val6help1).val)+" %"} else {val6_2=""}
					val6=val6_1+" / "+val6_2; if (val6 == " / ") val6=" - ";
					
					//-----------ILLuminance
					var val6help="xxx";
					for (var i=0;i<illArr.length;i++ ) { if (illArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=illArr[i]} 
					if (val6help != "xxx") {val6=getState(val6help).val+" lux"} 

					//----------ILLuminance
					var val6_1="";var val6_2="";

					//---------POWER1
					var val6help="xxx";
					for (var i=0;i<sw1Arr.length;i++ ) { if (sw1Arr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=sw1Arr[i]} 
					if (val6help != "xxx") {if (getState(val6help).val){val6_1="ON"} else {val6_1="OFF"}}

					//---------POWER2
					var val6help1="xxx";
					for (var i=0;i<sw2Arr.length;i++ ) { if (sw2Arr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help1=sw2Arr[i]}
					if (val6help1 != "xxx") {if (getState(val6help1).val) {val6_2="ON"} else {val6_2="OFF"}
					val6=val6_1+" / "+val6_2; if (val6 == " / ") val6=" - ";}
					
					//------IR EMPFANG
					var val6help="xxx";
					for (var i=0;i<irArr.length;i++ ) { if (irArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=irArr[i]} 
					if (val6help != "xxx") {val6=getState(val6help).val} 

				}

				inaktiv(id);
          		      
				tabelleBind();  
			}
		});  
  
    } //end blitzwolf_shp

	if (basic){
		tabelleAusbessern()      
        counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Basic</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Div";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
            if (genericMitDiv) {val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Div";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power"}
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff Basic" || getState(id).val=="SWA11") {
         
				var ida = id.split('.');
				anzahl++;
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")  
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %";  
           
				ichWillSchalten(id)
 
				val6="  ";
				if (basicMitTemp) {
					var val6_1="";
					var val6_2="";
					
					//------TEMP
					var val6help="xxx";
					for (var i=0;i<tempArr.length;i++ ) {if (tempArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=tempArr[i]} 
                    if (val6help != "xxx") {val6_1=getState(val6help).val+" °C"} else {val6_1=""}
           
					// --------HUM
					var val6help1="xxx";
					for (var i=0;i<humArr.length;i++ ) {if (humArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help1=humArr[i]} 
                    if (val6help1 != "xxx") {val6_2=(getState(val6help1).val)+" %"} else {val6_2=""}
					val6=val6_1+" / "+val6_2; if (val6 == " / ") val6=" - ";
        
					// --------ILLuminance
					var val6help="xxx";
					for (var i=0;i<illArr.length;i++ ) {if (illArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=illArr[i]} 
					if (val6help != "xxx") {val6=getState(val6help).val+" lux"} 
					
					// --------ILLuminance
					var val6_1="";var val6_2="";
					
					// --------POWER1
					var val6help="xxx";
					for (var i=0;i<sw1Arr.length;i++ ) {if (sw1Arr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=sw1Arr[i]} 
					if (val6help != "xxx") {if (getState(val6help).val){val6_1="ON"} else {val6_1="OFF"}}
					// --------POWER2
					var val6help1="xxx";
					for (var i=0;i<sw2Arr.length;i++ ) {if (sw2Arr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help1=sw2Arr[i]}
                    if (val6help1 != "xxx") {if (getState(val6help1).val) {val6_2="ON"} else {val6_2="OFF"}
					val6=val6_1+" / "+val6_2; if (val6 == " / ") val6=" - ";}
       
					// --------IR EMPFANG
					var val6help="xxx";
					for (var i=0;i<irArr.length;i++ ) {if (irArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=irArr[i]} 
					if (val6help != "xxx") {val6=getState(val6help).val} 
					
					// --------Distance
					var val6help="xxx";
					for (var i=0;i<disArr.length;i++ ) {if (disArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=disArr[i]} 
					if (val6help != "xxx") {val6=getState(val6help).val+" cm"} 
				}

				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
         
				inaktiv(id);
    
				tabelleBind();  
			}
		});  
  
    } //end basic

	if (mini){
		tabelleAusbessern()   
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Mini</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
		} 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff Mini") {
			 
				var ida = id.split('.');
				anzahl++;
				counter++; 
				  
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				ichWillSchalten(id)
	   
				val6=""
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			 
				inaktiv(id);
				
				tabelleBind();  
			}
		});  
  
	} //end mini

	if (th10){
		tabelleAusbessern()   
        counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
             
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">TH10/TH16</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Temp/Hum";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff TH") {
         
				var ida = id.split('.');
				anzahl++;
				counter++; 
				  
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				ichWillSchalten(id)
				var val6_1="";var val6_2="";
				var val6help="xxx";
				for (var i=0;i<tempArr.length;i++ ) {if (tempArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help=tempArr[i]} 
				if (val6help != "xxx") {val6_1=getState(val6help).val+" °C"} else {val6_1=""}
			  
				var val6help1="xxx";
				for (var i=0;i<humArr.length;i++ ) {if (humArr[i].indexOf(ida[0]+"."+ida[1]+"."+ida[2])>-1) val6help1=humArr[i]} 
				if (val6help1 != "xxx") {val6_2=(getState(val6help1).val)+" %"} else {val6_2=""}
				val6=val6_1+" / "+val6_2; if (val6 == "") val6=" - ";
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			 
				inaktiv(id);
			
				tabelleBind();  
			}
		});  
  
	} //end th10

	if (shelly){
		tabelleAusbessern()   
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Shelly</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 

 
		$('sonoff.*.*.INFO.Info1.Module').each(function(id, i) {           
    
			if (getState(id).val=="Shelly 1"    || 
                getState(id).val=="Shelly 1PM"  || 
                getState(id).val=="Shelly 2.5"  || 
                getState(id).val=="Shelly 2"    || 
                getState(id).val=="Shelly Plus 1PM") {
         
				var ida = id.split('.');
				anzahl++;
				counter++; 
              
				val1=getState(id.replace("INFO.Info1.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Info1.Module","Info2.IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Info1.Module","STATE.Wifi.RSSI")).val.toString()+" %"; 

                if (mitYesterday) { 
                    var val6_1=getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Yesterday")).val
                    val6=(getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Today")).val.toString())+ " (" +val6_1.toString() + ")";
                } 
				else {
                    val6=getState(id.replace("INFO.Info1.Module","SENSOR.ENERGY.Today")).val.toString();
                }

                val5=getState(id.replace("INFO.Info1.Module","STATE.Uptime")).val.toString()
				let val6helping=val6;

                if(getState(id).val=="Shelly Plus 1PMxx") {
					let val6_1; 
                    val6_1=getState(id.replace("INFO.Info1.Module","STATE.POWER1")).val;    
					val6_1 
                        ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" 
                        : val6=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Info1.Module","POWER1")
						val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
					let val7_1; val7_1=getState(id.replace("INFO.Info1.Module","POWER2")).val;  
					val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
					if (mitSchalter){
						let valButton=id.replace("INFO.Info1.Module","POWER2")
						val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
						val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
					} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
					val7=val7+"&ensp;"+val6;
					let val6_11;
					if (mitYesterday) {     
						val6_11=getState(id.replace("INFO.Info1.Module","ENERGY_Yesterday")).val
                        val6=(getState(id.replace("INFO.Info1.Module","ENERGY_Today")).val.toString())+" ("+val6_11.toString()+")"; 
					} else  {val6=getState(id.replace("INFO.Info1.Module","ENERGY_Today")).val.toString();}
				} else { 
					ichWillSchalten(id)
                    val6=""
				}

				
         
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
  
    } //end shelly

	if (schalter1ch){
		tabelleAusbessern()       
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Schalter T1 CH</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 

 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff T1 1CH" || getState(id).val=="1 Channel" ) {
         
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
				ichWillSchalten(id)
                     
				val6="";
         
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
  
    } //end schalter1ch

	if (schalter2ch){
		tabelleAusbessern()     
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Schalter T2 CH</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 1";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 2";counter++;tabelleBind();
        }
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff T1 2CH" || getState(id).val=="BlitzWolf SHP7") {
         
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
				
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
           
                let val6_1; val6_1=getState(id.replace("INFO.Module","POWER1")).val;  
				val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val6=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER1")
					val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
				let val7_1; val7_1=getState(id.replace("INFO.Module","POWER2")).val;  
				val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER2")
					val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
      
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
  
	} //end schalter2ch

	if (schalter3ch){
		tabelleAusbessern()    
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Schalter T3 CH</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 1/2";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 3";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff 3CH" || getState(id).val=="BlitzWolf SHP9" ) {
         
				anzahl++;
				var ida = id.split('.');
        
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
           
				let val5_0; let val5_1; val5_1=getState(id.replace("INFO.Module","POWER1")).val;  
				val5_1 ? val5_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER1")
					val5_1 ? val5_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val5_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val5_1 ? val5_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}

				let val6_1; val6_1=getState(id.replace("INFO.Module","POWER1")).val;  
				val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER1")
					val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
				ichWillSchalten(id)

				val6= val5_0+"&ensp;"+val6;
           
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
  
	} // ende schalter3ch

	if (channel4){
		tabelleAusbessern()
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Schalter 4CH</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 1/2";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 3/4";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val.includes("Sonoff 4CH") || getState(id).val.includes("Sonoff 4CH Pro") ) {
         
				anzahl++;
				var ida = id.split('.');
			
				counter++; 
				  
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			  
				let val4_0; let val4_1; val4_1=getState(id.replace("INFO.Module","POWER1")).val;  
				val4_1 ? val4_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER1")
					val4_1 ? val4_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val4_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val4_1 ? val4_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
			   
				let val5_0; let val5_1; val5_1=getState(id.replace("INFO.Module","POWER2")).val;  
				val5_1 ? val5_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER2")
					val5_1 ? val5_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val5_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val5_1 ? val5_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}

				let val6_0; let val6_1; val6_1=getState(id.replace("INFO.Module","POWER3")).val;  
				val6_1 ? val6_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER3")
					val6_1 ? val6_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val6_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val6_1 ? val6_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
			  
				let val7_0; let val7_1; val7_1=getState(id.replace("INFO.Module","POWER4")).val;  
				val7_1 ? val7_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
				if (mitSchalter){
					let valButton=id.replace("INFO.Module","POWER4")
					val7_1 ? val7_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
					val7_0="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
				} else {val7_1 ? val7_0=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
				val6= val4_0+""+val5_0;
				val7= val6_0+""+val7_0;
			   
				inaktiv(id);
			  
				tabelleBind();  
			}
		});  
  
	} // ende channel4

	if (dual){
		tabelleAusbessern()  
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Dual (R2)</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 1";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power 2";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff Dual" || getState(id).val=="Sonoff Dual R2") {
         
			anzahl++;
			var ida = id.split('.');
        
			counter++; 
              
			val1=getState(id.replace("INFO.Module","alive")).val;                              
			val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
			val4=(getState(id.replace("Module","IPAddress")).val)
			if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
			val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")    
			val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
			val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			let val6_1; val6_1=getState(id.replace("INFO.Module","POWER1")).val;  
			val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
			if (mitSchalter){
				let valButton=id.replace("INFO.Module","POWER1")
				val6_1 ? val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
				val6="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
			} else {val6_1 ? val6=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
          
			let val7_1; val7_1=getState(id.replace("INFO.Module","POWER2")).val;  
			val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
			if (mitSchalter){
				let valButton=id.replace("INFO.Module","POWER2")
				val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
				val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
			} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
     
			inaktiv(id);
          
			tabelleBind();  
		}
		});  
  
	} //end dual

	if (stdoseS2X){
		tabelleAusbessern()   
		counter=-1;
          
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Steckdose S2x</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
			if (getState(id).val=="Sonoff S2X"  ) {
				anzahl++;
				var ida = id.split('.');
				counter++; 
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")   
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
				ichWillSchalten(id)
				val6=""
				inaktiv(id);
				tabelleBind();  
			}
		});  
	} //end stdoseS2X

	if (linganSteckdose){
		tabelleAusbessern() 
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Lingan Steckdose</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
			if (getState(id).val=="Lingan SWA1") {
				var ida = id.split('.');
				anzahl++;
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")    
				val3="na"; 
				val5="na"; 
				ichWillSchalten(id)
				val6=""
				inaktiv(id);
				tabelleBind();  
			}
		});  
	} //end linganSteckdose

	if (rfbridge){
		tabelleAusbessern()  
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
              
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">RF Bridge</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">Received";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 
 
		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff Bridge") {
				var ida = id.split('.');
				anzahl++;
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
				ichWillSchalten(id);
				val6=getState(id.replace("INFO.Module","RfReceived_Data")).val;
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
				inaktiv(id);
          
				tabelleBind();  
			}
		});    
	} //end rfbridge

	if (ohneInfo){
		tabelleAusbessern() 
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Sonderfälle ohne Info</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">Power";counter++;tabelleBind();
        } 
		var arrFilt=[];

		$('sonoff.*.*').each(function(id, i) {           

			var ida = id.split('.');

			$(ida[0]+"."+ida[1]+"."+ida[2]+"."+"INFO.IPAddress").each(function(id, i) {   // kontrolliere ob  vorhanden
             
				var idc = id.split('.');
				if(!arrFilt.includes(idc[2])){
					arrFilt.push(idc[2])}
            });
           
		});
  
		$('sonoff.*.*.alive').each(function(id, i) {           

			var ida = id.split('.');
    
			if (!arrFilt.includes(ida[2])) {
      
				anzahl++;
				counter++; 
              
				val1=getState(id).val;                       
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=" na "; 
				val2=" na "; 
				val3="na"; 
				val5="na"; 
				val7="na" 
				ida[2].includes("Bridge") ?  val6=getState(id.replace("alive","RfReceived_Data")).val : val6="";
           
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
	} //end ohne Info

	if (sv){
		tabelleAusbessern() 
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
           
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Sonoff SV</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff SV") {
         
				var ida = id.split('.');
				anzahl++;
				counter++; 
              
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")     
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 
          
				val7="";

				val6=""
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
         
				inaktiv(id);
          
				tabelleBind();  
			}
		});  
	}//end sv

	if (sonoffDev){
		tabelleAusbessern() 
		counter=-1;
            
        for(var i=0;i<mehrfachTabelle;i++ ) {
			val0=""; val1=""; val2="";val3="";val4="";val5="";val6="";val7="";counter++;tabelleBind();
        }
           
        for(var i=0;i<mehrfachTabelle;i++ ) {
			if(i==0){val0="<font color=\""+htmlColorDeviceUeberschrift+"\"><"+HTMLbrandSetting+">Sonoff Dev</b>";} else{val0=""; }
            val1=""; val2="";val3="";val4="";val5="<font color=\""+htmlColorDeviceUeberschrift+"\">Uptime";val6="<font color=\""+htmlColorDeviceUeberschrift+"\">";val7="<font color=\""+htmlColorDeviceUeberschrift+"\">";counter++;tabelleBind();
        } 

		$('sonoff.*.*.INFO.Module').each(function(id, i) {           
    
			if (getState(id).val=="Sonoff Dev") {
			 
				var ida = id.split('.');
				anzahl++;
				counter++; 
				  
				val1=getState(id.replace("INFO.Module","alive")).val;                              
				val0=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
				val4=(getState(id.replace("Module","IPAddress")).val)
				if (mitLink && val1) val4 = "<a href=\"http:\/\/"+ val4 + "\" target=\"_blank\" onclick=\"window.open(this.href,this.target,\'width=480,height=640\'); return false;\">"+symbolLink+"</a>"+val4
				val2=getState(id.replace("Module","Version")).val.replace(/\(.+\)/g,"")    
				val3=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString()+" %"; 

				val7="";
	 
				val6=""
				val5=getState(id.replace("INFO.Module","Uptime")).val.toString()
			
				inaktiv(id);
			
				tabelleBind();  
			}
		});  
	} //end sonoffDev

    tabelleFinish(); 

    setState(dpAnzahl,anzahl);     
} 


//MAIN:
  
 schedule(mySchedule,  function () 
 {
	writeHTML();
	if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) {   });}
 }); 
 
 writeHTML();

 function tabelleBind(){
    
	switch (mehrfachTabelle) {  
		case 1:  if(counter%2==0){  htmlOut=htmlOut+"<tr bgcolor=\""+farbeGeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td></tr>"; break;} else 
                                   {  htmlOut=htmlOut+"<tr bgcolor=\""+farbeUngeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td></tr>"; break;}

        case 2:  if(counter%4==0) {
                   if(counter%2==0)            {htmlOut = htmlOut+"<tr bgcolor=\""+farbeGeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\"align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                               else {htmlOut = htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td></tr>";} break;
                        }else{  
                   if(counter%2==0)            {htmlOut = htmlOut+"<tr bgcolor=\""+farbeUngeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\"align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                               else {htmlOut = htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td></tr>";} break;}

        case 3: if(counter%2==0 ) {
                    if(counter%3==0)           {htmlOut = htmlOut+"<tr bgcolor=\""+farbeGeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\" align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                               else { if(counter%3==1 )  { htmlOut = htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\" align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>";} 
                                                else    {htmlOut = htmlOut+"<td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td></tr>";}
                                          } break; }else{
                    if(counter%3==0)                {htmlOut = htmlOut+"<tr bgcolor=\""+farbeUngeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\" align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                               else { if(counter%3==1 )  { htmlOut = htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"; color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td>";} 
                                                else    {htmlOut = htmlOut+"<td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td></tr>";}
                                          } break;      }

        case 4: if(counter%8==0)  {
                    if(counter%4==0)               {htmlOut = htmlOut+"<tr bgcolor=\""+farbeGeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\"align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                                   else {if(counter%4==1 )  { htmlOut = htmlOut+"<td  align="+Feld1lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"; color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td>";} 
                                                else    {if(counter%4==3)  { htmlOut= htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\>&ensp;"+val7+"&ensp;</td></tr>";} 
                                                                  else    {htmlOut = htmlOut+"<td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td>&ensp;"+val1+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\" align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>";}}
                                          } break;  }else{
                    if(counter%4==0)               {htmlOut = htmlOut+"<tr bgcolor=\""+farbeUngeradeZeilen+"\"><td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld5lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\"align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>"; } 
                                   else {if(counter%4==1 )  { htmlOut = htmlOut+"<td  align="+Feld1lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td  align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"; color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td>";} 
                                                else    {if(counter%4==3)  { htmlOut= htmlOut+"<td align="+Feld1lAlign+"  style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val0+"&ensp;</td><td  align="+Feld2lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val1+"&ensp;</td><td align="+Feld3lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val2+"&ensp;</td><td  align="+Feld4lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val3+"&ensp;</td><td align="+Feld5lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val6+"&ensp;</td><td align="+Feld8lAlign+" style=\"color:"+htmlFarbFelderschrift2+"\">&ensp;"+val7+"&ensp;</td></tr>";} 
                                                                  else    {htmlOut = htmlOut+"<td align="+Feld1lAlign+" >&ensp;"+val0+"&ensp;</td><td>&ensp;"+val1+"&ensp;</td><td align="+Feld2lAlign+">&ensp;"+val2+"&ensp;</td><td align="+Feld3lAlign+">&ensp;"+val3+"&ensp;</td><td align="+Feld4lAlign+">&ensp;"+val4+"&ensp;</td><td align="+Feld6lAlign+">&ensp;"+val5+"&ensp;</td><td align="+Feld7lAlign+">&ensp;"+val6+"&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+";\" align="+Feld8lAlign+">&ensp;"+val7+"&ensp;</td>";}}
                                          } break;       }

      } //switch mehrfachTabelle ende

 } // end tabelleBind

 function tabelleAusbessern() { 
       switch (mehrfachTabelle) {  
        case 1:    break;

        case 2:    
                  if(counter%2==0)  htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');  
                 
                   break;

        case 3:   if(counter%3==2)  htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
                  if(counter%3==1)  htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');         
                  if(counter%3==0)  htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>");
                
                   break;
        case 4:   if(counter%4==3)  htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
                  if(counter%4==2)  htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');  
                  if(counter%4==1)  htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>");    
                  if(counter%4==0)  htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>"); 
                  break; }
 }

 function tabelleFinish() {  

		switch (mehrfachTabelle) { 
			case 1:    
				break;

			case 2:    
                if(counter%2==0) { htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');   }
                break;

			case 3:   
				if(counter%3==2) {
					 htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
				}
                if(counter%3==1) { 
					htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');         
				}
                if(counter%3==0) { 
					htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td  style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>");
				}
                break;
			case 4:   
				if(counter%4==3) {
					 htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
				}
                if(counter%4==2) { 
					htmlOut = htmlOut.replace(/<\/td>$/, '</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>');  
				}
                if(counter%4==1) {
					htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>");    
				}
                if(counter%4==0) {
					htmlOut = htmlOut.replace(/<\/td>$/, "</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td><td>&ensp;</td></tr>"); 
				}
                break; 
		} // switch merfachTabelle ende
     
		var htmlUeber=    "<p style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; font-size: "+htmlÜberFontGroesse+"; font-weight:"+htmlSchriftWeite+ "\">"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((parseFloat((new Date().getTime())))), "SS:mm:ss")+"&ensp;&ensp;Anzahl: "+anzahl+"</p>"; 
        var htmlUnter= "<div  style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; font-size: 70%; text-align: right;\" >"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((parseFloat((new Date().getTime())))), "SS:mm:ss")+"&ensp;&ensp;Anzahl: "+anzahl+"</div>"
         
        if (!htmlSignature){
			 htmlUnter="";
		}
           
        var htmlOutVIS="";
          
        if (htmlUberschrift) {
			zentriert ? htmlOutVIS=htmlZentriert+htmlUeber+htmlTabStyle+htmlTabUeber+htmlOut+"</table>"+htmlUnter+ buttonScript 
					  : htmlOutVIS=htmlUeber+htmlTabStyle+htmlTabUeber+htmlOut+"</table>" + "bla bla"+htmlUnter + buttonScript;
        } else {
			zentriert ?  htmlOutVIS=htmlZentriert+htmlTabStyle+htmlTabUeber+htmlOut+"</table>"+htmlUnter+ buttonScript 
					  :  htmlOutVIS=htmlTabStyle+htmlTabUeber+htmlOut+"</table>" + "blabla"+htmlUnter+ buttonScript ;
        }

		if (braucheEinVISWidget) {
			setState(dpVIS, htmlOutVIS );
		}

		var htmlUnter= "<div  style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; font-size: 80%;  text-align: center; \" >"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((parseFloat((new Date().getTime())))), "SS:mm:ss");+"</div>"
		if (!htmlSignature) {
			tmlUnter="";
		}
		var htmlEnd="</table>"+htmlUnter+"</div></body>";
  
		htmlUberschrift ? htmlOut=htmlStart+htmlUeber+htmlTabStyle+htmlTabUeber+htmlOut+buttonScript+htmlEnd+buttonScript 
				   		: htmlOut=htmlStart+htmlTabStyle+htmlTabUeber+htmlOut+buttonScript+htmlEnd+buttonScript;

 }

 on({id: arrTrigger, ack: false, change: "any"}, function (obj) { 
     writeHTML();
     if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) { /* log('file written');*/  });}
      
 });

 function ichWillSchalten(id) {
	let val7_1; val7_1=getState(id.replace("INFO.Module","POWER")).val;  
    val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";
    if (mitSchalter){
		let valButton=id.replace("INFO.Module","POWER")
        val7_1 ? val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch + "</button> <font color=\""+farbeSchalterON+"\"> "+"ON&ensp;" :
        val7="<button style\=\"border:none\; background-color\:transparent\; color\:white\; font\-size\:1em\; text\-align:left\" value=\"toggle\" onclick=\"setOnDblClickCustom\(\'"+valButton+"\')\">"+symbolSwitch+"</button> <font color=\""+farbeSchalterOFF+"\"> "+"OFF";
	} else {val7_1 ? val7=(" <font color=\""+farbeSchalterON+"\"> ")+"ON" : val7=(" <font color=\""+farbeSchalterOFF+"\"> ")+"OFF";}
 }

 function inaktiv(id) {
	if (!getState(id.replace("INFO.Module","alive")).val) {   //farbeNichtConnected
		val1=symbolKO;
        val4=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">&ensp;&ensp; ")+val4;
        val2=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">")+val2;
        val3=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">")+" 0 %";
        val5=("<font color=\""+farbeNichtConnected+"\">")+" --- ";
        val6=("<font color=\""+farbeNichtConnected+"\">")+" --- ";
        val7=("<font color=\""+farbeNichtConnected+"\">")+" --- ";
        val0=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">")+val0} 
	else {
		val1=symbolOK;
	}
 }
