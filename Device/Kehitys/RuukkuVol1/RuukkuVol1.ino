


/*
  This example is based on the environment as of March 20, 2018.
  Copyright (c) 2018 Hieromon Ikasamo.
  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

#include <AutoConnect.h>
#include <WebServer.h>
#include <ThingSpeak.h>

long unsigned  int channel_id = 1008455;            // Replace to Channel ID.
const String write_api_key ="H8Q7RH96X8TM2NL4";  // Replace to the write API Key.
const char* server = "api.thingspeak.com";
     
WebServer Server;
AutoConnect Portal(Server);
AutoConnectConfig config;
WiFiClient wifiClient;


int vesiPumppu = 33;
int vesiPumppuField = 4;
int vesiPumppuArvo = 5;

int vesiTasoAnturiVirta = 5;
int kosteusAnturiVirta = 18;

int anturienArvo = 5;
int anturienField = 5;


void setup() {

  pinMode(vesiPumppu,OUTPUT);
  pinMode(vesiTasoAnturiVirta,OUTPUT);
  pinMode(kosteusAnturiVirta,OUTPUT);

  delay(1000);
  config.apid = "ePlantVol1";
  config.psk  = "ePlantVersion";
  config.portalTimeout = 60000;
  config.title ="ePlant";
  Portal.config(config);
  Serial.begin(115200);
  Serial.println();

  if (Portal.begin()) {
    Serial.println("Wifi connected: " + WiFi.SSID());
    Serial.println("WiFi connected: " + WiFi.localIP().toString());
    
  }
WiFi.setAutoReconnect(true);
ThingSpeak.begin(wifiClient);


}

void loop() {
  
  Portal.handleClient();

  

  if (WiFi.status() != WL_CONNECTED) {

  int valoAnturi = analogRead(34);
  Serial.println("Valoanturin arvo");
  Serial.println(valoAnturi);

  
  digitalWrite(kosteusAnturiVirta, HIGH);
  delay(5000);
  int kosteusAnturi = analogRead(35);
  Serial.println("Mullan kosteus lukemat:"); 
  Serial.println(kosteusAnturi);
  digitalWrite(kosteusAnturiVirta,LOW);

  /* Kosteusanturin arvoja:
    5: 2300->      // Lilluu vedessä....
    4: 2200-2300   // Liian märkä
    3: 2100-2200   // Optimaali
    2: 1900-2100   // Hyvä
    1: 0-1900      // Liian kuiva, kastellaan 
   */

  digitalWrite(vesiTasoAnturiVirta, HIGH);
  delay(5000);
  int vesiTasoAnturi = analogRead(32);
  Serial.println("Vedentaso");
  Serial.println(vesiTasoAnturi);
  Serial.println(" ");
  digitalWrite(vesiTasoAnturiVirta, LOW);

  /*    Vesitaso arvoja:
   *    5: 1600-1800      // Ihan yläraja, älä täytä enää!
   *    4: 1400-1600      // Vettä sopivasti
   *    3: 1000-1400      // Vettä sopivasti
   *    2: 400-1000       // Vettä vähän
   *    1: 0-400          // Juuri alarajassa, pumppua ei saa käyttää 
   */    
    
     if (400 < vesiTasoAnturi){     
        
         if (kosteusAnturi < 1700) {                        // Jos mullan kosteus on alle 1900 
            digitalWrite(vesiPumppu,HIGH);                  // Vesipumppu päälle
       
            
            delay(2000);                                    // Odotetaan 1sec
            Serial.println("Vesipumppu kävi 2 sec");        // Tulostetaan consoleen
                     
            digitalWrite(vesiPumppu,LOW);                   // Vesipumppu pois päältä
            delay(7200000); //2 tuntia 
            Serial.println("Odotellaan 2h");                              
         } else {
                                            // Jos mullan kosteus yli 1900
          Serial.println("Mullan kosteus ok, ei kastelua"); // Tulostetaan consoleen
          Serial.println(" ");   
          digitalWrite(vesiPumppu,LOW);                     // Varmistus, että pumppu on pois päältä
    }
   
  } else {
    Serial.println("Täytä vesiastia");                    // Tulostetaan consoleen
    Serial.println(" ");
  } 
  
  }

  
   if (WiFi.status() == WL_CONNECTED) {

  
        
      
      vesiPumppuArvo = ThingSpeak.readFloatField(channel_id, vesiPumppuField);

      if(vesiPumppuArvo == 1){
        digitalWrite(vesiPumppu, HIGH);
        delay(2000);
        digitalWrite(vesiPumppu, LOW);
        Serial.println("Vesipumppu oli päällä 2 sekuntia.");
      }
        else if(vesiPumppuArvo == 0){
        digitalWrite(vesiPumppu, LOW);
        Serial.println("Vesipumppu on pois päältä. ThingSpeak arvo 0.");
  }
     

       anturienArvo = ThingSpeak.readFloatField(channel_id, anturienField);

       if (anturienArvo == 1) { 
        
  int valoAnturi = analogRead(34);
  Serial.println("Valoanturin arvo");
  Serial.println(valoAnturi);
      
  digitalWrite(kosteusAnturiVirta, HIGH);
  delay(5000);
  int kosteusAnturi = analogRead(35);
  Serial.println("Mullan kosteus lukemat:"); 
  Serial.println(kosteusAnturi);
  digitalWrite(kosteusAnturiVirta,LOW);

  /* Kosteusanturin arvoja:
    5: 2300->      // Lilluu vedessä....
    4: 2200-2300   // Liian märkä
    3: 2100-2200   // Optimaali
    2: 1900-2100   // Hyvä
    1: 0-1900      // Liian kuiva, kastellaan 
   */

  digitalWrite(vesiTasoAnturiVirta, HIGH);
  delay(5000);
  int vesiTasoAnturi = analogRead(32);
  Serial.println("Vedentaso");
  Serial.println(vesiTasoAnturi);
  Serial.println(" ");
  digitalWrite(vesiTasoAnturiVirta, LOW);

  /*    Vesitaso arvoja:
   *    5: 1600-1800      // Ihan yläraja, älä täytä enää!
   *    4: 1400-1600      // Vettä sopivasti
   *    3: 1000-1400      // Vettä sopivasti
   *    2: 400-1000       // Vettä vähän
   *    1: 0-400          // Juuri alarajassa, pumppua ei saa käyttää 
   */ 
   
        if (wifiClient.connect(server, 80))  // api.thingspeak.com
            {
              String data_to_send = write_api_key;
              data_to_send += "&field1=";
              data_to_send += kosteusAnturi;
              data_to_send += "&field2=";
              data_to_send += vesiTasoAnturi;
              data_to_send += "&field3=";
              data_to_send += valoAnturi;
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
              anturienArvo = 0;
              Serial.println("Anturit ovat luettu ja lähetetty ThingSpeak!");
  }
  wifiClient.stop();
       }

       if (anturienArvo == 0 ) {
        Serial.println("Anturien dataa ei lähetetty, koska ThingSpeak arvo 0");
       }

  }
  delay(10000);
 }
