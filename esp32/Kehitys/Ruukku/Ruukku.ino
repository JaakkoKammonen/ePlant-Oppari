
/*
  Copyright (c) 2018 Hieromon Ikasamo.
  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

#include <AutoConnect.h>
#include <WebServer.h>
#include <ThingSpeak.h>

/*#define AUTOCONNECT_URI             "/ac"
#define AUTOCONNECT_URI_UPDATE      AUTOCONNECT_URI "/update"
#define AUTOCONNECT_URI_UPDATE_ACT  AUTOCONNECT_URI "/update_act"*/

long unsigned  int channel_id = 1079275;        
const String write_api_key ="CSI9579IPM1KPS7H";  
const char* server = "api.thingspeak.com";


#define INTERVAL 43200000     //12h   Vesipumpun millis() intervalli
static uint64_t send_interval_ms; // maaritelty millis formaatti

WebServer Server;
AutoConnect Portal(Server);
AutoConnectConfig config;
WiFiClient wifiClient;

/* 
 *  Field4= 0/1 vesipumppu pois/päällä 3sec
 *  Field5= 0/1 anturien arvojen lähetys thingSpeak pois/päällä
 *  Field6= 0/1 automaattiohjaus pois/päällä
 *  
 *  MenuItems: https://hieromon.github.io/AutoConnect/apiconfig.html#menuitems
*/

int ilmaPumppu = 33;                 // Ilmapumpun ohjauspinni eli Releen ohjaus

int PHTasoAnturiVirta = 5;          // Antureiden virrat
int PHAnturi= 32;

int ECAnturiVirta = 18;
int ECAnturi= 35;
 
int ilmaPumppuThingspeakOhjaus = 4; // Thingpeakin Read-metodilla päivitettävä arvo 0/1
int anturienArvo = 5;               // Thingspeak Read-metodilla päivitettävä arvo 0/1 
int automaattiOhjaus = 6;           // Thingspeak Read-metodilla päivitettävä arvo 0/1 
int moistureRead = 0; 

int moistureField = 2;
int ThingSpeakFieldIlmaPumppu = 4; // Thingspeak-field numero
int anturienField = 5;             // Thingspeak field arvo
int automaattiOhjausField = 6;     // Thingspeak field arvo

void setup() {

  pinMode(ilmaPumppu,OUTPUT);             // PinOutput anturien pinneille
  pinMode(PHTasoAnturiVirta,OUTPUT);    // ja releelle
  pinMode(ECAnturiVirta,OUTPUT);

  delay(1000);
  config.apid = "ePlantVol2";             // Hotspot-nimi
  config.psk  = "ePlantVersion";          // Salasana
  config.portalTimeout = 60000;           // 60 sec Hotspot 
  config.title ="ePlant";                 // Avattavan Hotspot-nettisivu title
  config.retainPortal = true;             // Hotspots koko ajan paalla
  config.ota = AC_OTA_BUILTIN;            // Over the air -paivitys
  config.menuItems =                      // Nettisivun komponetit
     AC_MENUITEM_CONFIGNEW
     ;
  Portal.config(config);                  // Wifi avaa web portaalin
  Serial.begin(115200);                   // Serial monitor
  Serial.println();

  if (Portal.begin()) {
    Serial.println("Wifi connected: " + WiFi.SSID());
    Serial.println("WiFi connected: " + WiFi.localIP().toString());
    
  }
WiFi.setAutoReconnect(true);             // Automaatti wifi yhdistys, jos yhteys katkeaa
ThingSpeak.begin(wifiClient);            // Alustus Thingspeakille lahetykseen

send_interval_ms = millis();            // ajan aloitus

}

 static int ECAnturiArvo() {

        digitalWrite(ECAnturiVirta, HIGH);             // Virrat päälle, odotus, luetaan, tallennetaan muuttujaan tieto, virrat pois
        delay(5000);
        
        int ECTaso1 = analogRead(ECAnturi);
        delay(1000);
        int ECTaso2 = analogRead(ECAnturi);
        delay(1000);
        int ECTaso3 = analogRead(ECAnturi);
        delay(1000);
        int ECTaso4 = analogRead(ECAnturi);
        delay(1000);
        int ECTaso5 = analogRead(ECAnturi);
        delay(1000);

        int ECTaso = (ECTaso1 + ECTaso2 + ECTaso3 + ECTaso4 + ECTaso5)/5;
        
        Serial.println("EC lukemat:"); 
        Serial.println(ECTaso);
        Serial.println(""); 
        digitalWrite(ECAnturiVirta,LOW);
      
       return ECTaso;
    };

  static  int PHTasoAnturiArvo() {
  
        digitalWrite(PHTasoAnturiVirta, HIGH);                // Virrat päälle, odotus, luetaan, tallennetaan muuttujaan tieto, virrat pois
        delay(5000);
        
        int PHTaso1 = analogRead(PHAnturi);
        delay(1000);
        int PHTaso2 = analogRead(PHAnturi);
        delay(1000);
        int PHTaso3 = analogRead(PHAnturi);
        delay(1000);
        int PHTaso4 = analogRead(PHAnturi);
        delay(1000);
        int PHTaso5 = analogRead(PHAnturi);
        delay(1000);

        int PHTaso = (PHTaso1 + PHTaso2 + PHTaso3 + PHTaso4 + PHTaso5)/5;
        
        Serial.println("PHTaso");
        Serial.println(PHTaso);
        Serial.println(" ");
        digitalWrite(PHTasoAnturiVirta, LOW);

         return PHTaso;
 };

   
void loop() {
  
  Portal.handleClient();

  if (WiFi.status() != WL_CONNECTED) {            // Wifi ei ole kytketty
      
  // Pidetään ilmapummpua päällä
  Serial.println("Ei nettiä, ilmapumppu päällä kokoajan.")
  digitalWrite(ilmaPumppu,HIGH);                  // Ilmapumppu päälle eli Releen pinni aktivoidaan

  }

  
   if (WiFi.status() == WL_CONNECTED) {                                                  // Wifi kytkettyna
 
      ilmaPumppuThingspeakOhjaus = ThingSpeak.readFloatField(channel_id, ThingSpeakFieldIlmaPumppu);      // Luetaan ilmapumpunohjausarvo Thingspeakista
        
      if(ilmaPumppuThingspeakOhjaus == 1){                                                           // Jos arvo 1 == pumppu paalla 3sec
        digitalWrite(ilmaPumppu, HIGH);                                                  // Jos arvo 0 == pumppu ei paalla
        Serial.println("ThingSpeak arvo 1. Ilmapumppu on päällä. ");
      }
      else if(ilmaPumppuThingspeakOhjaus == 0){
        digitalWrite(vesiPumppu, LOW);
        Serial.println("ThingSpeak arvo 0. Ilmapumppu on pois päältä. ");
      }
     

      anturienArvo = ThingSpeak.readFloatField(channel_id, anturienField);             // Luetaan anturien lahetys ohjausarvo thingspeak
    
       if (anturienArvo == 1) {                                                         // Mikali arvo 1 == luetaan anturit ja tallennetaan
                                                                                        // metodin sisaisiin muuttujiin. Sitten ne lahetetaan Thingspeak
           int vesiTasoAnturi = PHTasoAnturiArvo();
           int kosteusAnturi = ECAnturiArvo();
           
        if (wifiClient.connect(server, 80))                                             // api.thingspeak.com
            {                                                                           // Thingspeak tunneli avataan
              String data_to_send = write_api_key;                                      // Apikey
              data_to_send += "&field1=";
              data_to_send += kosteusAnturi;
              data_to_send += "&field3=";
              data_to_send += vesiTasoAnturi;
              data_to_send += "";
          
              wifiClient.print("POST /update HTTP/1.1\n");
              wifiClient.print("Host: api.thingspeak.com\n");
              wifiClient.print("Connection: close\n");
              wifiClient.print("X-THINGSPEAKAPIKEY: " + write_api_key + "\n");
              wifiClient.print("Content-Type: application/x-www-form-urlencoded\n");
              wifiClient.print("Content-Length: ");
              wifiClient.print(data_to_send.length());
              wifiClient.print("\n\n");
              wifiClient.print(data_to_send);
              delay(1000);
              Serial.println("ThingSpeak arvo 1. Anturit ovat luettu ja lähetetty!");
  }
  wifiClient.stop();                                                                     // Thingspeak tunneli suljetaan
  
       }

       else {                                                         // Kun anturien arvo on 0
        Serial.println("ThingSpeak arvo 0. Anturien arvoja ei lähetetty");              // Tulostetaan consoleen
       }


    automaattiOhjaus = ThingSpeak.readFloatField(channel_id, automaattiOhjausField); // Luetaan anturien lähetysarvot ThingSpeakissa
    
    
           
    if (automaattiOhjaus == 1 ) {                                               // Kun automaattiohjaus on 1

        Serial.println("Intervall is set to 12h. Untill next check... ");
        Serial.println((INTERVAL - (int)(millis() - send_interval_ms))/(60*1000*60));
        Serial.println("hours");
        Serial.println((INTERVAL - (int)(millis() - send_interval_ms))/1000);
        Serial.println("seconds...");     
        Serial.println(" ");  
           
          if ((int)(millis() - send_interval_ms) >= INTERVAL) {                 // Kun millis on suurempi/yhtä suuri kuin asetettu interval

           
            
           moistureRead = ThingSpeak.readFloatField(channel_id, moistureField);
           Serial.println("laitettu kosteusarvo"); 
           Serial.println(moistureRead);
           Serial.println(" "); 
           
           int PHAnturiArvo = PHTasoAnturiArvo();                           // Luetaan vesitasoanturin arvo
           int ECAnturiArvo = ECAnturiArvo();                             // Luetaan kosteusanturin arvo

           
           
           if (400 < waterLevel){                                           // Jos vesitasoanturin arvo on pienempi kuin 400
              
               if (kosteusAnturi < moistureRead) {                               // Jos mullan kosteus on alle 1500 
                  digitalWrite(vesiPumppu,HIGH);                                // Vesipumppu päälle
             
                  
                  delay(3000);                                                  // Odotetaan 1 sekunti
                  Serial.println("Vesipumppu kävi 2 sec");                      // Tulostetaan consoleen
                           
                  digitalWrite(vesiPumppu,LOW);                                 // Vesipumppu pois päältä
                  
                  Serial.println("Odotellaan 2h");                              
               } else {
                                                                                // Jos mullan kosteus yli 1500
                Serial.println("Mullan kosteus ok, ei kastelua");               // Tulostetaan consoleen
                Serial.println(" ");   
                digitalWrite(vesiPumppu,LOW);                                   // Varmistus, että pumppu on pois päältä
          }
         
        } else {                                                                // Muutoin tulostetaan consoleen
          Serial.println("Täytä vesiastia");                    
          Serial.println(" ");
        } 
        
        send_interval_ms = millis();                                            // Lähetetään interval
        }

    }
       
       if (automaattiOhjaus == 0 ) {                                            // Kun automaattiohjaus saa arvon 0
        Serial.println("ThingSpeak arvo 0. Ohjaus toimii manuaalisesti.");      // Tulostetaan consoleen
        
        Serial.println("");
       }
       
  } 
  Serial.println("Loop over");
  delay(10000);                                                                 // Odotetaan 10 sekuntia
 }
 
