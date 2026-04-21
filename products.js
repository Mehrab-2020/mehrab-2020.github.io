const productsData = [
  {
    category: "Development Boards",
    items: [
      {
        id: "arduino_uno",
        seoSlug: "arduino-uno-r3-bangladesh",
        name: "Arduino Uno R3 Original Board",
        image: "./images/arduino_uno.png",
        shortDesc: "Most popular microcontroller for robotics, IoT & automation. ATmega328P | USB Powered – Best price in Bangladesh.",
        price: "৳550",
        fullDesc: "Build your next electronics project with the Arduino Uno R3, the most popular microcontroller board for beginners and professionals alike. Whether you're working on robotics, IoT, or automation, this board gives you the flexibility and reliability you need. Designed with the ATmega328P microcontroller, Arduino Uno is perfect for coding, prototyping, and learning embedded systems. Ideal for students, hobbyists & engineers across Bangladesh.",
        whyBuy: [
          "100% quality tested product",
          "Best Arduino Uno price in Bangladesh",
          "Fast delivery nationwide",
          "Ideal for students, hobbyists & engineers"
        ],
        packageIncludes: "1 × Arduino Uno R3 Board",
        keywords: "Arduino Uno R3 Bangladesh, Arduino price BD, Arduino board BD",
        features: [
           "Microcontroller: ATmega328P",
           "Operating Voltage: 5V",
           "14 Digital I/O Pins (6 provide PWM output)",
           "6 Analog Input Pins",
           "Flash Memory: 32 KB",
           "USB Interface for easy programming",
           "Compatible with Arduino IDE",
           "Stable and beginner-friendly"
        ]
      },
      {
        id: "arduino_nano",
        seoSlug: "arduino-nano-bd",
        name: "Arduino Nano V3.0",
        image: "./images/arduino_nano.png",
        shortDesc: "Compact, breadboard-friendly microcontroller board based on the ATmega328P. Best Arduino Nano price BD.",
        price: "৳450",
        fullDesc: "The Arduino Nano is a small, complete, and breadboard-friendly board based on the ATmega328. It has more or less the same functionality of the Arduino Uno, but in a different package. It lacks only a DC power jack, and works with a Mini-B USB cable instead of a standard one. Incredible Arduino price BD value for compact IoT projects.",
        whyBuy: [
          "100% quality tested original module",
          "Best Arduino Nano price BD",
          "Perfect for mini robotics and space-constrained builds"
        ],
        packageIncludes: "1 × Arduino Nano V3.0, Pin headers",
        keywords: "arduino nano bd, arduino nano price bd, arduino nano bangladesh",
        features: [
           "Microcontroller: ATmega328P",
           "Operating Voltage: 5V",
           "Compact size for breadboards",
           "Mini-B USB Connection",
           "14 Digital I/O Pins"
        ]
      },
      {
        id: "nodemcu",
        seoSlug: "nodemcu-esp8266-bd",
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
        seoSlug: "raspberry-pi-4-bangladesh",
        name: "Raspberry Pi 4 Model B",
        image: "./images/raspberry_pi_4.jpg", 
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
        seoSlug: "esp32-development-board-bd",
        name: "ESP32 Development Board",
        image: "./images/esp32.jpg",
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
        seoSlug: "resistor-pack-bangladesh",
        name: "Resistor Pack (100pcs)",
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
        seoSlug: "capacitor-kit-bd",
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
      },
      {
        id: "breadboard_830",
        seoSlug: "breadboard-830-tie-points-bd",
        name: "Breadboard 830 Tie Points",
        image: "./images/breadboard.png",
        shortDesc: "Full-size prototyping breadboard with 830 tie points. Best breadboard price BD.",
        price: "৳150",
        fullDesc: "The 830 Tie Points breadboard is perfect for prototyping electronics and Arduino projects without soldering. High-quality spring clips ensure strong component grip. Ideal essential for builders in Bangladesh.",
        features: [
          "830 total Tie Points",
          "2 Power Lanes",
          "Standard 2.54mm pitch",
          "Solderless and reusable",
          "Adhesive backing included"
        ]
      },
      {
        id: "jumper_wires_male_male",
        seoSlug: "jumper-wire-male-to-male-bd",
        name: "Jumper Wire (Male to Male)",
        image: "./images/jumpers.png",
        shortDesc: "40 pins ribbon cable jumper wires male to male for breadboard.",
        price: "৳80",
        fullDesc: "Standard 40-pin Male to Male jumper wire ribbon cable. These high-quality wires are flexible, durable, and essential for every Arduino and IoT project you run on a breadboard. Great jumper wire male to male bd price value.",
        features: [
          "40 individual wires per ribbon",
          "Male to Male jumper headers",
          "20cm length",
          "Easy to strip away individually or keep together",
          "Standard 2.54mm pitch connectors"
        ]
      }
    ]
  },
  {
    category: "Sensors & Modules",
    items: [
      {
        id: "dht11",
        seoSlug: "dht11-sensor-bangladesh",
        name: "DHT11 Temperature & Humidity Sensor Module",
        image: "./images/dht11.png",
        shortDesc: "Monitor temperature & humidity easily – perfect for weather stations, home automation & IoT. Best price in Bangladesh.",
        price: "৳120",
        fullDesc: "Monitor temperature and humidity easily with the DHT11 Sensor Module. It's a cost-effective and reliable solution for weather stations, home automation, and IoT projects. Perfect for beginners working with Arduino and Raspberry Pi. The DHT11 uses a capacitive humidity sensor and a thermistor to measure surrounding air, outputting a digital signal on a single data pin – no analog conversion needed.",
        whyBuy: [
          "Best DHT11 price in Bangladesh",
          "Quality checked products",
          "Great for student projects",
          "Fast delivery across BD"
        ],
        packageIncludes: "1 × DHT11 Sensor Module",
        keywords: "DHT11 sensor BD, temperature sensor Bangladesh, humidity sensor BD",
        features: [
          "Measures temperature: 0–50°C (±2°C accuracy)",
          "Measures humidity: 20–90% RH (±5% accuracy)",
          "Operating Voltage: 3.3V to 5V",
          "Digital signal output (single-bus)",
          "Easy integration with Arduino & Raspberry Pi",
          "Low power consumption",
          "Stable and long-lasting performance"
        ]
      },
      {
        id: "ultrasonic",
        seoSlug: "hc-sr04-ultrasonic-sensor-bd",
        name: "HC-SR04 Ultrasonic Distance Sensor",
        image: "./images/ultrasonic.png",
        shortDesc: "Accurate distance measurement with ultrasonic waves – ideal for robotics & obstacle detection. Best price in BD.",
        price: "৳150",
        fullDesc: "Measure distance accurately with the HC-SR04 Ultrasonic Sensor, perfect for Arduino and robotics projects. This sensor uses ultrasonic waves to detect objects and calculate distance with high precision. Ideal for obstacle detection, smart parking systems, and automation projects. From 2cm to 400cm, it's the standard for robotic obstacle avoidance — compact, lightweight, and easy to interface.",
        whyBuy: [
          "Affordable sensor price in Bangladesh",
          "Reliable and tested modules",
          "Fast delivery across BD"
        ],
        packageIncludes: "1 × HC-SR04 Ultrasonic Sensor",
        keywords: "ultrasonic sensor BD, HC-SR04 price Bangladesh, distance sensor BD",
        features: [
          "Measuring Range: 2cm – 400cm",
          "Operating Voltage: 5V DC",
          "Quiescent Current: <2mA",
          "Measuring Angle: <15 degrees",
          "High accuracy: up to 3mm precision",
          "High accuracy and stable performance",
          "Low power consumption",
          "Easy interface with Arduino & microcontrollers",
          "Compact and lightweight"
        ]
      },
      {
        id: "hc05",
        seoSlug: "hc-05-bluetooth-module-bd",
        name: "HC-05 Bluetooth Module",
        image: "./images/hc05.jpg",
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

// Support Node.js export for generate_products.js script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productsData };
}
