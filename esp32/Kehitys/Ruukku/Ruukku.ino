
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

#define INTERVAL 43200000                                                       // 12h Vesipumpun millis() interval
static uint64_t send_interval_ms;                                               // Määritelty millis-formaatti

WebServer Server;
AutoConnect Portal(Server);
AutoConnectConfig config;
WiFiClient wifiClient;

int ilmaPumppu = 33;                                                            // Ilmapumpun ohjauspinni (Releen ohjaus)

int PHTasoAnturiVirta = 5;                                                      // Antureiden virrat
int PHAnturi= 32;

int ECAnturiVirta = 18;
int ECAnturi= 35;
 
int ilmaPumppuThingspeakOhjaus = 4;                                             // ThingSpeakin Read-metodilla päivitettävä arvo 0/1
int anturienArvo = 5;                                                           // ThingSpeakin Read-metodilla päivitettävä arvo 0/1 
int moistureRead = 0; 

int moistureField = 2;
int ThingSpeakFieldIlmaPumppu = 3;                                              // ThingSpeak-field numero
int ThingSpeakFieldAnturiDataSend = 5;                                          // ThingSpeak-field arvo
int automaattiOhjausField = 6;                                                  // ThingSpeak-field arvo

void setup() {

  pinMode(ilmaPumppu,OUTPUT);                                                   // Pin-output anturien pinneille
  pinMode(PHTasoAnturiVirta,OUTPUT);                                            // Relay anturien pinneille
  pinMode(ECAnturiVirta,OUTPUT);

  delay(1000);
  config.apid = "ePlantVol2";                                                   // Hotspot-nimi
  config.psk  = "ePlantVersion";                                                // Salasana
  config.portalTimeout = 60000;                                                 // 60 sec Hotspot 
  config.title ="ePlant";                                                       // Avattavan Hotspot-nettisivu title
  config.retainPortal = true;                                                   // Hotspots koko ajan paalla
  config.ota = AC_OTA_BUILTIN;                                                  // Over-The-Air -päivitys
  config.menuItems =                                                            // Nettisivun komponetit
     AC_MENUITEM_CONFIGNEW
     ;
  Portal.config(config);                                                        // Wifi avaa web-portaalin
  Serial.begin(115200);                                                         // Serial monitor
  Serial.println();

  if (Portal.begin()) {
    Serial.println("Wifi connected: " + WiFi.SSID());
    Serial.println("WiFi connected: " + WiFi.localIP().toString());
    
  }
WiFi.setAutoReconnect(true);                                                    // Automaattinen Wifin yhdistys, jos yhteys katkeaa
ThingSpeak.begin(wifiClient);                                                   // Alustus Thingspeakille datan lähetykseen

send_interval_ms = millis();                                                    // Ajan aloitus

}

 static int ECAnturiArvo() {

        digitalWrite(ECAnturiVirta, HIGH);                                      // Virrat päälle -> odotus -> luetaan -> tallennetaan muuttujaan tieto -> virrat pois
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

        int ECArvo = (ECTaso1 + ECTaso2 + ECTaso3 + ECTaso4 + ECTaso5)/5;
        
        Serial.println("EC lukemat:"); 
        Serial.println(ECArvo);
        Serial.println(""); 
        digitalWrite(ECAnturiVirta,LOW);
      
       return ECArvo;
    };

  static  int PHTasoAnturiArvo() {
  
        digitalWrite(PHTasoAnturiVirta, HIGH);                                   // Virrat päälle -> odotus -> luetaan -> tallennetaan muuttujaan tieto -> virrat pois
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

  if (WiFi.status() != WL_CONNECTED) {                                           // Wifi ei ole kytketty
      
  // Pidetään ilmapumppua päällä
  Serial.println("Ei nettiä, ilmapumppu päällä koko ajan.");
  // HIGH = pois päältä, LOW = päällä
  digitalWrite(ilmaPumppu, LOW);                                                 // Ilmapumppu päälle -> Releen pinni aktivoidaan
  }
  
   if (WiFi.status() == WL_CONNECTED) {                                          // Wifi kytkettynä
 
      ilmaPumppuThingspeakOhjaus = ThingSpeak.readFloatField(channel_id, ThingSpeakFieldIlmaPumppu);   // Luetaan ilmapumpunohjausarvo Thingspeakista
        
      if(ilmaPumppuThingspeakOhjaus == 1){                                       // Jos arvo 1 == pumppu päällä 3 sec
        digitalWrite(ilmaPumppu, HIGH);                                          // Jos arvo 0 == pumppu ei ole päällä
        Serial.println("ThingSpeak arvo 1. Ilmapumppu on päällä. ");
      }
      else if(ilmaPumppuThingspeakOhjaus == 0){
        digitalWrite(ilmaPumppu, LOW);
        Serial.println("ThingSpeak arvo 0. Ilmapumppu on pois päältä. ");
      }
     

      anturienArvo = ThingSpeak.readFloatField(channel_id, ThingSpeakFieldAnturiDataSend);   // Luetaan anturien lähetyksen ohjausarvo Thingspeakiin
    
       if (anturienArvo == 1) {                                                  // Mikäli arvo 1 == luetaan anturit ja tallennetaan
                                                                                 // metodin sisäisiin muuttujiin ja lähetetään Thingspeakiin
           int PHarvo = PHTasoAnturiArvo();
           int ECarvo = ECAnturiArvo();
           
        if (wifiClient.connect(server, 80))                                      // api.thingspeak.com
            {                                                                    // Thingspeak tunneli avataan
              String data_to_send = write_api_key;                               // API-key
              data_to_send += "&field1=";
              data_to_send += PHarvo;
              data_to_send += "&field2=";
              data_to_send += ECarvo;
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
  wifiClient.stop();                                                            // Thingspeak tunneli suljetaan
  
       }

       else {                                                                   // Kun anturien arvo on 0
        Serial.println("ThingSpeak arvo 0. Anturien arvoja ei lähetetty");      // Tulostetaan consoleen
       }


  
       
  } 
  Serial.println("Loop over");
  delay(10000);                                                                 // Odotetaan 10 sekuntia
 }
 
