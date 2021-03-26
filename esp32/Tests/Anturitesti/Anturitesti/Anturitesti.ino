

int vesiTasoAnturiVirta = 5;
int kosteusAnturiVirta = 18;


void setup() {
  // put your setup code here, to run once:
 Serial.begin(115200);
 pinMode(vesiTasoAnturiVirta,OUTPUT);
 pinMode(kosteusAnturiVirta,OUTPUT);
}

void loop() {
  
  // put your main code here, to run repeatedly:
 digitalWrite(kosteusAnturiVirta,HIGH);
 delay(3000);
 int kosteusAnturi = analogRead(35);
 Serial.println("Mullan kosteus lukemat:"); 
 Serial.println(kosteusAnturi);
 delay(3000);
 digitalWrite(kosteusAnturiVirta,LOW); 

 delay(5000);

  digitalWrite(vesiTasoAnturiVirta, HIGH);
  delay(3000);
  int vesiTasoAnturi = analogRead(32);
  Serial.println("Vedentaso");
  Serial.println(vesiTasoAnturi);
  Serial.println(" ");
  delay(3000);
  digitalWrite(vesiTasoAnturiVirta, LOW);
}
