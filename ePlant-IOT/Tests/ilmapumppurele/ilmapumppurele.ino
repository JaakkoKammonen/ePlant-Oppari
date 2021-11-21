int ilmaPumppu = 33;

void setup() {
    pinMode(ilmaPumppu,OUTPUT); 
      Serial.begin(115200);   

}

void loop() {
 delay(5000);
Serial.println("HIGH");
  digitalWrite(ilmaPumppu, HIGH);        
  
  delay(5000);
Serial.println("LOW");
  digitalWrite(ilmaPumppu, LOW);      
      
}
