
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

/* Replace with your ThingSpeak channel_id and write_apikey!!!! */
long unsigned  int channel_id = 1079275;        
const String write_api_key ="CSI9579IPM1KPS7H";  
const char* server = "api.thingspeak.com";


//#define ECAnturi 35
#define VREF 5.0 // analog reference voltage(Volt) of the ADC
#define SCOUNT 30 // sum of sample point

int analogBuffer[SCOUNT]; // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0,copyIndex = 0;
float averageVoltage = 3.3,tdsValue = 0,temperature = 25;

WebServer Server;
AutoConnect Portal(Server);
AutoConnectConfig config;
WiFiClient wifiClient;


/*
 * AirPump pin, Controlls relay that AirPump is connected.
 * 
 * AirPumpThingSpeakField
 * In ThingSpeak we will set 1 channel that have 3 fields. 
*/
int AirPump = 33;
int AirPumpThingSpeakField = 3;


int PHTasoAnturiVirta = 5;                                                      // Antureiden virrat
int PHAnturi= 32;

int ECAnturiVirta = 18;
int ECAnturi= A0;
 

                                              // ThingSpeak-field numero
int SendSensorDataThingSpeakField= 4;                                          // ThingSpeak-field arvo


void setup() {

  pinMode(AirPump,OUTPUT);                                                   // Pin-output anturien pinneille
  pinMode(PHTasoAnturiVirta,OUTPUT);                                            // Relay anturien pinneille
  pinMode(ECAnturiVirta,OUTPUT);
  //pinMode(ECAnturi,INPUT);
  
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

                                                

}

 int getMedianNum(int bArray[], int iFilterLen)
            {
            int bTab[iFilterLen];
            for (byte i = 0; i<iFilterLen; i++)
            bTab[i] = bArray[i];
            int i, j, bTemp;
            for (j = 0; j < iFilterLen - 1; j++)
            {
            for (i = 0; i < iFilterLen - j - 1; i++)
            {
            if (bTab[i] > bTab[i + 1])
            {
            bTemp = bTab[i];
            bTab[i] = bTab[i + 1];
            bTab[i + 1] = bTemp;
            }
            }
            }
            if ((iFilterLen & 1) > 0)
            bTemp = bTab[(iFilterLen - 1) / 2];
            else
            bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
            return bTemp;
            }
            
 static int ECAnturiArvo() {

        digitalWrite(ECAnturiVirta, HIGH);                                      // Virrat päälle -> odotus -> luetaan -> tallennetaan muuttujaan tieto -> virrat pois
        delay(5000);
        
          analogBuffer[analogBufferIndex] = analogRead(ECAnturi); //read the analog value and store into the buffer
          analogBufferIndex++;
          if(analogBufferIndex == SCOUNT)
          analogBufferIndex = 0;

          for(copyIndex=0;copyIndex<SCOUNT;copyIndex++)
          analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
          averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF/ 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
          float compensationCoefficient=1.0+0.02*(temperature-25.0); //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
          float compensationVolatge=averageVoltage/compensationCoefficient; //temperature compensation
          tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
          //Serial.print("voltage:");
          //Serial.print(averageVoltage,2);
          //Serial.print("V ");
          Serial.print("TDS Value:");
          Serial.print(tdsValue,0);
          Serial.println("ppm");

        digitalWrite(ECAnturiVirta,LOW);
      
       return tdsValue;
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
  
  // Wifi is not connected!
  if (WiFi.status() != WL_CONNECTED) {                                           
      
  // AirPump is allways on, when there is no internet connection.
  Serial.println("No internet connection, AirPump run allways!");
  // HIGH = OFF, LOW = ON
  // AirPump ON -> Relay Pin is activated
  digitalWrite(AirPump, LOW);
  }


    // If Internet connection is made.
   if (WiFi.status() == WL_CONNECTED) { 

      // Read AirpumpControll value from ThingsPeak. 
      //If value === 1, Airpump ON,
      //If value === 0, Airpump OFF
      int AirPumpONOFFValue = ThingSpeak.readFloatField(channel_id, AirPumpThingSpeakField);

      
      if(AirPumpONOFFValue == 1){
        // AirPump ON
        // HIGH = OFF, LOW = ON
        digitalWrite(AirPump, LOW);                                          // Jos arvo 0 == pumppu ei ole päällä
        Serial.println("ThingSpeak value 1. AirPump is ON. ");
      }
      else if(AirPumpONOFFValue == 0){
        // AirPump OFF
        // HIGH = OFF, LOW = ON
        digitalWrite(AirPump, HIGH);
        Serial.println("ThingSpeak value 0. AirPump is OFF. ");
      }
     
      // Read SensorControll value from ThingsPeak. 
      int SendSensorValuesONOFF = ThingSpeak.readFloatField(channel_id, SendSensorDataThingSpeakField);   

       // If SensorControll value is 1,
       // Send Sensors values to ThingSpeak.
       if (SendSensorValuesONOFF == 1) {
       
       Serial.println("ThingSpeak value 1. Reading sensor values then sending them to ThingSpeak"); 
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
              Serial.println("SensorData");
              Serial.println( );
              Serial.println("PH-Value:");
              Serial.println( PHarvo );
              Serial.println( );
              Serial.println("PPM-value:");
              Serial.println(ECarvo );
               Serial.println( );
            }
          wifiClient.stop();
       }

       else if (SendSensorValuesONOFF == 0) {
        Serial.println("ThingSpeak sensor send value is 0. No sensors were read or send!");      // Tulostetaan consoleen
       }
    
  } 
  Serial.println("Loop over");
  delay(10000);                                                                 // Odotetaan 10 sekuntia
 }
 
