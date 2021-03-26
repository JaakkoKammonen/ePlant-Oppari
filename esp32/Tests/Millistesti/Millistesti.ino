int ledValo = 21;
int ledState = LOW;
unsigned long previousMillis1 = 0;        // will store last time LED was updated
long OnTime1 = 20000;           // milliseconds of on-time

unsigned long previousMillis2 = 0;        // will store last time LED was updated
long OnTime2 = 5000;           // milliseconds of on-time

void setup() {
  pinMode(ledValo, OUTPUT);
  Serial.begin(115200);
}





void loop() {



unsigned long currentMillis = millis();
int valoAnturi;
if(currentMillis - previousMillis2 >= OnTime2) {
  previousMillis2 = currentMillis;
  valoAnturi = analogRead(34);
  Serial.println("Valoanturin arvo");
  Serial.println(valoAnturi);  
}

  if (valoAnturi <= 200){
    digitalWrite(ledValo,HIGH);
    
  } else if (currentMillis - previousMillis1 >= OnTime1){
    Serial.println("Rullaava aika");
    Serial.println(currentMillis);
    Serial.println("Aikaisempi aika");
    Serial.println(previousMillis1);

    Serial.println("Erotus");
    unsigned long x = currentMillis - previousMillis1;
    Serial.println(x);
    Serial.println("ontime arvo 10 000 ");
    previousMillis1 = currentMillis;
  
    Serial.println("");
    
    
    
    digitalWrite(ledValo,LOW);
  }

  


 
 
 /* if((ledState == HIGH) && (currentMillis - previousMillis1 >= OnTime1))
  {
    ledState = LOW;  // Turn it off
    previousMillis1 = currentMillis;  // Remember the time
    digitalWrite(ledValo, ledState);  // Update the actual LED
  }
  else if ((ledState == LOW) && (currentMillis - previousMillis1 >= OffTime1))
  {
    ledState = HIGH;  // turn it on
    previousMillis1 = currentMillis;   // Remember the time
    digitalWrite(ledValo, ledState);    // Update the actual LED
  }*/
 
}
