int period = 10000;
unsigned long time_now = 0;
 
void setup() {
    Serial.begin(115200);
}
 
void loop() {
    if(millis() >= time_now + period){
        time_now += period;
        Serial.println("Hello 10se");
    }
    
   
    //Run other code
}
