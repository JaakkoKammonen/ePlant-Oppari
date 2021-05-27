const int analogInPin = 35; 
int sensorValue = 0; 
unsigned long int avgValue; 
float b;
int buf[10],temp;
void setup() {
 Serial.begin(115200);
}
 
void loop() {
 for(int i=0;i<10;i++) 
 { 
  buf[i]=analogRead(analogInPin);
  delay(10);
 }
 for(int i=0;i<9;i++)
 {
  for(int j=i+1;j<10;j++)
  {
   if(buf[i]>buf[j])
   {
    temp=buf[i];
    buf[i]=buf[j];
    buf[j]=temp;
   }
  }
 }
 avgValue=0;
 for(int i=2;i<8;i++)
 avgValue+=buf[i];

  float pHVol=(float)avgValue/6*4.95/4095;
  Serial.print("v = ");
  Serial.println(pHVol);

  float phValue = -5.70 * pHVol + 21.34;    
  //float phValue = 7 + ((2.5 - pHVol) / 0.18);
  Serial.print("Ph=");
  Serial.println(phValue);
 
 delay(20);
}
