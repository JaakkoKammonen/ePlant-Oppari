
int pH_Value; 
float Voltage;
 
void setup() 
{ 
  Serial.begin(115200);
  pinMode(pH_Value, INPUT); 
} 
 
void loop() 
{ 
  pH_Value = analogRead(32); 
  Voltage = pH_Value * (4.94 / 1023.0);
  Serial.println(Voltage); 
  delay(500); 
}
