
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

int vesiPumppu = 33; // Vesipumpun ohjauspinni

int vesiTasoAnturiVirta = 5; // Antureiden virrat
int kosteusAnturiVirta = 18; 

int vesiPumppuArvo = 4; // Thingpeakin Read-metodilla päivitettävä arvo 0/1
int anturienArvo = 5; // Thingspeak Read-metodilla päivitettävä arvo 0/1 
int automaattiOhjaus = 6; // Thingspeak Read-metodilla päivitettävä arvo 0/1 
int moistureRead = 0; 

int moistureField = 2;
int vesiPumppuField = 4; // Thingspeak-field numero
int anturienField = 5; // Thingspeak field arvo
int automaattiOhjausField = 6; // Thingspeak field arvo

void setup() {

  pinMode(vesiPumppu,OUTPUT);             // PinOutput anturien pinneille
  pinMode(vesiTasoAnturiVirta,OUTPUT);    // ja releelle
  pinMode(kosteusAnturiVirta,OUTPUT);

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

 static int kosteusAnturiArvo() {

        digitalWrite(kosteusAnturiVirta, HIGH);             // Virrat päälle, odotus, luetaan, tallennetaan muuttujaan tieto, virrat pois
        delay(5000);
        
        int moistureLevel1 = analogRead(35);
        delay(1000);
        int moistureLevel2 = analogRead(35);
        delay(1000);
        int moistureLevel3 = analogRead(35);
        delay(1000);
        int moistureLevel4 = analogRead(35);
        delay(1000);
        int moistureLevel5 = analogRead(35);
        delay(1000);

        int moistureLevel = (moistureLevel1 + moistureLevel2 + moistureLevel3 + moistureLevel4 + moistureLevel5)/5;
        
        Serial.println("Mullan kosteus lukemat:"); 
        Serial.println(moistureLevel);
        Serial.println(""); 
        digitalWrite(kosteusAnturiVirta,LOW);
      
        /* Kosteusanturin arvoja:
          5: 2300->      // Lilluu vedessä....         // EI pida paikkaansa uudella anturilla!
          4: 2200-2300   // Liian märkä
          3: 2100-2200   // Optimaali
          2: 1900-2100   // Hyvä
          1: 0-1900      // Liian kuiva, kastellaan 
         */
      
       return moistureLevel;
    };

  static  int vesiTasoAnturiArvo() {
  
        digitalWrite(vesiTasoAnturiVirta, HIGH);                // Virrat päälle, odotus, luetaan, tallennetaan muuttujaan tieto, virrat pois
        delay(5000);
        
        int waterLevel1 = analogRead(32);
        delay(1000);
        int waterLevel2 = analogRead(32);
        delay(1000);
        int waterLevel3 = analogRead(32);
        delay(1000);
        int waterLevel4 = analogRead(32);
        delay(1000);
        int waterLevel5 = analogRead(32);
        delay(1000);

        int waterlevel = (waterLevel1 + waterLevel2 + waterLevel3 + waterLevel4 + waterLevel5)/5;
        
        Serial.println("Vedentaso");
        Serial.println(waterlevel);
        Serial.println(" ");
        digitalWrite(vesiTasoAnturiVirta, LOW);
      
        /*    Vesitaso arvoja:
         *    5: 1600-1800      // Ihan yläraja, älä täytä enää!
         *    4: 1400-1600      // Vettä sopivasti
         *    3: 1000-1400      // Vettä sopivasti
         *    2: 400-1000       // Vettä vähän
         *    1: 0-400          // Juuri alarajassa, pumppua ei saa käyttää 
         */

         return waterlevel;
 };

   
void loop() {
  
  Portal.handleClient();

  if (WiFi.status() != WL_CONNECTED) {                      // Wifi ei ole kytketty
      
  int vesiTasoAnturi = vesiTasoAnturiArvo();                // Kutsutaan vesianturin mittaus metodia ja tallentaan muuttujaan
  int kosteusAnturi = kosteusAnturiArvo();                  // Kutsutaan kosteusanturin mittaus metodia ja tallentaan muuttujaan
  
     if (400 < vesiTasoAnturi){                             // Mikäli veden taso on liian alhainen, pumppua ei voida laittaa paalle
        
         if (kosteusAnturi < 1500) {                        // Jos mullan kosteus on alle 1500
            digitalWrite(vesiPumppu,HIGH);                  // Vesipumppu päälle
       
            
            delay(3000);                                    // Odotetaan 1sec
            Serial.println("Vesipumppu kävi 3 sec");        // Tulostetaan consoleen
                     
            digitalWrite(vesiPumppu,LOW);                   // Vesipumppu pois päältä
            delay(7200000);                                 // Odotellaan 2 tuntia 
            Serial.println("Odotellaan 2h");                              
         } else {
                                                            // Jos mullan kosteus yli 1500
          Serial.println("Mullan kosteus ok, ei kastelua"); // Tulostetaan consoleen
          Serial.println(" ");   
          digitalWrite(vesiPumppu,LOW);                     // Varmistus, että pumppu on pois päältä
    }
   
  } else {
    Serial.println("Täytä vesiastia");                    // Jos vedentaso liian alhainen, tulostus consoleen
    Serial.println(" ");
  } 
  
  }

  
   if (WiFi.status() == WL_CONNECTED) {                                                  // Wifi kytkettyna
 
      vesiPumppuArvo = ThingSpeak.readFloatField(channel_id, vesiPumppuField);           // Luetaan vesipumpunohjausarvo Thingspeakista
        
      if(vesiPumppuArvo == 1){                                                           // Jos arvo 1 == pumppu paalla 3sec
        digitalWrite(vesiPumppu, HIGH);                                                  // Jos arvo 0 == pumppu ei paalla
        delay(3000);
        digitalWrite(vesiPumppu, LOW);
        Serial.println("Vesipumppu oli päällä 3 sekuntia.");
        
      }
        else if(vesiPumppuArvo == 0){
        digitalWrite(vesiPumppu, LOW);
        Serial.println("ThingSpeak arvo 0. Vesipumppu on pois päältä. ");
  }
     

       anturienArvo = ThingSpeak.readFloatField(channel_id, anturienField);             // Luetaan anturien lahetys ohjausarvo thingspeak
    
       if (anturienArvo == 1) {                                                         // Mikali arvo 1 == luetaan anturit ja tallennetaan
                                                                                        // metodin sisaisiin muuttujiin. Sitten ne lahetetaan Thingspeak
           int vesiTasoAnturi = vesiTasoAnturiArvo();
           int kosteusAnturi = kosteusAnturiArvo();
           
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
           
           int waterLevel = vesiTasoAnturiArvo();                           // Luetaan vesitasoanturin arvo
           int kosteusAnturi = kosteusAnturiArvo();                             // Luetaan kosteusanturin arvo

           
           
           if (400 < waterLevel){                                           // Jos vesitasoanturin arvo on pienempi kuin 400
              
               if (kosteusAnturi < moistureRead) {                                      // Jos mullan kosteus on alle 1500 
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
 
