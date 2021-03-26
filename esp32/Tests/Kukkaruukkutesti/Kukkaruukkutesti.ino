#include "WiFi.h"
 
const char* ssid = "Jace";   // Wifin nimi
const char* password =  "tietokone"; // Wifin salasana

int ledValo = 27;

int vesiPumppu = 22;

void setup() {
  
  Serial.begin(115200); // aloitetaan wifin yhdistys
 
 /* WiFi.begin(ssid, password); // ylempata otetaan arvot, joilla yhdistetään
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");  // Yritetään yhdistää, jos menee läpi siirtyy toiseen printtaukseen connect to wifi
  }
 
  Serial.println("Connected to the wifi"); 
*/


 
  pinMode(ledValo,OUTPUT);
 

  pinMode(vesiPumppu,OUTPUT);

  
}

void loop() {

  int kosteusAnturi = analogRead(4);
  Serial.println("Mullan kosteus lukemat:"); 
  Serial.println(kosteusAnturi);
  
        /* Kosteusanturin arvoja: 
          5: 2300->      // Lilluu vedessä....
          4: 2200-2300   // Liian märkä
          3: 2100-2200   //Optimaali
          2: 1900-2100   //Hyvä
          1: 0-1900      // Liian kuiva, kastellaan */

  int vesiTasoAnturi = analogRead(26);
  Serial.println("Vedentaso");
  Serial.println(vesiTasoAnturi);
  Serial.println(" ");
  /*    Vesitaso arvoja:
   *    5: 1600-1800      // Ihan yläraja, älä täytä enää!
   *    4: 1400-1600      // Vettä sopivasti
   *    3: 1000-1400      // Vettä sopivasti
   *    2: 400-1000       // Vettä vähän
   *    1: 0-400          // Juuri alarajassa, pumppua ei saa käyttää 
   */    
    if (400 < vesiTasoAnturi){                              // Jos vesi taso liian alhainen siirrytään else- lausekkeeseen

         if (kosteusAnturi < 1900) {                        // Jos mullan kosteus on alle 1900 
            digitalWrite(vesiPumppu,HIGH);                  // Vesipumppu päälle
            delay(3000);                                    // Odotetaan 1sec
            Serial.println("Vesipumppu kävi 1 sec");        // Tulostetaan consoleen
            Serial.println(" ");          
            digitalWrite(vesiPumppu,LOW);                   // Vesipumppu pois päältä
            delay(2000);
         } else {
          Serial.println(" ");                              // Jos mullan kosteus yli 1900
          Serial.println("Mullan kosteus ok, ei kastelua"); // Tulostetaan consoleen
          digitalWrite(vesiPumppu,LOW);                     // Varmistus, että pumppu on pois päältä
         }
    } 
  
  int valoAnturi = analogRead(15);
  Serial.println("Valoanturin arvo");
  Serial.println(valoAnturi);

  if (valoAnturi < 700) {
    digitalWrite(ledValo,HIGH);
    Serial.println("Valo päällä");
    
  } else {
    digitalWrite(ledValo,LOW);
    
  }


  delay(10000);

 
  
}
