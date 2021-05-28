int pHSense = 35;
int samples = 10;
float adc_resolution = 1024.0;

void setup()
{
  Serial.begin(115200);
  delay(100);
  Serial.println("cimpleo pH Sense");
}

float ph (float voltage) {
  return 7 + ((2.5 - voltage) / 0.18);
}

void loop () {
  int measurings=0;
  float x = analogRead(pHSense);
  for (int i = 0; i < samples; i++)
  {
    measurings += analogRead(pHSense);
    delay(10);
  }
    float voltage = 5 / adc_resolution * (measurings/5.75)/samples;
    Serial.print("pH= ");
    Serial.println(ph(voltage));
    delay(3000);
}
