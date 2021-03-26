//Welcome to E for Engineer...Subscribe Now
#include "ThingSpeak.h"
#include <WiFi.h>

//Replace your wifi credentials here
const char* ssid     = "Sylvindeeros";//Replace with your Wifi Name
const char* password = "SylvinKakka";// Replace with your wifi Password

//change your channel number here
unsigned long channel =1020483;//Replace with your own ThingSpeak Account Channle ID

//1,2 and 3 are channel fields. You don't need to change if you are following this tutorial. However, you can modify it according to your application
unsigned int vesiPumppu = 33;


WiFiClient  client;


void setup() {
  Serial.begin(115200);
  delay(100);
  
  pinMode(vesiPumppu, OUTPUT);
  
  digitalWrite(vesiPumppu, 0);
 
  // We start by connecting to a WiFi network
 
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Netmask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
  ThingSpeak.begin(client);

}

void loop() {
 
  //get the last data of the fields
  int vesi_Pumppu = ThingSpeak.readFloatField(channel, 3);
 
 
  if(vesi_Pumppu == 1){
    digitalWrite(vesiPumppu, 1);
    Serial.println("D1 is On..!");
  }
  else if(vesi_Pumppu == 0){
    digitalWrite(vesiPumppu, 0);
    Serial.println("D1 is Off..!");
  }
 
 
  Serial.println(vesi_Pumppu);

  delay(5000);
 
}
