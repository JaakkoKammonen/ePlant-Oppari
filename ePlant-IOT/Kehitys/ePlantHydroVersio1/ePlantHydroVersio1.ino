
/*
  Copyright (c) 2018 Hieromon Ikasamo.
  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
*/

#include <AutoConnect.h>
#include <WebServer.h>
#include <ThingSpeak.h>

/* Replace with your ThingSpeak channel_id and write_apikey!!!! */
long unsigned  int channel_id = 1079275;        
const String write_api_key ="CSI9579IPM1KPS7H";  
const char* server = "api.thingspeak.com";

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

// PH-sensor
int pHSense = 35;
int samples = 10;
float adc_resolution = 1024.0;

//TDS
int TDSVirta = 18;
#define TdsSensorPin 34
#define VREF 3.3 // analog reference voltage(Volt) of the ADC
#define SCOUNT 30 // sum of sample point
int analogBuffer[SCOUNT]; // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0,copyIndex = 0;
float averageVoltage = 0,tdsValue = 0,temperature = 25;

// Millis()
int period = 3600000;
// hour 3 600 000
// 6hours = 21 600 000
unsigned long time_now = 0;


void setup() {

  pinMode(AirPump,OUTPUT);                                          // Relay anturien pinneille
  pinMode(TDSVirta,OUTPUT);
  pinMode(TdsSensorPin,INPUT);
  
  delay(1000);
  config.apid = "ePlantVol2";                                                   // Hotspot-nimi
  config.psk  = "ePlantVersion";                                                // Salasana
  config.portalTimeout = 60000;                                                 // 60 sec Hotspot 
  config.title ="ePlant";                                                       // Avattavan Hotspot-nettisivu title
  config.retainPortal = true;                                                   // Hotspots koko ajan paalla
  config.ota = AC_OTA_BUILTIN;                                                  // Over-The-Air -päivitys
  config.menuItems = AC_MENUITEM_CONFIGNEW;                                     // Nettisivun komponetit
  
     
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


 
 static int ECAnturiArvo() {

        digitalWrite(TDSVirta, HIGH);                                      // Virrat päälle -> odotus -> luetaan -> tallennetaan muuttujaan tieto -> virrat pois
        delay(10000);

         analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin); //read the analog value and store into the buffer
          analogBufferIndex++;
          if(analogBufferIndex == SCOUNT) {
          analogBufferIndex = 0;
          }
          
          
          for(copyIndex=0;copyIndex<SCOUNT;copyIndex++){
          analogBufferTemp[copyIndex]= analogBuffer[copyIndex];
          averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF/ 1024.0; // read the analog value more stable by the median filtering algorithm, and convert to voltage value
          float compensationCoefficient=1.0+0.02*(temperature-25.0); //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
          float compensationVolatge=averageVoltage/compensationCoefficient; //temperature compensation
          tdsValue=(133.42*compensationVolatge*compensationVolatge*compensationVolatge - 255.86*compensationVolatge*compensationVolatge + 857.39*compensationVolatge)*0.5; //convert voltage value to tds value
          
          }
          //Serial.print("voltage:");
          //Serial.print(averageVoltage,2);
          //Serial.print("V ");
          Serial.print("TDS Value:");
          Serial.print(tdsValue,0);
          Serial.println("ppm");
          
          delay(5000);
          digitalWrite(TDSVirta, LOW); 
          float returnValue = tdsValue;
          return returnValue;

    };


float ph (float voltage) {
  return 7 + ((2.5 - voltage) / 0.18);
}

  static  int PHTasoAnturiArvo() {
        
           int measurings=0;
          float x = analogRead(pHSense);
          for (int i = 0; i < samples; i++)
          {
            measurings += analogRead(pHSense);
            delay(10);
          }
            float voltage = 4.96 / adc_resolution * (measurings/5.75)/samples;
            Serial.print("pH= ");
            Serial.println(ph(voltage));
            delay(3000);

          float returnValue = ph(voltage);   
        
         return returnValue;
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
     
    
       if(millis() >= time_now + period){
        time_now += period;

         Serial.println("Reading sensor values then sending them to ThingSpeak. "); 
           float PHarvo = PHTasoAnturiArvo();
           float ECarvo = ECAnturiArvo();
           
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
        
    }
       
          wifiClient.stop();
       }

  
  Serial.println("Loop over");
  delay(5000);     // Odotetaan 10 sekuntia
 }


         int getMedianNum(int bArray[], int iFilterLen){
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
            
 
