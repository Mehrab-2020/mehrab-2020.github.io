const productsData = [
  {
    category: "Development Boards",
    items: [
      {
        id: "arduino_uno",
        name: "Arduino Uno R3",
        image: "./images/arduino_uno.png",
        shortDesc: "The classic microcontroller board. ATmega328P | USB Powered.",
        price: "৳550",
        fullDesc: "The Arduino Uno R3 is the perfect microcontroller board for beginners and professionals alike. Based on the ATmega328P, it offers a robust platform for learning electronics and coding.",
        features: [
           "Microcontroller: ATmega328P",
           "Operating Voltage: 5V",
           "Digital I/O Pins: 14 (of which 6 provide PWM output)",
           "Analog Input Pins: 6",
           "Flash Memory: 32 KB"
        ]
      },
      {
        id: "nodemcu",
        name: "NodeMCU ESP8266",
        image: "./images/nodemcu.png",
        shortDesc: "Powerful WiFi Development Board for your IoT projects.",
        price: "৳350",
        fullDesc: "The NodeMCU ESP8266 is an open-source firmware and development kit that helps you to prototype or build IoT products. It includes firmware which runs on the ESP8266 Wi-Fi SoC.",
        features: [
           "Microcontroller: ESP8266",
           "Built-in WiFi 802.11 b/g/n",
           "Operating Voltage: 3.3V",
           "Digital I/O Pins: 11",
           "Clock Speed: 80MHz/160MHz"
        ]
      },
      {
        id: "raspberry_pi_4",
        name: "Raspberry Pi 4 Model B",
        image: "./images/raspberry_pi_4.png", 
        shortDesc: "High-performance SBC with dual 4K display support and true Gigabit Ethernet.",
        price: "৳6500",
        fullDesc: "The Raspberry Pi 4 Model B represents a huge leap forward for single-board computing. It boasts a 64-bit quad-core processor, dual-display support at resolutions up to 4K, and dual-band wireless LAN. Whether you're building a retro gaming console, a media center, or an industrial controller, the Pi 4 has the power you need.",
        features: [
          "Processor: Broadcom BCM2711, quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz",
          "Dual-band 2.4 GHz and 5.0 GHz IEEE 802.11b/g/n/ac wireless LAN",
          "Bluetooth 5.0, BLE",
          "True Gigabit Ethernet",
          "2 × USB 3.0 ports, 2 × USB 2.0 ports",
          "Dual micro-HDMI ports supporting up to 4K@60fps"
        ]
      },
      {
        id: "esp32",
        name: "ESP32 Development Board",
        image: "./images/esp32.png",
        shortDesc: "Dual-core WiFi & Bluetooth MCU for advanced IoT applications.",
        price: "৳450",
        fullDesc: "The ESP32 is a powerful dual-core microcontroller with integrated Wi-Fi and dual-mode Bluetooth (Classic and BLE). It excels in complex IoT applications, robotics, and smart home systems requiring both strong processing capabilities and varied wireless connectivity.",
        features: [
          "Processor: Dual-core Tensilica Xtensa LX6",
          "Clock Speed: Up to 240 MHz",
          "Integrated Wi-Fi (802.11 b/g/n) and Bluetooth v4.2/BLE",
          "Capacitive Touch Sensors built-in",
          "Extensive peripheral interfaces: SPI, I2C, UART, I2S, CAN"
        ]
      }
    ]
  },
  {
    category: "Components & Passives",
    items: [
      {
        id: "resistor_pack",
        name: "Resistor Pack",
        image: "./images/resistors.png",
        shortDesc: "100 pieces of assorted through-hole resistor values for prototyping.",
        price: "৳120",
        fullDesc: "A complete set of 100 high-quality carbon film resistors. Essential for any electronics enthusiast, this pack includes the most common values needed for building circuits, dividing voltage, and protecting components like LEDs.",
        features: [
          "Assorted values from 10Ω to 1MΩ",
          "Carbon film type",
          "Tolerance: ±5%",
          "Power Rating: 1/4 Watt",
          "Through-hole package for easy breadboarding"
        ]
      },
      {
        id: "capacitor_kit",
        name: "Capacitor Kit",
        image: "./images/capacitors.png",
        shortDesc: "Mixed pack of electrolytic and ceramic capacitors.",
        price: "৳180",
        fullDesc: "This versatile capacitor kit contains a wide assortment of both ceramic and electrolytic capacitors. Perfect for decoupling noise in power supplies, signal filtering, and timing circuits in your projects.",
        features: [
          "Includes both ceramic disc and aluminum electrolytic types",
          "Various capacitance values (pF to µF range)",
          "Voltage ratings suited for typical 5V-12V circuits",
          "Clearly marked values",
          "Ideal for breadboard development"
        ]
      }
    ]
  },
  {
    category: "Sensors & Modules",
    items: [
      {
        id: "dht11",
        name: "DHT11 Sensor",
        image: "./images/dht11.png",
        shortDesc: "Digital temperature and humidity sensor module.",
        price: "৳120",
        fullDesc: "The DHT11 is a basic, ultra low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, outputting a digital signal on the data pin.",
        features: [
          "Operating Voltage: 3.3V to 5V",
          "Temperature range: 0-50°C (±2°C accuracy)",
          "Humidity range: 20-90% RH (±5% accuracy)",
          "Single-bus digital signal output",
          "Low power consumption"
        ]
      },
      {
        id: "ultrasonic",
        name: "HC-SR04 Ultrasonic",
        image: "./images/ultrasonic.png",
        shortDesc: "Precision distance measurement module with dual transducers.",
        price: "৳150",
        fullDesc: "The HC-SR04 uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection with high accuracy and stable readings in an easy-to-use package. From 2cm to 400cm, it's the standard for robotic obstacle avoidance.",
        features: [
          "Operating Voltage: 5V DC",
          "Quiescent Current: <2mA",
          "Measuring Angle: <15 degrees",
          "Ranging Distance: 2cm - 400cm",
          "High precision: up to 3mm accuracy"
        ]
      },
      {
        id: "hc05",
        name: "HC-05 Bluetooth Module",
        image: "./images/hc05.png",
        shortDesc: "Add full-duplex serial wireless connectivity to your projects.",
        price: "৳250",
        fullDesc: "The HC-05 is a widely popular, low-cost serial Bluetooth module. It can be set up as a Master or Slave device, making it incredibly versatile for creating point-to-point wireless connections between microcontrollers, PCs, and smartphones.",
        features: [
          "Bluetooth 2.0+EDR (Enhanced Data Rate)",
          "Default Baud Rate: 9600 (Data Mode), 38400 (AT Mode)",
          "Operating Voltage: 3.6V to 6V DC (5V recommended)",
          "Range: Up to 10 meters",
          "Configurable via AT commands (Name, Role, Baud Rate)"
        ]
      }
    ]
  }
];

// Helper to get a single product by ID
function getProductById(id) {
  for (const category of productsData) {
    const found = category.items.find(item => item.id === id);
    if (found) return found;
  }
  return null;
}
