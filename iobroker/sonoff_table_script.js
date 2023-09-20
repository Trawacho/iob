// https://github.com/liv-in-sky/sonoff-iobroker-script  
//@liv-in-sky 2022  11.01.-10:00-  mit tasmota 10

 // DAS WIDGET IN DER VIS
 // das Standard html-Widget wird genutzt in der VIS - dazu den DP javascript.x.Tabellen@Liv.SONOFFTabelleVIS als binding angeben d.h.
 // im html-teil des widgets wird der daten punkt in geschweiften klammern angegeben z.B. {javascript.x.Tabellen@Liv.SONOFFTabelleVIS}

 // @ts-ignoreMD
 let   braucheEinVISWidget=true;                          // immer true 
 let   dpVIS="SONOFFTabelleVIS"                           // Name für Tabelle - keine datenpunkte eintragen !!
 let   dpJSON="SONOFFTabelleJSON"                         // hier nicht genutzt- ist immer false
 let   willUnterUserdataSpeichern=false;                  // die Tabelle wird unter 0_userdata.0.... gespeichert
 let   braucheMaterialDesignWidget=false;                 // not in use
 let   braucheMaterialDesignWidgetList=false;             // not in use
 let mySchedule="  1,31 * * * * ";                        // not in use 

 //ZUSÄTZLICH VARIABLEN
  let mitAlphabet=false;                                  // wenn true wird immer nach namen sortiertiert und eine zeile eingfügt mit dem Anfangsbuchstaben
  let sortierenEIN=true;
 // let mitSearch=true;
  let welcheSortierung=1;                                 // Startsortierung - je nach spalte  0: name; 1: online; 2:type; 3:rssi .....
  const schalterUmrahmung="1"                              //wenn überschriften buttons sind , den rahmen mit 0 wegmachen 
  let tabletDoppelHilfe=true;                              // auf tablet geht kein doppelklick - es erschein ein weiterer button in der seitenleiste
  let deviceNameStattHostname=false;                        //zeigt devicename anstatt hostname
  let maxWeiteFlexBoxen="140";                             // max. Breite für die einzel-flexboxen 
  //let newTreeView=false;                                    // WENN NEUE BAUMSRUKTUR DES ADAPTERS GENUTZT WIRD
  let showInstanzInName=true;                              // zeigt die sonoff instanz nummer nach dem namen
  let showTriggerActivity=false;                           //zeigt im log, wie oft getriggert wird


                 

//const mitYesterday=true;          // Für anzeige der yestersay werte bei energie-aufzeichnenden geräten (poe, blitzwolf, teckin, ..)
//const mitLink=true;               // link zum sonoff-web-interface
const farbeNichtConnected="lightblue";
const powerButtonColorONBkground="lightyellow";//"#5590CA";
const powerButtonColorOFFBkground="red"//"#7090B3";//"#07417A";//"#265686";
const powerButtonColorONSchrift="black";
const powerButtonColorOFFSchrift="white";
const ipButtonColorONBkground ="lightyellow"
const ipButtonColorOFFBkground ="#7090B3"


 let flexboxView=false;                                  // startet im flexbox modus - keine tabelle

 //VON ALTEM SCRIPT
const farbeNichtErreichbar="#819FF7"// not in use       // farbe für devices, die gerade nicht online sind
                                                        // möglich i=schräg, b ist fett und span ist normal - nur eines  davon !!!

 const materialD_IP_erreichbar="#D8D8D8";           // not in use
 const materialD_IP_nichtErreichbar="#F7819F";      // not in use
 const bildergroesse=30;                            // not in use
  let   pfadFuerBilder="/vis.0/armin/img/"          // not in use                 


//hier eintragen für die übersetzung der standardnamen - aliase - rechte seite wird statt linker  angezeigt - die beispiele kann man raus löschen
// BITTE AUF DIE KOMMAs ACHTEN

                         
//BLOCK NOT IN SE 
 var symbolOK="✔️";     // auch möglich: ="✅"   🟩   ✔️  🌎
var symbolKO="🔵"           // ist in let symbolSchalter    //"🔔";     //z.b. auch "<font color=\"red\"><b>X</b>" für ein rotes kreuz  oder : ="❌"  ⚪   🟢 ⚫ ⭕  🔴 🔵  🚫 ⏱ 💀 👍 👎 📑 💲 👀 😡 🟥 ⬜ 🧊 💬 🗑️ 🔔
var symbolWARN="ℹ️";    // ="⚠️" oder info: "ℹ️"
var symbolKO_MD="🟥"    // ist in let symbolSchalter   
var symbolLink="🌎";
var externalOhneInfo=false;  //noch nicht integriert

 //---------------------------------------

//HIER DIE SPALTEN ANZAHL DEFINIEREN - jede Spalte einen Wert - in diesem Beispiel sind es 3 - es MÜSSEN in allen Arrays die GLEICHE Anzahl für die Werte sein
let htmlFeld=        ["NAME","ONLINE","TYPE","RSSI","IP","UPTIME","POWER","VER"];                   // GLEICHE ANZAHL !! NAME/ÜBERSCHRIFT DER SPALTE
let val=             ["true","true","true","true","true","true","true","true"];                 // bei false wird spalte ausgeblendet// GLEICHE ANZAHL !! SPALTE ANZEIGEN/AUSBLENDEN UND HIER SIND DIE  WERTE, DIE IN DER SCHLEIFE GEFILTERET WERDEN -  jeder val[x] muss unten in der schleife gesetzt werden !!
let Feld1lAlign=     ["left","center","center","center","center","center","center","center"] ;        // GLEICHE ANZAHL !! AUSRICHTUNG IN DER SPALTE
let htmlSpalte1Weite=["0px","0px","0px","0px","0px","0px","0px","0px"];                      // GLEICHE ANZAHL !! BREITE DER SPALTE, wenn "0px" auto
let schalterInSpaltenUeberschrift=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];    // WENN BUTTONS INSTALLIERT WERDEN - sonst false
let symbolSchalter=              ["na","&check;","&cross;","&#128472;","&#11138;"];               //ONLINE SYMBOLE         // SYMBOLE DER BUTTONS 
//-----------------------------------

//Symbole für Tabelle z.b.: ⚪  ⚫ ⭕  🔴 🔵 ⏱ 💀 👍 👎 📑 💲 👀 🔹 ✅ ❌ ⚠️ mehr: https://emojiterra.com/de/ oder https://unicode-table.com/de/html-entities/

//hier werden die styles für die tabelle definiert
//ÜBERSCHRIFT ÜBER TABELLE
const htmlUberschrift=true;                             // mit Überschrift über der tabelle
const htmlSignature=false;                               // anstatt der Überscghrift eine signature: - kleiner - anliegend
const htmlFeldUeber='SONOFF';                // für Überschrift und Signature falls htmlUberschrift und htmlSignature ist true
const htmlFarbUber="white";                              // Farbe der Überschrift
const htmlSchriftWeite="normal";                         // bold, normal - Fettschrift für Überschrift
const htmlUEberFontGroesse="18px";                       // schriftgröße überschrift
//SEITENLEISTE
const ichWillSeitenLeiste=true;                          // links einblenden einer Seitenleiste
const ichWillAuchRechtsEineLeiste=false;
const nameSeitenLeiste="S O N O F F"
const breiteSeitenleiste=35;
const schriftGroesseSeitenleiste=18;
const abstandSeitentextVonOben=4;
const htmlFarbSeiteSchrift="white";
const htmlBackgroundFarbeSeitenliste="blue";
//BUTTON ÜBERSCHRIFT
const htmlBackgroundButtonUeberschrift="transparent";
//SUCHE
let bkgroundSearch=1;                                    //   hintergrund für suche-ergebnis und flexboxen    // 1: carbon; 2: iobroker; 3: colored bubbles;  4: gradient farben von htmlFarbTableColorGradient1; 5: gradient farben wie farbeUngeradeZeilen; 6: heller hintergrund
const sucheEin=true;
const sucheHoehe=25;
const inputBorderColor="gray";
//MEHRERE TABELLEN NEBENEINANDER
let mehrfachTabelle=1;                                   // bis zu 3 Tabellen werden nebeneinander geschrieben-  verkürzt das Ganze, dafür etwas breiter - MÖGLICH 1,2,3 !!!
const trennungsLinie=7;                            // extra trennungslinie bei mehrfachtabellen - evtl auf 0 stellen, wnn htmlRahmenLinien auf none sind
const farbetrennungsLinie="lightyellow";                     // bei mehreren Tabellen nebeneinander wird ein Strich zw. den Tabellen gezogen
const htmlFarbTableColorUber="white"                     // Spalten-Überschrift in der tabelle - für die einzelnen Spalten //"#BDBDBD"; 
const htmlFarbZweiteTabelle="white";                     // Farbe der Spalten-Überschrift bei jeder 2.ten Tabelle        
//ÜBERSCHRIFT SPALTEN - OBERSTE ZEILE IN TAB
const UeberSchriftHoehe=40;                            // Überschrift bekommt mehr Raum - darunter und darüber - Zellenhöhe
const LinieUnterUeberschrift="2";        //not in use                // Liniehoehe nur unter Spaltenüberschrift  
const farbeLinieUnterUeberschrift="green";     //not in use          // LinienFarbe unter Spaltenüberschrift
const groesseUeberschrift=16; 
const UeberschriftStyle="normal"                         // möglich "bold"
const UeberschriftSpalten=true;           //not in use               // ein- oder ausblenden der spatlen-überschriften
const htmlGradBkgroundSpalteUeber=[150,5,20];                          // einstellung des gradienten für die spaltenüberschrift
const htmlGrad1BkgroundSpalteUeber="#2F2F2F"//"#265686";                // Gradient  -farbe 1 für die spaltenüberschrift "#2F2F2F"//
const htmlGrad2BkgroundSpalteUeber="#3c3c3c"//"#5590CA";               //  Gradient  -farbe 2 für die spaltenüberschrift "#3c3c3c"//
//GANZE TABELLE
const linienRows="0"                                   //Border für rows // LinieUnterUeberschrift gehört dazu
const linienCols="1"                                    //Border für cols
const innenBorder="gray"                                  //Border Farbe
const abstandZelle="7";                                  // legt den abstand in den zellen zum rahmen fest
const zeilenAbstand=40;                                   // legt den abstand zwischen den zeilen fest
const farbeUngeradeZeilen="#2F2F2F";                     // Farbe für ungerade Zeilenanzahl - Hintergrund der Spaltenüberschrift bleibt bei htmlFarbTableColorGradient1/2 - bei "transparent" gewinnt htmlFarbTableColorGradient1
const farbeGeradeZeilen="#3c3c3c"//"#151515";            // Farbe für gerade Zeilenanzahl - Hintergrund der Spaltenüberschrift bleibt bei htmlFarbTableColorGradient1/2   - bei "transparent" gewinnt htmlFarbTableColorGradient2
let weite="950";                                        // Weite der Tabelle - verhindert das dynamische breiter werden, wenn werte unterschiedliche werte haben
let hoeheTabelle=600;
const zentriert=true;                                    // ganze tabelle zentriert im html Widget - muss in pixel angegeben werden oder "auto"
const backgroundAll="#000000";                           // Hintergrund für die ganze Seite - für direkten aufruf oder iqontrol sichtber - keine auswirkung auf vis-widget
const htmlSchriftart="Jura-DemiBold"                    // "Jura-DemiBold"   //"RobotoCondensed-Bold"   //"Helvetica"; .....  Ubuntu-Regular
const htmlSchriftgroesse="16px";                         // schriftgröße in den zellen
//const rahmenBreite="1px";   //not in use                             //mit 0 ist äußerer rahmen weg
//FELDER UND RAHMEN
const htmlFarbFelderschrift="#CBCBCA";                   // SchriftFarbe der Felder
const htmlFarbFelderschrift2="#CBCBCA";                  // SchriftFarbe der Felder für jede 2te Tabelle
const htmlGradient=[150,5,20];                          // einstellung des gradienten
const htmlFarbTableColorGradient1="#265686";             // Gradient - Hintergrund der Tabelle - Verlauffarbe"#2F2F2F"//  "#4D4C4C"//
const htmlFarbTableColorGradient2="#5590CA";              // Gradient - Hintergrund der Tabelle - ist dieser Wert gleich Gradient1 gibt es keinen verlauf  "#3c3c3c"//  "#4D4C4C"//
const htmlFarbTableBorderColor="grey";                   // Farbe des Rahmen - ist dieser gleich den gradienten, sind die rahmen unsichtbar
//let htmlRahmenLinien="none";                             // Format für Rahmen: MÖGLICH: "none" oder "all" oder "cols" oder "rows"


// AB HIER NICHTS  ÄNDERN -------------------------------------------------------------------------------------------------
// AB HIER NICHTS  ÄNDERN -------------------------------------------------------------------------------------------------
// AB HIER NICHTS  ÄNDERN ---------------------------------erst wieder ab Zeile 134----------------------------------------

let borderHelpBottum;
let borderHelpRight;
let htmlcenterHelp;
let htmlcenterHelp2;
let welcherSpeicherOrt;

let trHelperClass=" ";
let htmlTabUeber4;
let htmlTabUeber2;
let htmlTabUeber2_1;
let searchMe;
let htmlSeitenleiste;
let htmlTabStyle;
let htmlTabUeber3="";       //wird in function writeHTML gesetzt - wegen umschalten views

let buttonScript; //scripte am ende einfügen

let bkgDiv;   //background scroll-div
let scrollBar; //dünne scrollbar

var aktiv=0; var inaktive=0;
let myButtonUeberschrift; //not in use
let htmlZentriert;   //css
let einmalAbstand; //seitenleiste
let myScann="";
let isOnline=false;
/*
if(String(htmlRahmenLinien)=="rows") {borderHelpBottum=1;borderHelpRight=0;}
if(String(htmlRahmenLinien)=="cols") {borderHelpBottum=0;borderHelpRight=1;}
if(String(htmlRahmenLinien)=="none") {borderHelpBottum=0;borderHelpRight=0;}
if(String(htmlRahmenLinien)=="all")  {borderHelpBottum=1;borderHelpRight=1;}
zentriert ? htmlcenterHelp="auto" : htmlcenterHelp="left";
zentriert ? htmlcenterHelp2="center" : htmlcenterHelp2="left";*/

if(weite=="auto") {weite="100%"} else {weite=String(Number(weite)*mehrfachTabelle)}

 
  makeMyCSS();
  makeMySearch_Seitenleiste();
  

//------------------------------------------------------
if ( !(val.length == Feld1lAlign.length && htmlSpalte1Weite.length == htmlFeld.length && val.length == htmlFeld.length) || (mehrfachTabelle<1 || mehrfachTabelle>3) ) 
      { log("Anzahle der Definitions Arrays sind ungleich ODER mehrfachTabelle ist falsch - Script wurde gestoppt !!!","error");
          // @ts-ignore
          stopScript();}
let braucheEinJSON=false;                               // bei true wird ein html-tabelle in einen dp geschrieben - siehe nächste zeile
let triggerBySonoffPower=true;  
const styleNichtErreichbar="i";             // möglich i=schräg, b ist fett und span ist normal - nur eines  davon !!!
const mitSchalter=true;           // für freigabe von schaltern für POWER
let langeGesamt=0; 
let htmlTabUeber="";
let htmlOut="";
let htmlUnter=""
let htmlSeitenleisteRechts="";
let htmlSeitenleisteRechts2=";"
let htmlMittelLeiste="";     
let mix;
let counter;
//let makeJsonWidget;
let myObject=[];
let myArrMac=[]
const dpPrefix = "javascript."+ instance +".";

var rootcount=true;
var myObjOld=[];
var myJsonWidget=[]; 
var myJsonWidget2=[];

var valButton=1;
var myObj;

 //HIER SIND DIE  WERTE, DIE IN DER SCHLEIFE GEFILTERET WER%DEN - Jede spalte einen wert - jeder valx muss in dieser schleife gesetzt werden !!
 var val1; var val0; var val2;let val3;
 var json1; var json2; var json3; var json4; var json5; var json6;
 let myObjExtra=[];
 let laeuftSchon=false;
 var hostDaten="";
  let refreshHelper=""; let refreshHelperOn=true;


needDP();


var myData="xxxxx"; 
var arrTriggerSonoff=[];
let triggerBySonoffSwitch=false;
let helperLeerzeile=""
  let Eyestday=""; let Etoday="";let Etotal="";let Epower=""; let dieSchalter=[]; ;let thisID;  let thisSensors=[] ; let versionFlex="";

//if (!newTreeView) {
   arrTriggerSonoff=[];
   if (triggerBySonoffPower) {
      $('sonoff.*.*.POWER*').each(function(id, i) {  if (existsState(id)) arrTriggerSonoff.push(id) });}
        
   if (triggerBySonoffSwitch) {      
      $('sonoff.*.*.Switch*').each(function(id, i) {  if (existsState(id)) arrTriggerSonoff.push(id) });}  // }else {
//---------------------------------------------------------------------------------------------------------


 
 async function setReset(){await Sleep(2000);setState(`${welcherSpeicherOrt}.Spalte12`,"iframe_closed"); setState(`${welcherSpeicherOrt}.Spalte13`,0)}
 setReset()

async function writeHTML(mitDatenGet){
  makeMyVisScripte();

    if (mitSchalter  ) triggerBySonoffPower=true; 
     aktiv=0;  inaktive=0;
 //laeuftSchon=true;

 let seitenLeistenTest="";
 //log(flexboxView.toString())
 flexboxView ? htmlTabUeber3=`</tr></thead><tbody></tbody></table><div class="divFlexBoxen${dpVIS}  thescroller${dpVIS}" >` :
              htmlTabUeber3=`</tr></thead><tbody class="scrollContent${dpVIS}" > `;
 let htmlTabUeber1=htmlTabUeber4
myObject=[];

//let makeJsonWidget=[];
htmlOut="";
counter=-1;

 //--------------------------------------------------------------------------------------------------------------------------------------------------
 //---------hier kommt eure schleife rein counter++, tabelleBind() und tabelleFinish() müssen so integriert bleiben !!!------------------------------
 //---------alle val[x] werte müssen von euch bestimmt werden - val[0],val[1],val[2] !!!-------------------------------------------------------------
 //--------------------------------------------------------------------------------------------------------------------------------------------------
//if(!newTreeView){

var myColl=[];
var val1help;
let welcheView="";
  var tempArr=[];var humArr=[];var illArr=[];var sw1Arr=[];var sw2Arr=[];var irArr=[];;var rfArr=[];var disArr=[];var colArr=[];
   thisSensors=[] ;
 /* if (!newTreeView) { 
  $('sonoff.*.*.*').each(function(id, i) {   var ida = id.split('.'); if(ida[3].indexOf("_Temperature")>-1) tempArr.push(id);
                                                                      if(ida[3].indexOf("_Humidity")>-1)  humArr.push(id); 
                                                                      if(ida[3].indexOf("_Illuminance")>-1) illArr.push(id);
                                                                      if(ida[3].indexOf("POWER1")>-1) sw1Arr.push(id);
                                                                      if(ida[3].indexOf("POWER2")>-1) sw2Arr.push(id);
                                                                      if(ida[3].indexOf("_Distance")>-1) disArr.push(id);
                                                                      if(ida[3].indexOf("IrReceived_Data")>-1) irArr.push(id);
                                                                      if(ida[3].match(/RfReceived_Data/)!=null) rfArr.push(id);
                                                                      if(ida[3].indexOf("Color")==0) colArr.push(id);
                                                                     
                                                       });} else { 
    $('sonoff.*.*.*').each(function(id, i) {   var ida = id.split('.'); if(ida.length>=5){ //log(id)
                                                                      if(id.indexOf("Temperature")>0) tempArr.push(id);
                                                                      if(id.indexOf("Humidity")>0)  humArr.push(id); 
                                                                      if(id.indexOf("Illuminance")>0) illArr.push(id);
                                                                      if(ida[4].indexOf("POWER1")>-1) sw1Arr.push(id);
                                                                      if(ida[4].indexOf("POWER2")>-1) sw2Arr.push(id);
                                                                      if(id.indexOf("Distance")>0) disArr.push(id); 
                                                                      if(id.indexOf("IrReceived_Data")>0) irArr.push(id);
                                                                      if(id.indexOf("RfReceived_Data")>0) irArr.push(id);
                                                                      if(id.indexOf("Color")>0) colArr.push(id);
    }
                                                       });

                                                       } */
      let markerSensor;
     $('sonoff.*.*.*').each(function(id, i) {
        
       var ida = id.split('.');
       if(ida.length>=5){          markerSensor="long";
                                                                      if(id.indexOf("Temperature")>0) tempArr.push(id);
                                                                      if(id.indexOf("Humidity")>0)  humArr.push(id); 
                                                                      if(id.indexOf("Illuminance")>0) illArr.push(id);
                                                                      if(ida[4].indexOf("POWER1")>-1) sw1Arr.push(id);
                                                                      if(ida[4].indexOf("POWER2")>-1) sw2Arr.push(id);
                                                                      if(id.indexOf("Distance")>0) disArr.push(id); 
                                                                      if(id.indexOf("IrReceived_Data")>0) irArr.push(id);
                                                                      if(id.indexOf("RfReceived_Data")>0) irArr.push(id);
                                                                      if(id.indexOf("Color")>0) colArr.push(id); 
       }  else { if(ida.length<=4){ markerSensor="short";
                                                                      if(ida[3].indexOf("_Temperature")>-1) tempArr.push(id);
                                                                      if(ida[3].indexOf("_Humidity")>-1)  humArr.push(id); 
                                                                      if(ida[3].indexOf("_Illuminance")>-1) illArr.push(id);
                                                                      if(ida[3].indexOf("POWER1")>-1) sw1Arr.push(id);
                                                                      if(ida[3].indexOf("POWER2")>-1) sw2Arr.push(id);
                                                                      if(ida[3].indexOf("_Distance")>-1) disArr.push(id);
                                                                      if(ida[3].indexOf("IrReceived_Data")>-1) irArr.push(id);
                                                                      if(ida[3].match(/RfReceived_Data/)!=null) rfArr.push(id);
                                                                      if(ida[3].indexOf("Color")==0) colArr.push(id);
                                  }
       }
     

    });

    //log(illArr);log(humArr);log(tempArr);log(colArr);log(sw1Arr);log(disArr);
   
   $('sonoff.*.*.INFO.*Module').each(function(id, i) { 
      
        thisSensors=[];
        Eyestday="";  Etoday=""; Etotal=""; Epower="";  dieSchalter=[]; ; thisID;
        let ida = id.split('.');
        
      
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1.Module") )                                                               { welcheView="newOver10" ; newOverTasmota10(id,ida); /*log("------------NEU über T10: "+id)*/}
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+".INFO.Module") && existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Wifi.BSSId"))    { welcheView="newUnder10"; withoutTasmota10(id,ida); /*log("------------NEU unter T10: "+id)*/}
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+".INFO.Module") && !existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Wifi.BSSId"))   { welcheView="oldUnder10"; withoutTasmota10(id,ida); /*log("------------ALT unter T10: "+id)*/}
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+".INFO.Info1_Module")  )                                                                 { welcheView="oldOver10" ; oldOverTasmota10(id,ida); /*log("-----------ALT über T10: "+id)*/}
                           // sonoff.3.ESP32Entfernung.INFO.Info1_Module

       //   if (!newTreeView) {
                         
                     

        //if(id==)
       if ( welcheView=="oldOver10") { 
            if( existsState(id.replace("INFO.Info1_Module","Wifi_RSSI")) && val[1]=="true") {   val[3]=getState(id.replace("INFO.Info1_Module","Wifi_RSSI")).val.toString(); }    else {val[3]="0"}       
        //  if( existsState(id.replace("Module","IPAddress")) ) {   val[4]= ` <a href="http://${getState(id.replace("Module","IPAddress")).val}" target="_blank"><button style="font-size: 75%; background:transparent; color:${htmlFarbFelderschrift}">${getState(id.replace("Module","IPAddress")).val}</button> </a>`} 
        if( existsState(id.replace("INFO.Info1_Module","Uptime")) ) {    val[5]=getState(id.replace("INFO.Info1_Module","Uptime")).val.toString() }
        if( existsState(id.replace("INFO.Info1_Module","ENERGY_Yesterday")) ) {Eyestday=getState(id.replace("INFO.Info1_Module","ENERGY_Yesterday")).val.toString() }
        if( existsState(id.replace("INFO.Info1_Module","ENERGY_Today")) ) {Etoday=getState(id.replace("INFO.Info1_Module","ENERGY_Today")).val.toString() }
        if( existsState(id.replace("INFO.Info1_Module","ENERGY_Total")) ) {Etotal=getState(id.replace("INFO.Info1_Module","ENERGY_Total")).val.toString() }
        if( existsState(id.replace("INFO.Info1_Module","ENERGY_Power")) ) {Epower=getState(id.replace("INFO.Info1_Module","ENERGY_Power")).val.toString() }
        $("sonoff.*."+ida[2]+".POWER*").each(function(ad, y) { let idg = ad.split('.'); if (  ((!existsState("sonoff."+idg[1]+'.'+idg[2]+".POWER1") && ad=="sonoff."+idg[1]+'.'+idg[2]+".POWER" ) || (idg[3].length>=6  )) && existsState(ad) ) dieSchalter.push(ad)   });
         }
       if (welcheView=="oldUnder10" ) {          
        if( existsState(id.replace("INFO.Module","Wifi_RSSI")) && val[1]=="true") {   val[3]=getState(id.replace("INFO.Module","Wifi_RSSI")).val.toString(); }    else {val[3]="0"}       
        //  if( existsState(id.replace("Module","IPAddress")) ) {   val[4]= ` <a href="http://${getState(id.replace("Module","IPAddress")).val}" target="_blank"><button style="font-size: 75%; background:transparent; color:${htmlFarbFelderschrift}">${getState(id.replace("Module","IPAddress")).val}</button> </a>`} 
        if( existsState(id.replace("INFO.Module","Uptime")) ) {    val[5]=getState(id.replace("INFO.Module","Uptime")).val.toString() }
        if( existsState(id.replace("INFO.Module","ENERGY_Yesterday")) ) {Eyestday=getState(id.replace("INFO.Module","ENERGY_Yesterday")).val.toString() }
        if( existsState(id.replace("INFO.Module","ENERGY_Today")) ) {Etoday=getState(id.replace("INFO.Module","ENERGY_Today")).val.toString() }
        if( existsState(id.replace("INFO.Module","ENERGY_Total")) ) {Etotal=getState(id.replace("INFO.Module","ENERGY_Total")).val.toString() }
        if( existsState(id.replace("INFO.Module","ENERGY_Power")) ) {Epower=getState(id.replace("INFO.Module","ENERGY_Power")).val.toString() }
        $("sonoff.*."+ida[2]+".POWER*").each(function(ad, y) { let idg = ad.split('.'); if (  ((!existsState("sonoff."+idg[1]+'.'+idg[2]+".POWER1") && ad=="sonoff."+idg[1]+'.'+idg[2]+".POWER" ) || (idg[3].length>=6  )) && existsState(ad) ) dieSchalter.push(ad)   }); 
     } else {  if (welcheView=="newOver10" || welcheView=="newUnder10") { 
        
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Wifi.RSSI") && val[1]=="true") {   val[3]=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Wifi.RSSI").val.toString(); }    else {val[3]="0"}       
        //  if( existsState(id.replace("Module","IPAddress")) ) {   val[4]= ` <a href="http://${getState(id.replace("Module","IPAddress")).val}" target="_blank"><button style="font-size: 75%; background:transparent; color:${htmlFarbFelderschrift}">${getState(id.replace("Module","IPAddress")).val}</button> </a>`} 
        if( existsState( ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Uptime") ) {    val[5]=getState( ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"STATE.Uptime").val.toString() }
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Yesterday") ) {Eyestday=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Yesterday").val.toString() }
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Today") ) {Etoday=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Today").val.toString() }
        if( existsState( ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Total") ) {Etotal=getState( ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Total").val.toString() }
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Power") ) {Epower=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"SENSOR.ENERGY.Power").val.toString();  }
        $("sonoff.*."+ida[2]+".POWER*").each(function(ad, y) { let idg = ad.split('.'); if (  ((!existsState("sonoff."+idg[1]+'.'+idg[2]+".POWER1") && ad=="sonoff."+idg[1]+'.'+idg[2]+".POWER" ) || (idg[3].length>=6  )) && existsState(ad) ) dieSchalter.push(ad)   }); 
     }}

     // ---- Alle gleich bei A_LIVE
     
         if(tempArr.length>0) {   for (let pp=0;pp<tempArr.length;pp++){ if(tempArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val   )  { //log(tempArr[pp]+"  -  "+id);
                                                                                                        let idc = tempArr[pp].split('.');// log(ida[2]+idc[2])
                                                                                                        let helpNameTemp//;log(markerSensor)
                                                                                                        if(idc.length>=5){          markerSensor="long";}    else { if(idc.length<=4){ markerSensor="short";}}
                                                                                                        markerSensor=="short" ? helpNameTemp=idc[3].replace("_Temperature","") : helpNameTemp=helpNameTemp=idc[5].replace("_Temperature","")
                                                                                                        if( existsState(tempArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push(helpNameTemp+": "+getState(tempArr[pp]).val.toString()+" °C") } }

         }}
         if(humArr.length>0 ) {for (let pp=0;pp<humArr.length;pp++){ if(humArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = humArr[pp].split('.');
                                                                                                        if( existsState(humArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("Hum: "+getState(humArr[pp]).val.toString()+" %") } }

         }}
         if(illArr.length>0 ) {for (let pp=0;pp<illArr.length;pp++){ if(illArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = illArr[pp].split('.');
                                                                                                        if( existsState(illArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("Ill: "+getState(illArr[pp]).val.toString()+" lx") } }

         }}
         if(irArr.length>0 ) {for (let pp=0;pp<irArr.length;pp++){ if(irArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = irArr[pp].split('.');
                                                                                                        if( existsState(irArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("IR: "+getState(irArr[pp]).val.toString()) } }

         }}
         if(disArr.length>0 ) {for (let pp=0;pp<disArr.length;pp++){ if(disArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = disArr[pp].split('.');
                                                                                                        if( existsState(disArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("Dis: "+getState(disArr[pp]).val.toString()+" cm") } }

         }}
         if(rfArr.length>0 ) {for (let pp=0;pp<rfArr.length;pp++){ if(rfArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = rfArr[pp].split('.');
                                                                                                        if( existsState(rfArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("Rf: "+getState(rfArr[pp]).val.toString()) } }

         }}
         if(colArr.length>0 ) {for (let pp=0;pp<colArr.length;pp++){ if(colArr[pp].includes(ida[2]) && getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ) { //log(val[1])
                                                                                                        let idc = colArr[pp].split('.');
                                                                                                        if( existsState(colArr[pp]) && ida[2]==idc[2]  ) {thisSensors.push("Col: "+getState(colArr[pp]).val.toString()) } }

         }}
    
         

         makeTheFirstObject(id); 

    // } else{log("Wrong Datapoints - not supported - contact script owner","warn")}
       
    }); 


   
          
                                                  // diese function muss als letztes in der eigenen schleife aufgerufen werden
                                            // Schleifen Ende - je nach schleifenart muss hier etwas geändert werden !!!!!!!!!

   // Sortierungen---------------------------------------------------------
    if (mitAlphabet) welcheSortierung=0;
   
 // log(myObject[3].isOnline +" type "+typeof myObject[3].isOnline )
 // log(myObject[3].isOnline +" type "+typeof myObject[3].isOnline )
   if( sortierenEIN )    { //&& (welcheSortierung==3 || welcheSortierung==4 || welcheSortierung==1 )
              
              if(welcheSortierung==3) {myObject.sort(function (alpha, beta) { return  Number(beta["value3"]) -Number(alpha["value3"]);   }); }
           //   if(welcheSortierung==4) myObject.sort(function (alpha, beta) { /*log(beta.valueuptime+" --" +alpha.valueuptime);*/ return  beta.valueuptime -alpha.valueuptime;   });
              if(  welcheSortierung==4)   myObject.sort( function( a, b )   {
	                                      	a = a["value4"].split( '.' );
	                                      	b = b["value4"].split( '.' );
	                                    	for( var i = 0; i < a.length; i++ )	{
		                                 	if( ( a[i] = parseInt( a[i] ) ) < ( b[i] = parseInt( b[i] ) ) )
		                         		return -1;	else if( a[i] > b[i] )
		                            	return 1;}  	return 0;} );  

                if(welcheSortierung==7)   myObject.sort( function( a, b )   {
	                                      	a = a["value6"].split( '.' ); // log(a)
	                                      	b = b["value6"].split( '.' );
	                                    	for( var i = 0; i < a.length; i++ )	{
		                                 	if( ( a[i] = parseInt( a[i] ) ) < ( b[i] = parseInt( b[i] ) ) )
		                         		return -1;	else if( a[i] > b[i] )
		                            	return 1;}  	return 0;} );   

                                        myObject.sort(function (alpha, beta) {
                     if(welcheSortierung==6)   return  beta["dieSchalter"].length -alpha["dieSchalter"].length;   });                                                               

             
     switch (welcheSortierung) {
        case 0: sortMe("alpha","value0");break;  //name
        case 1: sortMe("alpha","value1");break;//log("online");break;  //online- string
        case 2: sortMe("alpha","value2");break;  //type
        case 3: break;  
        case 4: break;  
        case 5: sortMe("alpha","value5");break;  
        case 6:  break; //  sortMe("num","dieSchalter.length");
        case 7: break; // sortMe("alpha","value6");
     }   }

    for(let zz=0;zz<myObject.length;zz++){
     
  // Unterüberschften ------------------------------------------------------       
         if (mitAlphabet){
           if( myObject[zz].value0[0]!=helperLeerzeile){ tabelleAusbessern();
                                                         aktiv--
                                                         counter=-1;  for(let ic=0;ic<mehrfachTabelle;ic++ ) { for (let tt=0 ;tt<val.length;tt++) 
                                                                                                                   { tt==0 && ic==0 ? val[tt]=(myObject[zz].value0[0]).toUpperCase() : val[tt]="&ensp;"
                                                                                                                   }   
                                                                                                               counter++;tabelleBind();langeGesamt++; }
           helperLeerzeile=myObject[zz].value0[0] } ;
           // sortierenEIN=false;
           }

  // Zuteilung der Tabellenspalten-------------------------------------------
   
     val[0]=myObject[zz].value0;
     val[1]=myObject[zz].value1; //log(myObject[zz].value0)
     val[2]=myObject[zz].value2;
     val[3]=myObject[zz].value3+"%";
     val[4]=myObject[zz].value4;
     val[5]=myObject[zz].value5;
     val[7]=myObject[zz].value6.replace(/(.+)\((.+)\)/,"$1");  //</br>$2
     versionFlex=myObject[zz].value6.replace(/(.+)\((.+)\)/,"$1<br>($2)");
     dieSchalter=myObject[zz].dieSchalter;
     thisID=myObject[zz].thisID;
     Epower=myObject[zz].Epower;
     Etoday=myObject[zz].Etoday;
     Etotal=myObject[zz].Etotal;
     Eyestday=myObject[zz].Eyestday;
     thisSensors=myObject[zz].thisSensors;
    // if (myObject[zz].thisSensors.length >0) log(myObject[zz].thisSensors.toString())


   
    let allButtons="";
    if (myObject[zz].value1!="true" ) allButtons=" --- ";
    for(let oo=0;oo<dieSchalter.length;oo++){ //if(thisID.includes("211")) log(dieSchalter[oo]+'--'+myObject[zz].value1)
                               if(dieSchalter.length>1 /*&& oo >= 1*/ && val[2]!="Sonoff Basic" && myObject[zz].value1=="true"  ){ allButtons= allButtons+ makeButtons(getState(dieSchalter[oo]).val,dieSchalter[oo])//+"&ensp;";
                                                                                                                               if(oo==2) allButtons=allButtons+""} else{ 
                                    if ( dieSchalter.length==1 && myObject[zz].value1=="true" ) allButtons= makeButtons(getState(dieSchalter[oo]).val,dieSchalter[oo])//+"&ensp;"
                                    if ( dieSchalter.length>1 && val[2]=="Sonoff Basic" && myObject[zz].value1=="true" && oo==1 ) allButtons= makeButtons(getState(dieSchalter[oo]).val,dieSchalter[oo])//+"&ensp;"
                                    }
                                                                       
    }
 // if(dieSchalter.length>2)  log(val[6])
 //   allButtons=allButtons.replace(/(.+)(\&ensp\;)$/g,"$1");
 //   allButtons=allButtons.replace(/(.+)(\&ensp\;)(<br>)$/g,"$1$3");
    val[6]=allButtons
   //if(thisID.includes("211")) log(allButtons)
    

     function makeButtons(value,dpID) {// log(dpID)
         valButton=dpID.replace(/.+\.(P)OWER(.*)/,"$1 $2");
       if( value)  {return  "<button class=\"retteAnsicht"+dpVIS+"\" style=\"margin-left:5px; margin-right:5px; border:0px solid\; text-align:center; width: 35px; border-radius: 5px; background\:"+powerButtonColorONBkground+"\; color\:"+powerButtonColorONSchrift+"\; font\-size\:75%\;\"  onclick=\"setOnDblClickCustom\(\'"+dpID+"\')\">"+valButton + "</button>" } 
              else {return  "<button class=\"retteAnsicht"+dpVIS+"\" style=\"margin-left:5px; margin-right:5px; border:0px solid\; text-align:center; width: 35px; border-radius: 5px; background\:"+powerButtonColorOFFBkground+"\; color\:"+powerButtonColorOFFSchrift+"\; font\-size\:75%\;\"  onclick=\"setOnDblClickCustom\(\'"+dpID+"\')\">"+valButton + "</button>" }
     }  

     
    if (myObject[zz].value1!="true") {val[1]=symbolSchalter[2];inaktive++}
     if (myObject[zz].value1=="true")  {val[1]=symbolSchalter[1];aktiv++}

    if (myObject[zz].value1!="true") {   //farbeNichtConnected
               val[4]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+"> ")+val[4]+"</i></font>";
               val[2]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+"> ")+val[2]+"</i></font>";
               val[3]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">")+val[3]+"</i></font>";
               val[5]=("<font color=\""+farbeNichtConnected+"\">")+" --- </i></font>" ;
               val[6]=("<font color=\""+farbeNichtConnected+"\"> ")+val[6]+"</i></font>";
             //  val[7]=("<font color=\""+farbeNichtConnected+"\">")+" --- ";
               val[0]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+"> ")+val[0]+"</i></font>";
               val[1]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+"> ")+val[1]+"</i></font>"
               val[7]=("<font color=\""+farbeNichtConnected+"\"><"+styleNichtErreichbar+">")+val[7]+"</i></font>";} 
          


                             
      counter++;                                       // SEHR WICHTIG - MUSS IN JEDER SCHLEIFE INTEGRIERT SEIN
     flexboxView ? flexboxBind(myObject[zz].value1) : tabelleBind();                                   // HIER NICHTS ÄNDERN : HIER WERDEN DIE DATEN DER SCHLEIFE ZUSAMMENGESETZT  
      langeGesamt++;                                   // WICHTIG Seitenleiste
    }

  
           
 //-------------------------------------------------------------------------------------------------------------------------------------------------
 //--------------------------------------------------Ende der schleife------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------------

       // AB HIER NICHTS ÄNDERN - tabelle fertigstellen
         
  if (braucheMaterialDesignWidgetList) {   setState("javascript." + instance + ".Tabellen@Liv."+dpVIS+".Sonoff_MD_List",JSON.stringify(myJsonWidget2)); }
  if (braucheMaterialDesignWidget) {setState("javascript." + instance + ".Tabellen@Liv."+dpVIS+".Sonoff_MD_Table",JSON.stringify(myJsonWidget)); }
   myJsonWidget2=[];


       let timeout = setTimeout(function () {
                                               flexboxView ? flexboxFinish() :  tabelleFinish(); 
                                            //  if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) { /* log('file written');*/  });}
                                            
//                                               setState("javascript." + instance + ".Tabellen@Liv."+dpVIS+".HostDaten",hostDaten); //log(hostDaten)
                                            }, 250); 
    
  
                                             

 //-------------------------------------------------------------------------------------------------------------------------------------------------
 //--------------------------------------------------Ende der schleife------------------------------------------------------------------------------
 //-------------------------------------------------------------------------------------------------------------------------------------------------

 
    htmlTabUeber2=""
 let backgroundSeiteRechts="transparent";
 let borderSeiteRechts=""
 if(flexboxView) {backgroundSeiteRechts=htmlGrad1BkgroundSpalteUeber;borderSeiteRechts=" border-bottom:"+LinieUnterUeberschrift+"px solid "+innenBorder+" !important;"}
    //seitenleiste rechts und mittelbalken
if(ichWillAuchRechtsEineLeiste){
 htmlSeitenleisteRechts= "<th class=\"seitenleiste"+dpVIS+"\" style=\" "+borderSeiteRechts+" background: "+backgroundSeiteRechts+"; margin-top: 200px; color: "+htmlFarbSeiteSchrift+ ";font-size:"+schriftGroesseSeitenleiste+"px; vertical-align:top; text-align:center \" width=\""+breiteSeitenleiste+"\" rowspan=\""+(langeGesamt+1)+"\">"+seitenLeistenTest+"</th>"
 htmlSeitenleisteRechts2="<th class=\"seitenleiste"+dpVIS+"\" style=\" "+borderSeiteRechts+" background: "+backgroundSeiteRechts+"; margin-top: 200px; color: "+htmlFarbSeiteSchrift+ ";font-size:"+schriftGroesseSeitenleiste+"px; vertical-align:top; text-align:center \" width=\""+breiteSeitenleiste+"\" rowspan=\""+(langeGesamt+1)+"\">"+seitenLeistenTest+"</th>"
 htmlMittelLeiste="<td class=\"seitenleiste"+dpVIS+"\" style=\"  margin-top: 200px; color: "+htmlFarbSeiteSchrift+ ";font-size:"+schriftGroesseSeitenleiste+"px; vertical-align:top; text-align:center \" width=\""+((((Number(breiteSeitenleiste))/8).toFixed(0)))+"\" rowspan=\""+(langeGesamt+1)+"\">"+seitenLeistenTest+"</td>"
 } else{ htmlSeitenleisteRechts="";htmlMittelLeiste="";
         }   
htmlMittelLeiste="";
 if(mehrfachTabelle>1) htmlSeitenleisteRechts2 = "" ;
  if(mehrfachTabelle==1 && !ichWillAuchRechtsEineLeiste) htmlSeitenleisteRechts2 = "" ;
 //SpaltenÜberschrift
for (let ue=0;ue<htmlSpalte1Weite.length;ue++) {  
                                                if (!schalterInSpaltenUeberschrift[ue] ) {  htmlTabUeber2=htmlTabUeber2.concat("<td  style=\"color:"+htmlFarbTableColorUber+"\">"+htmlFeld[ue]+"</td>")} 

                    else {let valButton=welcherSpeicherOrt+".Spalte"+ue;
                     if(ue==htmlSpalte1Weite.length-1) {htmlTabUeber2=htmlTabUeber2.concat("<th  class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" style=\" font-weight: normal; font-size :"+groesseUeberschrift+"px; color: "+htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+";\" >"+
                                                                   "<span class=\"mySpan"+dpVIS+"\"></span><button class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                   +htmlFeld[ue]+"</button>"+" </th>"+htmlSeitenleisteRechts2)
                                                                   } else{
                                        
                                        if(ue==0) { myScann=(myScann.replace("scanned in ","")).replace("seconds","s"); htmlTabUeber2=htmlTabUeber2.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" style=\" font-weight: normal; font-size :"+groesseUeberschrift+"px; color: "+htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+";\" >"+
                                                                   "<span class=\"mySpan"+dpVIS+"\"></span><button class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                   +htmlFeld[ue]+"</button>"+"   &ensp;&ensp;&ensp;("+aktiv+"\/"+(aktiv+inaktive)+")</th>")

                                        } else{
                                        htmlTabUeber2=htmlTabUeber2.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\">"+""
                                                                    +"<span class=\"mySpan"+dpVIS+"\"></span><button class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                    +htmlFeld[ue]+"</button></th>");
                                                                    
                                                                     } // sonst
                                                                      } //ue!=last 
                       }}
 


//SpaltenÜberschrift bei mehrfachtabelle
 
 if (!flexboxView){ htmlTabUeber2_1=""
for (let ue=0;ue<htmlSpalte1Weite.length;ue++) { let valButton="javascript." + instance + ".Tabellen@Liv."+dpVIS+".Spalte"+ue;
    if(ue==htmlSpalte1Weite.length-1) {htmlTabUeber2_1=htmlTabUeber2_1.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" >"
                                                                    +"<span class=\"mySpan"+dpVIS+"\"></span><button  class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                    +htmlFeld[ue]+"</button></th>"+htmlSeitenleisteRechts)}
    else{ if(ue==0){htmlTabUeber2_1=htmlTabUeber2_1.concat(htmlMittelLeiste+"<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" >"
                                                                    +"<span class=\"mySpan"+dpVIS+"\"></span><button class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                    +htmlFeld[ue]+"</button></th>")


    } else{
     htmlTabUeber2_1=htmlTabUeber2_1.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" >"+""
                                                                    +"<span class=\"mySpan"+dpVIS+"\"></span><button class=\"myButt"+dpVIS+"\"  onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                    +htmlFeld[ue]+"</button></th>")}}  } 

 }else { htmlTabUeber2_1="";for (let ue=0;ue<htmlSpalte1Weite.length;ue++) { htmlTabUeber2_1=htmlTabUeber2_1.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+" emptyFlex2_1"+dpVIS+"\">"+htmlFeld[ue]+"</th>")}
     
 /*    for (let ue=0;ue<htmlSpalte1Weite.length;ue++) { 
     htmlTabUeber2_1=htmlTabUeber2_1.concat("<th class=\"myTHclass"+dpVIS+" toDel"+dpVIS+"\" >"+""
                                                                    +"<button class=\"myButt"+dpVIS+"\" style\=\" border-radius: 4px; border:"+schalterUmrahmung+"px solid; background-color\: "+htmlBackgroundButtonUeberschrift+"; color: "
                                                                    +htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+"; font-size :"+groesseUeberschrift+"px; text-align:left\" onclick=\"setOnOtherValue\(\'"+valButton+"\')\">"
                                                                    +htmlFeld[ue]+"</button></th>")}*/
 }                                                                  
                                                                    

  htmlTabUeber="";

  switch (mehrfachTabelle) { 
    case 1: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber3;  break;
    case 2: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber3; break;
    case 3: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber2_1+htmlTabUeber3; break;
    case 4: htmlTabUeber=htmlTabUeber1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber2+htmlTabUeber2_1+htmlTabUeber3; break;
   };   
   if (!UeberschriftSpalten) {htmlTabUeber=""}
  
    flexboxView ? flexboxFinish() :  tabelleFinish(); 
       if (braucheEinJSON ) {setStateDelayed(welcherSpeicherOrt+".JSONVis",JSON.stringify(makeJsonWidget),1000 )}
      
} // function ende
 
 //MAIN:
  
//schedule(mySchedule,  function () { 
 //if(true) writeHTML(true);
 // if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) { /* log('file written');*/  });}
 //}); 
    writeHTML(true);   
    

  //  setTimeout(function () { if ( existsState(welcherSpeicherOrt+".Spalte8") ) setState(welcherSpeicherOrt+".Spalte8",!getState(welcherSpeicherOrt+".Spalte8").val)    ;}, 1500);                        

  function tabelleBind(){
   
    switch (mehrfachTabelle) { 

    case 1: if(counter%2==0)   {htmlOut=htmlOut+"<tr class=\"myclasstr_gerade"+dpVIS+" \">";
                                for(let u=0;u<val.length;u++){ htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>"); // style=\"width:"+htmlSpalte1Weite[u]+"\" 
                                                             }  htmlOut=htmlOut.concat("</tr>");   break;
 
                                } else   {htmlOut=htmlOut+"<tr class=\"myclasstr_ungerade"+dpVIS+" \">";
                                          for(let u=0;u<val.length;u++){ htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>"); //style=\"width:"+htmlSpalte1Weite[u]+"\" 
                                                                       }  htmlOut=htmlOut.concat("</tr>");   break;
                                }
    
    case 2: if(counter%4==0){  if(counter%2==0)  {htmlOut = htmlOut+"<tr class=\"myclasstr_gerade"+dpVIS+" \">";
                                                  for(let u=0;u<val.length;u++){ if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");} else
                                                                               {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+"\" >"+val[u]+"</td>")}
                                                                               }  
                                                                            
                                 } else { for(let u=0;u<val.length;u++){ htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+" toDel"+dpVIS+"\" style=\"color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>");
                                                                       }  htmlOut=htmlOut.concat("</tr>");  } break;
                            } else {
                              if(counter%2==0)  {htmlOut=htmlOut+"<tr class=\"myclasstr_ungerade"+dpVIS+" \">";
                                                 for(let u=0;u<val.length;u++){  if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");} else
                                                                              {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+" toDel"+dpVIS+"\" >"+val[u]+"</td>")}
                                                                              }  
                                 } else {        for(let u=0;u<val.length;u++){ htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\" style=\"color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>");
                                                                              }  htmlOut=htmlOut.concat("</tr>");  }  break;}

    case 3: if(counter%2==0)  {  if(counter%3==0 ) {htmlOut = htmlOut+"<tr class=\"myclasstr_gerade"+dpVIS+" \">";
                                                    for(let u=0;u<val.length;u++){if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");} else
                                                                                 {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+" toDel"+dpVIS+"\" >"+val[u]+"</td>")}
                                                                                                         }  
                                } else { if(counter%3==1)  {for(let u=0;u<val.length;u++){  if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\" style=\"color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>");} else
                                                                                                               {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+" style=\"  color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>")}
                                                                                                         }  
                                                           } else  { for(let u=0;u<val.length;u++){  htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");
                                                                                                  }  htmlOut=htmlOut.concat("</tr>");  } }  break;
                              } 
                              else {
                                 if(counter%3==0 )  {htmlOut = htmlOut+"<tr class=\"myclasstr_ungerade"+dpVIS+" \">";
                                                    for(let u=0;u<val.length;u++){ if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");} else
                                                                                                      {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+" toDel"+dpVIS+" toDel"+dpVIS+"\" >"+val[u]+"</td>")}
                                                                                                         }  
                                                                                                         
                              } else{ if(counter%3==1 )  { for(let u=0;u<val.length;u++){ if(u<val.length-1) {htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\" style=\"color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>");} else
                                                                                                             {htmlOut=htmlOut.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+" style=\"  color:"+htmlFarbFelderschrift2+"\">"+val[u]+"</td>")}
                                                                                                         }  
                                                          } else {        for(let u=0;u<val.length;u++){ htmlOut=htmlOut.concat("<td class=\"myclasstd_normal"+dpVIS+" toDel"+dpVIS+"\">"+val[u]+"</td>");
                                                                                                       }  htmlOut=htmlOut.concat("</tr>"); } } break;
                              }                                        


                                 
         } //switch ende

 }

  function tabelleAusbessern() {         // bessert mei mehrfachtabellen die nicht vollen zeilenn aus - bevor die unterüberschriften kommen

 switch (mehrfachTabelle) {
         
        case 1:    break;
        case 2:    let helpMehrfach="</td>";
                   for(let w=0;w<val.length;w++){helpMehrfach=helpMehrfach.concat("<td>&ensp;</td>")};helpMehrfach=helpMehrfach.concat("</tr>")
                   if(counter%2==0)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach);
                   break;
        case 3:   let helpMehrfach2="</td>";
                  for(let w=0;w<val.length;w++){helpMehrfach2=helpMehrfach2.concat("<td>&ensp;</td>")};helpMehrfach2=helpMehrfach2.concat("</tr>")
                  if(counter%3==2)  htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
                  if(counter%3==1)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach2);
                  let helpMehrfach3="</td>";
                  let helpMehrfach31="";for(let w=0;w<val.length;w++){helpMehrfach31=helpMehrfach31.concat("<td>&ensp;</td>")}
                  for(let w=0;w<val.length;w++){if(w<val.length-1) {helpMehrfach3=helpMehrfach3.concat("<td>&ensp;</td>")} else
                                                          {helpMehrfach3=helpMehrfach3.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+"\" style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td>"+helpMehrfach31)}
                                                    };helpMehrfach3=helpMehrfach3.concat("</tr>")        
                  if(counter%3==0)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach3);  break; }}

  function tabelleFinish() {

 switch (mehrfachTabelle) {
         
        case 1:    break;
        case 2:    let helpMehrfach="</td>";
                   for(let w=0;w<val.length;w++){helpMehrfach=helpMehrfach.concat("<td>&ensp;</td>")};helpMehrfach=helpMehrfach.concat("</tr>")
                   if(counter%2==0)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach);
                   break;
        case 3:   let helpMehrfach2="</td>";
                  for(let w=0;w<val.length;w++){helpMehrfach2=helpMehrfach2.concat("<td>&ensp;</td>")};helpMehrfach2=helpMehrfach2.concat("</tr>")
                  if(counter%3==2)  htmlOut = htmlOut.replace(/<\/td>$/, "</td></tr>");
                  if(counter%3==1)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach2);
                  let helpMehrfach3="</td>";
                  let helpMehrfach31="";for(let w=0;w<val.length;w++){helpMehrfach31=helpMehrfach31.concat("<td>&ensp;</td>")}
                  for(let w=0;w<val.length;w++){if(w<val.length-1) {helpMehrfach3=helpMehrfach3.concat("<td>&ensp;</td>")} else
                                                          {helpMehrfach3=helpMehrfach3.concat("<td class=\"myclasstd_trennungslinie"+dpVIS+"\" style=\" border-right: "+trennungsLinie+"px solid "+farbetrennungsLinie+"\">&ensp;</td>"+helpMehrfach31)}
                                                    };helpMehrfach3=helpMehrfach3.concat("</tr>")        
                  if(counter%3==0)  htmlOut = htmlOut.replace(/<\/td>$/, helpMehrfach3);  break; }
      
         var htmlUeber=    "<p  class=\"divWeiten"+dpVIS+"\" style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; font-size: "+htmlUEberFontGroesse+"; font-weight:"+htmlSchriftWeite+ "\">"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((new Date().getTime())), 'SS:mm:ss')+"</p>"; 
      //   if(mitSearch) htmlUeber=htmlUeber+searchM

   
         if(htmlSignature) htmlUnter="<div class=\"divWeiten"+dpVIS+"\" style=\"font-style: normal; margin-top: 10px; color:"+htmlFarbUber+"; height: 30px; font-family:"+htmlSchriftart+"; font-size: 85%; text-align: center;\" >"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((new Date().getTime())), "SS:mm:ss");"</div>";

              var htmlOutVIS="";
              if (htmlUberschrift) 
                 { zentriert ? htmlOutVIS=htmlZentriert+htmlUeber+searchMe+htmlTabStyle+htmlTabUeber+htmlOut+"</tbody></table></div></div>"+htmlUnter+"</center>"+ buttonScript : htmlOutVIS=htmlUeber+searchMe+htmlTabStyle+htmlTabUeber+htmlOut+"</tbody></table></div></div>"+htmlUnter+"</center>"+ buttonScript ;
             } else {
                zentriert ?  htmlOutVIS=htmlZentriert+searchMe+htmlTabStyle+htmlTabUeber+htmlOut+"</tbody></table></div></div>"+htmlUnter+"</center>"+ buttonScript :  htmlOutVIS=searchMe+htmlTabStyle+htmlTabUeber+htmlOut+"</tbody></table></div></div>"+htmlUnter+"</center>"+ buttonScript;
             }
                 

   // log("bin raus aus tabelleBind");
            if (braucheEinVISWidget)  setStateDelayed(welcherSpeicherOrt+".HTMLTableVis", htmlOutVIS ,1000);

              
/*
  var htmlUnter= "<div  style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; height: 30px; font-size: 80%;  text-align: center; \" >"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((new Date().getTime())), "SS:mm:ss");+"</div>"

  if (!htmlSignature) htmlUnter="";
   var htmlEnd="</table>"+htmlUnter+"</div></body>";
*/



 }


 function flexboxBind(online){

 let energyHelper="";
 let divHelpi="";//log(online)
 //log(thisSensors.toString())
 //  test= "<div id='b' class='r' style='width:50px;background-image:linear-gradient(to right,#800,#f00 5%,#ff0 20%,#0f0 35%,#0ff 50%,#00f 65%,#f0f 80%,#f00 95%,#800);'><input style=\"width:50px;\" id='sl2' type='range' min='1' max='359' value='0' onchange='lc(\"h\",0,value)'></div>"
   let  colLeiste= "<div id='b' class='r' style='width:50px;height:10px;background-image:linear-gradient(to right,#800,#f00 5%,#ff0 20%,#0f0 35%,#0ff 50%,#00f 65%,#f0f 80%,#f00 95%,#800);'></div>"
 let sensorHelpi=" style=\"display: inline-block;font-size:90%;  margin: auto; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; margin-bottom: 5px;\"><div style=\"font-size: 90%; font-weight: bold;\">SENSORS:</style></div> <br>"; 
        for (let i=0;i<thisSensors.length;i++) {
                 if(thisSensors[i].includes("Col")){ sensorHelpi=sensorHelpi+ thisSensors[i]+"<br>"+colLeiste+"<br>"} else{ sensorHelpi=sensorHelpi+ thisSensors[i]+"<br>"}}
 if(thisSensors.length==0) sensorHelpi=">"
 //log("sensors: "+sensorHelpi)
// log(val[6])
 if (online!="true") divHelpi=`style=\"border-color: black; background-image: linear-gradient(${htmlGradient[0]}deg,${htmlFarbFelderschrift} 10%, #434141 20%)\"`
 if( Etoday!="") { energyHelper="<div  style=\"display: inline-block; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; margin-bottom: 5px;\"><div style=\"font-size: 95%; font-weight: bold;\">ENERGY:</style></div><br>Total: "+Number(Etotal).toFixed(0)+" kWh<br>Heute: "+Number(Etoday).toFixed(2)+" kWh<br>Gestern: "+Number(Eyestday).toFixed(2)+" kWh<br>Power: "+Epower+" W</div>"   }
 
 //  bildHelper!="" ? energyHelper="<img src=\""+pfadFuerBilder+bildHelper+".png \" height=\""+bildergroesse+"\"px width=\""+bildergroesse+"\"px>" : energyHelper=""

 /*  htmlOut=htmlOut+"<div class=\"divFlexBoxenEinzeln"+dpVIS+" divInFlex"+dpVIS+"\" "+divHelpi+"> <div  style=\"font-size: 115%; \">"+
                    "<span style=\"color: "+htmlFarbTableColorUber+"\" >"+val[0]+"<br></span><span style=\"font-size:80%\">("+val[2]+")</span><hr></style></div><br><div style=\"margin-top: 5px; font-size: 90%; \"> <div>"+
                    energyHelper+"</div>INFO:<br>"+versionFlex+"<br>"+val[5]+"<br>"+val[4]+
                    "<br><div  style=\"display: inline-block; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; align: center; margin-bottom: 5px;\"><div style=\"font-size: 90%; font-weight: bold;\">POWER: <br></style><br>"+
                    val[6]+"</div></div><br><div" + sensorHelpi +"</div>"+"</style></div>"+  " </div>"
 */
 htmlOut=htmlOut+ "<div class=\"divFlexBoxenEinzeln"+dpVIS+" divInFlex"+dpVIS+"\" "+divHelpi+">"+
                  "<div><span style=\"font-size: 115%; color: "+htmlFarbTableColorUber+"\" >"+val[0]+"<br></span><span "+ "style=\"font-size:80%\">("+val[2]+")</span><hr></style></div>"+
             //     "<div  style=\"display: inline-block; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; align: center; margin-bottom: 5px;\">"+
                  energyHelper+
                  `<div style=\"display: inline-block; font-size:90%; margin: auto; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; margin-bottom: 5px;\"><span style=\"font-size:95%; font-weight: bold;\">INFO:</span><br>${versionFlex}<br>${val[5]}<br>${val[4]}</div>`+
                  //"style=\"font-size: 90%; font-weight: bold;\">SENSORS:</style></div> <br>"
                  "<div" +sensorHelpi +"</div>"+"</style><br>"+
                  "<div style=\"display: inline-block; font-size:90%; margin: auto; padding: 5px; border: 1px solid; border-radius: 5px ;margin-top: 5px; margin-bottom: 5px;\"><span style=\"font-size: 95%; font-weight: bold;\">POWER:</span> <br></style><br>"+val[6]+"</div>"+
                  "</div>"
                    
  
   }

 function flexboxFinish(){
 var htmlUeber=    "<p  class=\"divWeiten"+dpVIS+"\" style=\"color:"+htmlFarbUber+"; font-family:"+htmlSchriftart+"; font-size: "+htmlUEberFontGroesse+"; font-weight:"+htmlSchriftWeite+ "\">"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((new Date().getTime())), 'SS:mm:ss')+"</p>"; 
      //   if(mitSearch) htmlUeber=htmlUeber+searchMe
  
     if(htmlSignature) htmlUnter="<div class=\"divWeiten"+dpVIS+"\"  style=\"font-style: normal; margin-top: 10px; color:"+htmlFarbUber+"; height: 30px; font-family:"+htmlSchriftart+"; font-size: 85%; text-align: center;\" font-style=\"normal\" font-color=\""+htmlFarbUber+"\" >"+htmlFeldUeber+"&ensp;&ensp;Last Update: "+formatDate(getDateObject((new Date().getTime())), "SS:mm:ss");"</div>";
  //  let htmlIframe=`<div style="margin-top: 20px" ><iframe class =\"flexBoxIframe${dpVIS}\" id="iframe${dpVIS}" src=""  frameborder="5" width="0" height="0" style="" ></iframe></div>`
    let htmlIframe=`<div style="margin-top: 20px; text-align: right;" ><div class="close${dpVIS}" style=\"color: white;\" ></div><iframe class =\"flexBoxIframe${dpVIS}\" id="iframe${dpVIS}" src=""  frameborder="0" width="0" height="0" style="" ></iframe></div>`
 
    var htmlOutVIS="";
              if (htmlUberschrift) 
                 { zentriert ? htmlOutVIS=htmlZentriert+htmlUeber+searchMe+htmlTabStyle+htmlTabUeber+htmlIframe+htmlOut+"</div></div></div>"+htmlUnter+"</center>"+ buttonScript : htmlOutVIS=htmlUeber+htmlTabStyle+htmlTabUeber+htmlIframe+htmlOut+"</div></div></div>"+htmlUnter+"</center>"+ buttonScript ;
             } else {
                zentriert ?  htmlOutVIS=htmlZentriert+searchMe+htmlTabStyle+htmlTabUeber+htmlIframe+htmlOut+"</div></div></div>"+htmlUnter+"</center>"+ buttonScript :  htmlOutVIS=htmlTabStyle+htmlTabUeber+htmlIframe+htmlOut+"</div></div></div>"+htmlUnter+"</center>"+ buttonScript;
             }
  
  setStateDelayed(welcherSpeicherOrt+".HTMLTableVis", htmlOutVIS ,1000);

 }
let noon=false;
async function needDP(){
    willUnterUserdataSpeichern ? welcherSpeicherOrt="0_userdata.0.Tabellen@Liv."+dpVIS : welcherSpeicherOrt="javascript." + instance + ".Tabellen@Liv."+dpVIS
    
    for(let s=0;s<schalterInSpaltenUeberschrift.length;s++){ if(schalterInSpaltenUeberschrift[s]){
    if (!(await existsStateAsync(welcherSpeicherOrt+".Spalte"+s))) { if(s==12 || s==11) {
              if (s==12) await createStateAsync(welcherSpeicherOrt+".Spalte"+s, "iframe_closed",{type: "string", name: "Schalter_Spalte"+s, role: "value", read: true, write: true } );
              if (s==11) {await createStateAsync(welcherSpeicherOrt+".Spalte"+s, "",{type: "string", name: "Schalter_Spalte"+s, role: "value", read: true, write: true } );
                          await setStateAsync(welcherSpeicherOrt+".Spalte"+s, "")}
                                                                   } else{     if(s==13 || s==14) {await createStateAsync(welcherSpeicherOrt+".Spalte"+s, 0,{type: "number", name: "Schalter_Spalte"+s, role: "value", read: true, write: true, } )} else {
              await createStateAsync(welcherSpeicherOrt+".Spalte"+s, false,{type: "boolean", name: "Schalter_Spalte"+s, role: "value", read: true, write: true, } );}} } 
      }}

    if (!(await existsStateAsync(welcherSpeicherOrt+".HTMLTableVis"))) {                  //   ("javascript." + instance + ".Tabellen@Liv."+dpVIS+".HTMLTableVis")
        await createStateAsync(welcherSpeicherOrt+".HTMLTableVis", "empty",{type: "string", name: "HTML_Standard_Widget_mit_Binding", role: "value", read: true, write: true, } ); } 
     if (!(await existsStateAsync(welcherSpeicherOrt+".JSONVis"))) {
        await createStateAsync(welcherSpeicherOrt+".JSONVis", "",{type: "string", name: "JSON Format", role: "value", read: true, write: true, } ); }   
    if(false)  {
    if (!(await existsStateAsync("javascript." + instance + ".Tabellen@Liv."+dpVIS+".Sonoff_MD_Table"))) {
        await createStateAsync("Tabellen@Liv."+dpVIS+".Sonoff_MD_Table", "",{type: "string", name: "Sonoff MD Table MD", role: "value", read: true, write: true, } ); } 
     if (!(await existsStateAsync("javascript." + instance + ".Tabellen@Liv."+dpVIS+".Sonoff_MD_List"))) {
        await createStateAsync("Tabellen@Liv."+dpVIS+".Sonoff_MD_List", "",{type: "string", name: "Sonoff MD List MD", role: "value", read: true, write: true, } ); } 
}
await Sleep(2000);
} 

   setTimeout(function () { 

  //  let arrTriggerSonoffSchalter=[]
    $(welcherSpeicherOrt+".Spalte*").each(function(id, i) {  
           arrTriggerSonoff.push(id) 
    });
 //   for(let z=0;z<arrTriggerSonoff.length;z++){
   // log(arrTriggerSonoff[z])}

 //log(arrTriggerSonoff.toString())
  let Schaltcounter=0
     on({id: arrTriggerSonoff,  change: "ne"}, async function (obj) {
   // on({id: arrTriggerSonoff, change: "ne"}, function (obj) { 
      Schaltcounter++;  
      var value = obj.id; 
      if(showTriggerActivity )log("trigger"+value,"warn")
        if(!noon) { // wegen sonderTablet schaltet spalte 10 und 8 - 8 wird geblockt
        noon=true;//log(obj.id)
      if (obj.id==welcherSpeicherOrt+".Spalte0")   welcheSortierung=0; //name
      if (obj.id==welcherSpeicherOrt+".Spalte1" )  welcheSortierung=1 ; //online
      if (obj.id==welcherSpeicherOrt+".Spalte2" )  welcheSortierung=2; //type
      if (obj.id==welcherSpeicherOrt+".Spalte3" )  welcheSortierung=3; //rssi
      if (obj.id==welcherSpeicherOrt+".Spalte4")   welcheSortierung=4; //ip
      if (obj.id==welcherSpeicherOrt+".Spalte5")   welcheSortierung=5; //uptime
      if (obj.id==welcherSpeicherOrt+".Spalte6")   welcheSortierung=6; //power
      if (obj.id==welcherSpeicherOrt+".Spalte7")   welcheSortierung=7; //version
      


      if (obj.id==welcherSpeicherOrt+".Spalte8")   {flexboxView=flexboxView;refreshHelperOn=false;}
      if (obj.id==welcherSpeicherOrt+".Spalte9" )  {flexboxView=!flexboxView;refreshHelperOn=false;}
      if (obj.id==welcherSpeicherOrt+".Spalte10" )  {flexboxView=!flexboxView;refreshHelperOn=false;}

      if(getState(welcherSpeicherOrt+".Spalte11").val.length>0) refreshHelperOn=false;
     
  //    if (obj.id=="javascript." + instance + ".Tabellen@Liv."+dpVIS+".Spalte5")   welcheSortierung=5;
  //    if (obj.id=="javascript." + instance + ".Tabellen@Liv."+dpVIS+".Spalte6" )  welcheSortierung=6; 

if(true){
   setTimeout(function () {  noon=false; //log(obj.id+"  "+getState(welcherSpeicherOrt+".Spalte12").val)
                             if(obj.id.includes(dpVIS)) // trigger von script oder dp von adapter ?
                                                        {  // log(obj.id);
                                                            if( (obj.id!=welcherSpeicherOrt+".Spalte11" && obj.id!=welcherSpeicherOrt+".Spalte12"  && obj.id!=welcherSpeicherOrt+".Spalte14" /*&& getState(welcherSpeicherOrt+".Spalte12").val=="iframe_closed"*/ )  )  {writeHTML(true)} 
                                                            else{/*log("blocked")*/ /*: writeHTML(false);*/  //&& getState(welcherSpeicherOrt+".Spalte12").val=="iframe_offen"
                                                           if( obj.id==welcherSpeicherOrt+".Spalte8" && obj.id!=welcherSpeicherOrt+".Spalte14")         {writeHTML(true)}   }
                                                         //   if( (obj.id==welcherSpeicherOrt+".Spalte11"  && getState(welcherSpeicherOrt+".Spalte12").val=="iframe_offen" )  )  {writeHTML(true)} 
                                                           // if( )writeHTML(true)
                                                        } 

                             else{     if ( getState(welcherSpeicherOrt+".Spalte14").val==getState(welcherSpeicherOrt+".Spalte13").val && !obj.id.includes("Spalte14") && !laeuftSchon 
                                                                                                               && (/*obj.id!=welcherSpeicherOrt+".Spalte11" && obj.id!=welcherSpeicherOrt+".Spalte12" &&*/ getState(welcherSpeicherOrt+".Spalte12").val=="iframe_closed" )) {  // log("jetz");  //iframe ist zu und kommt von dp des adapters
                                                laeuftSchon=true;writeHTML(true); 
                                                setTimeout(function () { laeuftSchon=false ; 
                                             //   if (Schaltcounter>1) {Schaltcounter=0;writeHTML(true)}
                                                }, 2550);   }
                             }


      //  if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) { /* log('file written');*/  });}
}, 500);
}


     
   if (false){   
    //  log(String(mehrfachTabelle))
  //  log("vor ort")
   setTimeout(function () {  noon=false; //log(obj.id+"  "+getState(welcherSpeicherOrt+".Spalte12").val)
                             if(obj.id.includes(dpVIS)) // trigger von script oder dp von adapter ?
                                                        {   //log(obj.id);
                                                            if( (obj.id!=welcherSpeicherOrt+".Spalte11" && obj.id!=welcherSpeicherOrt+".Spalte12" /*&& getState(welcherSpeicherOrt+".Spalte12").val=="iframe_closed"*/ )  )  {writeHTML(true)} 
                                                            else{/*log("blocked")*/ /*: writeHTML(false);*/  //&& getState(welcherSpeicherOrt+".Spalte12").val=="iframe_offen"
                                                           if( obj.id==welcherSpeicherOrt+".Spalte8")         {writeHTML(true)}   }
                                                         //   if( (obj.id==welcherSpeicherOrt+".Spalte11"  && getState(welcherSpeicherOrt+".Spalte12").val=="iframe_offen" )  )  {writeHTML(true)} 
                                                           // if( )writeHTML(true)
                                                        } 

                             else{ /*log("1mal ohne dpVIS")*/ ;   if (!laeuftSchon && (/*obj.id!=welcherSpeicherOrt+".Spalte11" && obj.id!=welcherSpeicherOrt+".Spalte12" &&*/ getState(welcherSpeicherOrt+".Spalte12").val=="iframe_closed" )) {  // log("jetz");  //iframe ist zu und kommt von dp des adapters
                                                laeuftSchon=true;writeHTML(true);log("1mal ohne dpVIS"); 
                                                setTimeout(function () { laeuftSchon=false ; 
                                               // if (Schaltcounter>1) {Schaltcounter=0;log("öfter ohne dpVIS");writeHTML(true)}
                                                }, 2550);   }
                             }


      //  if (braucheEinFile) {writeFile(home, path ,htmlOut, function (error) { /* log('file written');*/  });}
}, 500);}
        }  
 
      
    });}, 150);

 /* let Schaltcounter=0
    on({id: arrTriggerSonoff, ack: false,  change: "ne"}, function (obj) { 
   Schaltcounter++
   
    if (!laeuftSchon) {  // log("jetz"); 
                          laeuftSchon=true;writeHTML(true); 
                          setTimeout(function () { laeuftSchon=false ; 
                                                 if (Schaltcounter>1) {Schaltcounter=0;writeHTML(true)}
                                                 }, 5550);   }
   
   
      
    }); */



//SORTIEREN
function sortMe(myType,value){

if(myType=="alpha" ){ myObject.sort(function (alpha, beta) {
             if ((alpha[value].toString().toUpperCase()).trim() > (beta[value].toString().toUpperCase()).trim())
                return 1;
             if ((beta[value].toString().toUpperCase()).trim()> (alpha[value].toUpperCase().toString()).trim())
                return -1;
             return 0;
            });}
 if(myType=="bool" ) {
      
   myObject .sort(function(x, y) { return x[value] - y[value] }); }       
 
 
   if(myType=="num" )   { myObject.sort(function (alpha, beta) {
                      return  beta[value] -alpha[value];   });}

}


function makeMyCSS() {

    trHelperClass=" ";
for (let jj=0;jj<(Feld1lAlign.length);jj++) {  
        trHelperClass= trHelperClass+ " .scrollContent"+dpVIS+" td"+":nth-of-type("+(jj+1)+") {width: "+htmlSpalte1Weite[jj]+"; text-align: "+Feld1lAlign[jj]+" }"
  }
 if(mehrfachTabelle>=2) for (let jj=0;jj<(Feld1lAlign.length);jj++) {  trHelperClass= trHelperClass+ " .scrollContent"+dpVIS+" td"+":nth-of-type("+(jj+1+(Feld1lAlign.length))+") {width: "+htmlSpalte1Weite[jj]+"; text-align: "+Feld1lAlign[jj]+" }" }
  if(mehrfachTabelle==3) for (let jj=0;jj<(Feld1lAlign.length);jj++) {  trHelperClass= trHelperClass+ " .scrollContent"+dpVIS+" td"+":nth-of-type("+(jj+1+(2*Feld1lAlign.length))+") {width: "+htmlSpalte1Weite[jj]+"; text-align: "+Feld1lAlign[jj]+" }" }


 // log(trHelperClass)
switch (bkgroundSearch){
    case 1 :   bkgDiv=`background:
                       radial-gradient(black 15%, transparent 16%) 0 0,
                       radial-gradient(black 15%, transparent 16%) 8px 8px,
                       radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
                       radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
                       background-color:#282828;
                       background-size:16px 16px;`; break;

   case 2 : bkgDiv=`background:
                    url(data:image/gif;base64,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)`
                   ; break

   case 3 : bkgDiv=`background:
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%) 0 0,
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%) 0 0,
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%) 0 110px,
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) -130px -170px,
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) 130px 370px,
                    radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%) 0 0,
                    linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%);
                    background-size: 470px 470px, 970px 970px, 410px 410px, 610px 610px, 530px 530px, 730px 730px, 100% 100%;
                    background-color: #840b2a;`; break;

   case 4 : bkgDiv=`background: radial-gradient(${htmlFarbTableColorGradient1}, ${htmlFarbTableColorGradient2});`; break;   //265686 5590CA 2F2F2F 3c3c3c
   case 5 : bkgDiv=`background: radial-gradient(${farbeUngeradeZeilen}, ${farbeGeradeZeilen});`; break;   //265686 5590CA 2F2F2F 3c3c3c

   case 6 : bkgDiv=`background: radial-gradient(#bfbcbc, #ffffff);`; break;   //265686 5590CA 2F2F2F 3c3c3c


}

 scrollBar=` .thescroller${dpVIS}::-webkit-scrollbar { width: 5px;}
.thescroller${dpVIS}::-webkit-scrollbar-track {background: transparent; width: 5px;}
.thescroller${dpVIS}::-webkit-scrollbar-thumb {border-radius: 40px; border: transparent ; background: ${htmlFarbTableColorGradient1}; }
.thescroller${dpVIS} {scrollbar-width: thin; scrollbar-color: ${htmlFarbTableColorGradient1} transparent;}`

myButtonUeberschrift=" .myButt"+dpVIS+" {border-radius: 4px; border:"+schalterUmrahmung+"px solid; background-color: "+htmlBackgroundButtonUeberschrift+"\; color: "+htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+"; font-size :"+groesseUeberschrift+"px; text-align:left;}"


           htmlZentriert=   "<style>"+                       // <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />
            /*weite*/          " .divWeiten"+dpVIS+" {  width: "+weite+"px }"+  //border-bottom: "+LinieUnterUeberschrift+"px solid+farbeLinieUnterUeberschrift
            /*thead*/          " .fixedHeader"+dpVIS+" {position: sticky; top: -1px ; overflow-y:auto; overflow-x: hidden; width: 100%;  height: "+UeberSchriftHoehe+"px;"  +
                                               " font-family:"+htmlSchriftart+"\;  color:"+htmlFarbTableColorUber+"; "+  //  border-spacing:"+abstandZelle+"px;
                                               " font-size: "+groesseUeberschrift+"px; font-weight: "+UeberschriftStyle+";  background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" "+htmlGradient[1]+"%,"+htmlFarbTableColorGradient1+" "+htmlGradient[2]+"%); }"+ //
            /*tbody */         " .scrollContent"+dpVIS+" { width: 100%;  overflow-y: scroll;   }"+ // height: "+hoeheTabelle2+"px; 
                               
                               " .scrollContent"+dpVIS+" td { padding: "+abstandZelle+"px;}"+
            /*div*/            " .tableContainer"+dpVIS+" { display: flex; flex-direction: column;  height: "+hoeheTabelle+"px; width: "+weite+"px; overflow-y:auto; overflow-x: hidden ; "
                                                          +bkgDiv+" }"+  // position: sticky; top: 0; background-color: black;
            /*seitenl*/        " .seitenleiste"+dpVIS+" { background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" "+htmlGradient[1]+"%,"+htmlFarbTableColorGradient1+" "+htmlGradient[2]+"%); color: " //background-color: "+htmlBackgroundFarbeSeitenliste+";
                                                          +htmlFarbSeiteSchrift+ "; font-family:"+htmlSchriftart+";"  + ";font-size:"+schriftGroesseSeitenleiste+"px; vertical-align:top; text-align:center; width: "+breiteSeitenleiste+"px}"+  //margin-top: 30px;
                               " .flexContainer"+dpJSON+" {display: flex; width: "+weite+"px}"+                        
            /*table*/          " .tablezusatz"+dpVIS+" { border-collapse: collapse; "+  //table-layout: fixed;  border-right:"+rahmenBreite+" solid;
                                              "width:100%; color:"+htmlFarbFelderschrift+";  font-size:"+htmlSchriftgroesse+";"+
                                              "font-family:"+htmlSchriftart+"; background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" "+htmlGradient[1]+"%,"+htmlFarbTableColorGradient1+" "+htmlGradient[2]+"%); }"+
                               " .mythclass0"+dpVIS+" {    }"+  //text-align:"+Feld1lAlign[0]+"
                               " .mythclass1"+dpVIS+" {   }"+
                               " .mythclass2"+dpVIS+" {   }"+
                               " .mythclass3"+dpVIS+" {  }"+
                               " .mythclass4"+dpVIS+" {  }"+
                               " .mythclass5"+dpVIS+" {  }"+
                               " .mythclass6"+dpVIS+" {   }"+ 
                               " .divFlexBoxen"+dpVIS+" {  overflow-y: scroll; display: flex; flex-direction: row; flex-wrap: wrap; width: 100%; height: "+(hoeheTabelle-(Number(UeberSchriftHoehe)))+"px;  align-items: center; justify-content: center; }"+  //height: "+(hoeheTabelle-(Number(UeberSchriftHoehe)))+"px;
                               " .divFlexBoxenEinzeln"+dpVIS+" {font-family:"+htmlSchriftart+";  max-width: "+maxWeiteFlexBoxen+"px; box-shadow: 3px 3px 3px silver; padding: 20px; color: "+htmlFarbFelderschrift+"; border: 2px solid; border-radius: 10px; height: auto; border-color: "+htmlFarbFelderschrift+"; margin: 10px;}"+
                               " .divInFlex"+dpVIS+" {  background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" 10%,"+htmlFarbTableColorGradient1+" 20%); }"+ //  "+htmlGradient[1]+"   "+htmlGradient[2]+" 
                            // " .emptyFlex2_1"+dpVIS+" { color: transparent; background-image: none !important; background-color: "+htmlFarbTableColorGradient1+" !important;}"+
                               " .emptyFlex2_1"+dpVIS+" { color: transparent;  background-color: "+htmlFarbTableColorGradient1+" !important;}"+
                             //  " th {position: sticky; top: 0px ; height: "+UeberSchriftHoehe+"px; background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" "+htmlGradient[1]+"%,"+htmlFarbTableColorGradient1+" "+htmlGradient[2]+"%); }"+  //position: sticky; top: 0px ;
                               " .myclassueber_spalte_button     {color:"+htmlFarbTableColorUber+"}"+
                               " .myclassueber_spalte_ohne_button{color:"+htmlFarbTableColorUber+"}"+
                               " .myTHclass"+dpVIS+" { position: sticky; top: -1px ;  height: "+UeberSchriftHoehe+"px; background-image: linear-gradient("+htmlGradBkgroundSpalteUeber[0]+"deg,"+htmlGrad2BkgroundSpalteUeber+" "+htmlGradBkgroundSpalteUeber[1]+"%,"+htmlGrad1BkgroundSpalteUeber+" "+htmlGradBkgroundSpalteUeber[2]+"%) ;"+
                                                      "    border-right:"+linienCols+"px solid "+innenBorder+" !important; border-left:"+linienCols+"px solid "+innenBorder+" !important;  border-top:"+linienRows+"px solid "+innenBorder+" !important; border-bottom:"+LinieUnterUeberschrift+"px solid "+innenBorder+" !important;}"+
                               " .myTRclass"+dpVIS+" {}"+
                               " .myclasstr_gerade"+dpVIS+" { height:"+zeilenAbstand+"px; background-color:"+farbeGeradeZeilen+"; }"+  //border-spacing:"+abstandZelle+"px; 
                               " .myclasstr_ungerade"+dpVIS+" {  height:"+zeilenAbstand+"px;  background-color:"+farbeUngeradeZeilen+"}"+ //border-spacing:"+abstandZelle+"px;
                               " .myclasstd_normal"+dpVIS+" {   border-right:"+linienCols+"px solid "+innenBorder+";  border-left:"+linienCols+"px solid "+innenBorder+"; border-bottom:"+linienRows+"px solid "+innenBorder+"; border-top:"+linienRows+"px solid "+innenBorder+";}"+
                               " .myclasstd_trennungslinie"+dpVIS+" { border-right:"+trennungsLinie+"px solid "+farbetrennungsLinie+ ";border-left:"+linienCols+"px solid "+innenBorder+"!important;  border-top:"+linienRows+"px solid "+innenBorder+"; border-bottom:"+linienRows+"px solid "+innenBorder+";}"+
                               " .mySpan"+dpVIS+" {color: " +htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+"; font-size :"+groesseUeberschrift+"px; font-weight: normal;}"+
                               " .myinputclass"+dpVIS+" {width: "+weite+"px; border: 1px solid; border-color: "+inputBorderColor+"; margin-bottom: 15px;  color: "+htmlFarbTableColorUber+
                                                        "; height: "+sucheHoehe+"px; background-image: linear-gradient("+htmlGradient[0]+"deg,"+htmlFarbTableColorGradient2+" "+htmlGradient[1]+"%,"+htmlFarbTableColorGradient1+" "+
                                                        htmlGradient[2]+"%); font-family:"+htmlSchriftart+"\; font-size: 110%; color: "+htmlFarbTableColorUber+"}"+
                               " .ipFlexIframe {background: white !important; color: " +htmlFarbTableColorUber+";}"+                         
         /*buttons*/           " button.myButt"+dpVIS+"  { border-radius: 4px; border:"+schalterUmrahmung+"px solid; background-color: "+htmlBackgroundButtonUeberschrift+"; color: " +htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+"; font-size :"+groesseUeberschrift+"px;  }"+  
                           //    "  #bth"+dpVIS+" {border-radius: 4px; border-right:"+schalterUmrahmung+"px solid "+innenBorder+"; border-left:"+schalterUmrahmung+"px solid "+innenBorder+";  border-top:"+schalterUmrahmung+"px solid "+innenBorder+"; border-bottom:"+schalterUmrahmung+"px solid "+innenBorder+"!important; background-color: "+htmlBackgroundButtonUeberschrift+";}"+ 
              
                  /*buttons*/   //        " .myButt"+dpVIS+" {  color: " +htmlFarbTableColorUber+"; font-family: "+htmlSchriftart+"; font-size :"+groesseUeberschrift+"px;  }"+  
                             //   " .myButt"+dpVIS+" button   {border-radius: 4px; border-right:"+schalterUmrahmung+"px solid "+innenBorder+"; border-left:"+schalterUmrahmung+"px solid "+innenBorder+";  border-top:"+schalterUmrahmung+"px solid "+innenBorder+"; border-bottom:"+schalterUmrahmung+"px solid "+innenBorder+"; background-color: "+htmlBackgroundButtonUeberschrift+";}"+
                                //     "  button.myButt"+dpVIS+"   {border:"+schalterUmrahmung+"px solid; background-color: "+htmlBackgroundButtonUeberschrift+";}"+
                            trHelperClass+scrollBar+ //myButtonUeberschrift+
                          //     " .thescroller"+dpVIS+"::-webkit-scrollbar {width: 0px; }"+
                               "</style>"+'<center>'

}// endCSS



function makeMySearch_Seitenleiste() {

 

   einmalAbstand=`<br>
`
  let seitenLeistenTest="<div class=\"refreshSie"+dpVIS+"\">"+symbolSchalter[3]+"</div>";
  for (let f=0;f<abstandSeitentextVonOben;f++){ 
      seitenLeistenTest=seitenLeistenTest+`<br>
`}

  for (let i=0;i<nameSeitenLeiste.length;i++){
      seitenLeistenTest=seitenLeistenTest+nameSeitenLeiste[i]+`<br>
`
 }
 if (tabletDoppelHilfe) seitenLeistenTest=seitenLeistenTest+einmalAbstand+ einmalAbstand+"<div class=\"sonderTablet"+dpVIS+"\"> "+symbolSchalter[4]+"</div>"

  htmlSeitenleiste="";
  if (ichWillSeitenLeiste) htmlSeitenleiste= "<div class=\"flexContainer"+dpJSON+"\"> <div class=\"seitenleiste"+dpVIS+"\">"+seitenLeistenTest+"</div>" ;// htmlTabUeber1=htmlTabUeber1+
searchMe="";
sucheEin ? searchMe="<div class=\"divWeiten"+dpVIS+"\"><input class=\"myinputclass"+dpVIS+"\" type=\"search\" id=\"search"+dpVIS+"\" placeholder=\"Filter by Item\"></div>" :
           searchMe=""     
searchMe=searchMe+htmlSeitenleiste
htmlTabStyle= "<div class=\"tableContainer"+dpVIS+" thescroller"+dpVIS+"\" >"+
                    "<table class=\"tablezusatz"+dpVIS+"\ >"+ // rules=\""+htmlRahmenLinien+"
                    "<thead class=\"fixedHeader"+dpVIS+"\">"
                

htmlTabUeber4="<tr class=\"myTRclass"+dpVIS+"\">";
}



function makeMyVisScripte() {

     let valSpalte=[] ;
    for(let kk=0;kk<val.length;kk++){
      valSpalte.push(val[kk])
    }

    refreshHelperOn ? refreshHelper=`$(".tableContainer${dpVIS}").ready(function() { setTimeout(function () { console.log("---------------------------document ready remove display-none sonoff");   $(".myclasstr_gerade${dpVIS}").removeAttr( 'style' ); $(".myclasstr_ungerade${dpVIS}").removeAttr( 'style' );   }, 3000)  } );` : refreshHelper="";
    let spaltenAnzeigeScript=`$(document).ready(function() { `
    let spaltenAnzeigeScriptEnd=` });` ;
    let helpScript=false;

for (let ff=0;ff<(valSpalte.length);ff++){
                                        // log(valSpalte[ff]); 
                                         if (valSpalte[ff]=="false") { helpScript=true
                                                                       spaltenAnzeigeScript=spaltenAnzeigeScript.concat(`$('td:nth-child(${(ff+1)}).toDel${dpVIS},th:nth-child(${(ff+1)}).toDel${dpVIS}').hide();`) 
                                                                       if (mehrfachTabelle==2) {spaltenAnzeigeScript=spaltenAnzeigeScript.concat(`$('td:nth-child(${(ff+1+valSpalte.length)}).toDel${dpVIS},th:nth-child(${(ff+1+valSpalte.length)}).toDel${dpVIS}').hide();`) }
                                                                       if (mehrfachTabelle==3) {spaltenAnzeigeScript=spaltenAnzeigeScript.concat(`$('td:nth-child(${(ff+1+(2*valSpalte.length))}).toDel${dpVIS},th:nth-child(${(ff+1+(2*valSpalte.length))}).toDel${dpVIS}').hide();`) }                        
                                         }}

                                         if (!helpScript) {spaltenAnzeigeScript=spaltenAnzeigeScriptEnd=""}

 buttonScript =   '<script> '
                      + `function setOnOtherValue(myval) {	var Self = this;	Self.servConn.getStates(myval, (error, states) => {  /*console.log(states);*/ self.servConn.setState(myval, !states[myval].val);}  )}; `
     /*ueberschr.*/   + '$( "button.myButt'+dpVIS+'" ).click(function() {  $( this ).slideUp() ; setTimeout(function() { $( "button.myButt'+dpVIS+'" ).hide()  ; $( ".mySpan'+dpVIS+'" ).text(\"wait ...\")}, 500); });' //'[class*="test"]' [class~="value"]   "[class~='gerade']"
     /*search*/       + `var allRows${dpVIS} = $("[class*='gerade${dpVIS}']");  $("input.myinputclass${dpVIS}").on("keydown keyup", function() {  allRows${dpVIS}.hide();  $("tr:contains('" + $(this).val() + "')").show(); });`
     /*search*/       + `var allRows2${dpVIS} = $("div.divFlexBoxenEinzeln${dpVIS}"); /*console.log(allRows2${dpVIS});*/  $("input.myinputclass${dpVIS}").on("keydown keyup", function() {  allRows2${dpVIS}.hide();  $("div.divFlexBoxenEinzeln${dpVIS}:contains('" + $(this).val() + "')").show(); var $gesucht${dpVIS}=$(this).val(); vis.setValue('${welcherSpeicherOrt}.Spalte11',$(this).val()); /*console.log('val: '+$gesucht${dpVIS})*/ });`
                  //    + `$( ".seitenleiste${dpVIS}:not(.sonderTablet${dpVIS})" ).click(function() { $( "button.myButt${dpVIS}" ).slideUp() ; setTimeout(function() { $( "button.myButt${dpVIS}" ).hide()  ; $( ".mySpan${dpVIS}" ).text(\"refresh\")}, 500); var Self = this; var myvali='${welcherSpeicherOrt}.Spalte8'; vis.setValue(myvali,true) ; vis.setValue('${welcherSpeicherOrt}.Spalte11',''); console.log("spalt8")   });`
     /*refresh Site*/ + `$( ".refreshSie${dpVIS},.close${dpVIS}" ).click(function() { $( "button.myButt${dpVIS}" ).slideUp() ; setTimeout(function() { $( "button.myButt${dpVIS}" ).hide()  ;`
                      + `$( ".mySpan${dpVIS}" ).text(\"refresh\")}, 200); setTimeout(function () { var Self = this; var myvali='${welcherSpeicherOrt}.Spalte8';/*console.log(myvali)*/; self.servConn.getStates(myvali, (error, states) => {  /*console.log(states);*/ self.servConn.setState(myvali, !states[myvali].val);}  ) ;}, 500);`
                      + `vis.setValue('${welcherSpeicherOrt}.Spalte11',''); console.log("Refresh Table") ;vis.setValue('${welcherSpeicherOrt}.Spalte12','iframe_closed');vis.setValue('${welcherSpeicherOrt}.Spalte13',0);vis.setValue('${welcherSpeicherOrt}.Spalte14',0)  });`
                 //   + `$( ".seitenleiste${dpVIS}:not(.seitenleiste${dpVIS}.sonderTablet${dpVIS})" ).click(function() {var Self = this; var myvali='javascript.${instance}.Tabellen@Liv.${dpVIS}.Spalte5'; vis.setValue(myvali,true) ; console.log("spalt5")   });`
     /*dbclick*/      + `$( "[class*='gerade${dpVIS}']" ).dblclick(function() {var Self = this; var myvali='${welcherSpeicherOrt}.Spalte9'; self.servConn.getStates(myvali, (error, states) => {  console.log(states); self.servConn.setState(myvali, !states[myvali].val);}  ); console.log("spalt9") ;vis.setValue('${welcherSpeicherOrt}.Spalte13',0) ;vis.setValue('${welcherSpeicherOrt}.Spalte14',0) });`
     /*dbclick*/      + `$( "[class*='divFlexBoxen${dpVIS}']" ).dblclick(function() {var Self = this; var myvali='${welcherSpeicherOrt}.Spalte9'; self.servConn.getStates(myvali, (error, states) => {  console.log(states); self.servConn.setState(myvali, !states[myvali].val);}  ); console.log("spalt9") ; vis.setValue('${welcherSpeicherOrt}.Spalte13',0);vis.setValue('${welcherSpeicherOrt}.Spalte14',0) });`
     /*tablet*/       + `$( ".sonderTablet${dpVIS}" ).click(function() { var myvali='${welcherSpeicherOrt}.Spalte10'; self.servConn.getStates(myvali, (error, states) => {  console.log(states); self.servConn.setState(myvali, !states[myvali].val);}  ); console.log("spalt10"); vis.setValue('${welcherSpeicherOrt}.Spalte13',0);;vis.setValue('${welcherSpeicherOrt}.Spalte14',0)  });`
                      + `function setOnDblClickCustom( myvalue ) {	var Self = this; var objID = myvalue;	Self.servConn.getStates(objID, (error, states) => {  /*console.log(states);*/  Self.servConn.setState(objID, !states[objID].val); }); };`
    /*iFrame*/        + `$(".ipFlexIframe${dpVIS}").click(function() { /*console.log($(this).val());*/ $(".close${dpVIS}").text("close(x)");$(".close${dpVIS}").attr('style','color: ${farbeNichtConnected}');$(".divFlexBoxen${dpVIS}").animate({ scrollTop: 0 });
                         $("#iframe${dpVIS}").attr('src', $(this).val()).attr('width','460').attr('frameborder','1').attr('height','780').attr('style','background: linear-gradient(${htmlGradient[0]}deg,${htmlFarbTableColorGradient2} 10%,${htmlFarbTableColorGradient1} 20%)');vis.setValue('${welcherSpeicherOrt}.Spalte12','iframe_offen'); console.log("spalt12"); }); `
                 //   + `$( ".divFlexBoxenEinzeln${dpVIS} .retteAnsicht${dpVIS}" ).click(function() { vis.setValue('${welcherSpeicherOrt}.Spalte12','iframe_offen'); console.log("spalt12") });`   
    /*focus tab*/     + `var row_index${dpVIS}=0;  $( ".retteAnsicht${dpVIS}" ).click(function() {  row_index${dpVIS} = $(".tableContainer${dpVIS}").scrollTop(); vis.setValue('${welcherSpeicherOrt}.Spalte13',row_index${dpVIS}); /*console.log('scrollscrollscrollscroll table: '+ $(".tableContainer${dpVIS}").scrollTop()); */ });`  //.position().top
    /*focus flex*/    + `                          $( ".retteAnsicht${dpVIS}" ).click(function() {  row_index${dpVIS} = $(".divFlexBoxen${dpVIS}").scrollTop(); if (row_index${dpVIS} != null){  vis.setValue('${welcherSpeicherOrt}.Spalte13',row_index${dpVIS}) } ; /*console.log('scrollscrollscrollscroll flexbox: '+ $(".divFlexBoxen${dpVIS}").scrollTop());*/  });`  //.position().top
    /*scroll all*/    + `$('.tableContainer${dpVIS}').scroll(function(){var scrollPos1${dpVIS} = $('.tableContainer${dpVIS}').scrollTop()/*;console.log(scrollPos1${dpVIS})*/;vis.setValue('${welcherSpeicherOrt}.Spalte14',scrollPos1${dpVIS})});`
                      + `$('.divFlexBoxen${dpVIS}'  ).scroll(function(){var scrollPos1${dpVIS} = $('.divFlexBoxen${dpVIS}'  ).scrollTop()/*;console.log(scrollPos1${dpVIS})*/;vis.setValue('${welcherSpeicherOrt}.Spalte14',scrollPos1${dpVIS})});`    
    /*holt Input DP*/ + `var gesucht${dpVIS}; var myState='${welcherSpeicherOrt}.Spalte11'; /*console.log(myState) ;*/ var Self=this; Self.servConn.getStates( myState, (error, states) => {  /*console.log('states: ' + states['${welcherSpeicherOrt}.Spalte11'].val );*/ gesucht${dpVIS} = states['${welcherSpeicherOrt}.Spalte11'].val; /*console.log("gesucht: "+ gesucht${dpVIS});*/  });`
    /*erst. jQfunc*/  + `var jqueryFunction${dpVIS} ;   $.jqueryFunction${dpVIS} = function( _msg${dpVIS} ) {  console.log( allRows${dpVIS}[0] ); allRows${dpVIS}.hide();  $("tr:contains('" + _msg${dpVIS} + "')").show();  allRows2${dpVIS}.hide();  $("div.divFlexBoxenEinzeln${dpVIS}:contains('" + _msg${dpVIS} + "')").show();  } ; `                     
    /*Input again*/   + `setTimeout(function(){   /*console.log('gesucht2: '+gesucht${dpVIS});*/ if (gesucht${dpVIS}!="") $.jqueryFunction${dpVIS}(gesucht${dpVIS}) ;$("#search${dpVIS}").val(gesucht${dpVIS});   }, 300);  `
                      + `var Self=this; Self.servConn.getStates( '${welcherSpeicherOrt}.Spalte13', (error, states) => { /* console.log('states: ' + states['${welcherSpeicherOrt}.Spalte13'].val );*/ row_index${dpVIS} = states['${welcherSpeicherOrt}.Spalte13'].val; /*console.log("row_index nach dp: "+ row_index${dpVIS});*/ $(".tableContainer${dpVIS}").animate({ scrollTop: row_index${dpVIS} }, 0);  $(".divFlexBoxen${dpVIS}").animate({ scrollTop: row_index${dpVIS} },0);  });` /*$(".divFlexBoxen${dpVIS}").scrollTop(row_index);*/ 
                  //    + `$(document).ready(function() { setTimeout(function () { var Self = this; var myvali='${welcherSpeicherOrt}.Spalte8';/*console.log(myvali)*/; self.servConn.getStates(myvali, (error, states) => {  /*console.log(states);*/ self.servConn.setState(myvali, !states[myvali].val);}  ) }, 1200) });`
                  //    + `$(document).ready(function() { setTimeout(function () { console.log("document ready remove display-none sonoff");   $(".myclasstr_gerade${dpVIS}").removeAttr( 'style' ); $(".myclasstr_ungerade${dpVIS}").removeAttr( 'style' );   }, 1000)  } );`
                 //     + `$(".tableContainer${dpVIS}").ready(function() { setTimeout(function () { console.log("document ready remove display-none sonoff");   $(".myclasstr_gerade${dpVIS}").removeAttr( 'style' ); $(".myclasstr_ungerade${dpVIS}").removeAttr( 'style' );   }, 1000)  } );`
                      + refreshHelper +   spaltenAnzeigeScript  +  spaltenAnzeigeScriptEnd                                                                   
                      +'</script>'

//.close${dpVIS} Spalte15
}





  function makeJsonWidget(vax1,vax2,vax3,vax4,vax5,vax6) {
//log(vax3+vax6+htmlFeld1)
 vax4=pfadFuerBilder+vax4+".png" ;
    if ( braucheMaterialDesignWidgetList) {
    myJsonWidget.push({
        Device : vax4,
        IP : vax1,
        Status : vax2,
        Kategorie : vax3+" "+vax6
    }

    );}

//	log(myJsonWidget)
 if (braucheMaterialDesignWidget) {
     let colorIP= materialD_IP_erreichbar   //"lightgreen";
   //  log(vax3)
     if (vax3==symbolSchalter[2]) colorIP=materialD_IP_nichtErreichbar     //"lightcoral";
   //  vax4=pfadFuerBilder+vax4+".png" ; 
let mysubText = `<div style="display: flex; flex-direction: row; line-height: 1.3; padding-left: 1px; padding-right: 8px; align-items: center;">
                               <div style="flex: 1;font-size: 16px; color: ${colorIP};">${vax2}</div>
                               <div style="color: grey; font-size: 12px; font-family: RobotoCondensed-LightItalic; text-align: right;">${vax3}${vax6}</div>
                           </div>`
      let ip=vax2                     
   
      myJsonWidget2.push({
                text: vax1,
                subText: mysubText,
                statusBarColor: vax5,
                image: vax4,
                imageColor: "",
                listType: "text",
                showValueLabel: true,
                ip: ip, //vax2,
                status: vax3,
                link:vax6
                
            });
 }
  }

  

 async function needDP2(myData){
     if (!(await existsStateAsync("Tabellen@Liv."+dpVIS+".Device_Collection"))) {
        await createStateAsync("Tabellen@Liv."+dpVIS+".Device_Collection", myData,{type: "array", name: "Device_Collection", desc: 'Device_Collection', role: "value", read: true, write: true, } ); }
     }

 async function getData(myData){
      return getState(myData).val; 
 }
 
function Sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

 /* let Schaltcounter=0
    on({id: arrTriggerSonoff, ack: false,  change: "ne"}, function (obj) { 
   Schaltcounter++
   
    if (!laeuftSchon) {  // log("jetz"); 
                          laeuftSchon=true;writeHTML(true); 
                          setTimeout(function () { laeuftSchon=false ; 
                                                 if (Schaltcounter>1) {Schaltcounter=0;writeHTML(true)}
                                                 }, 5550);   }
   
   
      
    }); */


       function makeTheFirstObject(id){
       
         myObject.push({                "value0" : val[0],            //  "INSTANCE"
                                        "value1" : val[1],            //  "SINCE"
                                        "value2" : val[2],            //  "STATUS"
                                        "value3" : val[3],            //  "INSTANCE"
                                        "value4" : val[4],            //  "SINCE"
                                        "value5" : val[5],
                                        "value6":  val[6],
                                        "thisID": id,
                                        "dieSchalter"    : dieSchalter,
                                        "Epower"         : Epower,
                                        "Etoday"         : Etoday,
                                        "Etotal"         : Etotal,
                                        "Eyestday"       : Eyestday,
                                        "thisSensors"    : thisSensors,
                                        "isOnline"       : isOnline
                                           //   ID
                                                        })  
                
         /*  makeJsonWidget.push({        [htmlFeld[0]] : val[0],  //  "INSTANCE"
                                        [htmlFeld[1]] : val[1],  //  "SINCE"
                                        [htmlFeld[2]] : val[2],   //  "STATUS"
                                        "vallly"      : getState(id).val
                                                        })*/
                                                      
       }

function withoutTasmota10(id,ida)  {  // unter Tasmota 10 alt und neu anzeige
        if( existsState(id.replace("INFO.Module","INFO.Hostname")) ) {   val[0]=getState(id.replace("INFO.Module","INFO.Hostname")).val ;}  else {val[0]=""}
        if(deviceNameStattHostname || val[0]=="") val[0]=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
        if (showInstanzInName) val[0]=val[0]+' ('+ida[1]+')';
        if( existsState(id.replace("INFO.Module","alive")) ) {  val[1]=(getState(id.replace("INFO.Module","alive")).val).toString(); isOnline=getState(id.replace("INFO.Module","alive")).val  }  else { val[1]="false"; isOnline=false }  // ;log("dp "+getState(id.replace("INFO.Module","alive")).val+" val0 "+val[1])            
        if( existsState(id.replace("Module","Version")) ) {   val[2]=getState(id).val  } //.replace(/\(.+\)/g,"")
        if( existsState(id.replace("Module","Version")) ) {   val[6]=getState(id.replace("Module","Version")).val  }  // val6 wird unten bestimmt
        if( !flexboxView) { if( existsState(id.replace("Module","IPAddress")) ) {  getState(id.replace("INFO.Module","alive")).val ? val[4]= ` <a href="http://${getState(id.replace("Module","IPAddress")).val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(id.replace("Module","IPAddress")).val}</button> </a>`:
                                                                                                                                    val[4]= ` <a href="http://${getState(id.replace("Module","IPAddress")).val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(id.replace("Module","IPAddress")).val}</button> </a>` } }else
                          { if( existsState(id.replace("Module","IPAddress")) ) {  getState(id.replace("INFO.Module","alive")).val ? val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(id.replace("Module","IPAddress")).val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(id.replace("Module","IPAddress")).val}</button>`:
                                                                                                                                     val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(id.replace("Module","IPAddress")).val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(id.replace("Module","IPAddress")).val}</button>` }

                          } } 

function newOverTasmota10(id,ida) {  // struktur ab tasmota 10 NEUE ansicht
             if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.Hostname") ) {   val[0]=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.Hostname").val ;}  else {val[0]=""}
        if(deviceNameStattHostname || val[0]=="") val[0]=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
      //  log(val[0])
        if (showInstanzInName) val[0]=val[0]+' ('+ida[1]+')';
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive") ) {  val[1]=(getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val).toString(); isOnline=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val  }  else { val[1]="false"; isOnline=false }  // ;log("dp "+getState(id.replace("INFO.Module","alive")).val+" val0 "+val[1])            
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1.Version") ) {   val[2]=getState(id).val  } //.replace(/\(.+\)/g,"")
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1.Version") ) {   val[6]=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1.Version").val  }  // val6 wird unten bestimmt
        if( !flexboxView) { if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress") ) {  getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ? val[4]= ` <a href="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}</button> </a>`:
                                                                                                                                    val[4]= ` <a href="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}</button> </a>` } }else
                          { if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress") ) {  getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ? val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}</button>`:
                                                                                                                                     val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2.IPAddress").val}</button>` }

                          } 
              }

function oldOverTasmota10(id,ida) {  // struktur unter tasmota 10 ALTE ansicht
             if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_Hostname") ) {   val[0]=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_Hostname").val ;}  else {val[0]=""}
        if(deviceNameStattHostname || val[0]=="") val[0]=getObject(ida[0]+"."+ida[1]+"."+ida[2]).common.name ;
     //    log(val[0])
        if (showInstanzInName) val[0]=val[0]+' ('+ida[1]+')';
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive") ) {  val[1]=(getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val).toString(); isOnline=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val  }  else { val[1]="false"; isOnline=false }  // ;log("dp "+getState(id.replace("INFO.Module","alive")).val+" val0 "+val[1])            
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1_Version") ) {   val[2]=getState(id).val  } //.replace(/\(.+\)/g,"")
        if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1_Version") ) {   val[6]=getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info1_Version").val  }  // val6 wird unten bestimmt
        if( !flexboxView) { if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress") ) {  getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ? val[4]= ` <a href="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}</button> </a>`:
                                                                                                                                    val[4]= ` <a href="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}" target="_blank"><button style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}</button> </a>` } }else
                          { if( existsState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress") ) {  getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"alive").val ? val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorONBkground}\; color: ${powerButtonColorONSchrift}; font-size :75%; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}</button>`:
                                                                                                                                     val[4]= ` <button class="ipFlexIframe${dpVIS}" value="http://${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}" style="border:0px solid\; text-align:center;  border-radius: 5px; background: ${ipButtonColorOFFBkground}\; color: ${powerButtonColorOFFSchrift}; font-size :75%;font-style: italic; ">${getState(ida[0]+'.'+ ida[1]+'.'+ida[2]+'.'+"INFO.Info2_IPAddress").val}</button>` }

                          } 

}
