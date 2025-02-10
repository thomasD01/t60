#include <Arduino.h>
#include <Wire.h>
#include <SparkFun_u-blox_GNSS_v3.h>

#define BNO08X_RESET -1

SFE_UBLOX_GNSS myGNSS;

void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  Serial.println("test");

  Wire1.begin();

  if(myGNSS.begin(Wire1) == false) {
    Serial.println("gns not found");
    while(1);
  }
  
  myGNSS.setI2COutput(COM_TYPE_UBX);

  Serial.println("Setup done");
  delay(100);
}

int32_t latitude;
int32_t longitude;
int32_t altitude;

void loop() {
  if (myGNSS.getPVT() == true){
    latitude = myGNSS.getLatitude();
    Serial.print("Lat:");
    Serial.print(latitude);
    Serial.print(",");

    longitude = myGNSS.getLongitude();
    Serial.print("Long:");
    Serial.print(longitude);
    Serial.print(",");

    altitude = myGNSS.getAltitudeMSL(); // Altitude above Mean Sea Level
    Serial.print("Alt:");
    Serial.println(altitude);
  }
}
