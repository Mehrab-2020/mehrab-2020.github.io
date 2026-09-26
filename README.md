<div align="center">

# ⚡ ElectroMart BD

**Bangladesh’s Premier Online Shop for Arduino, Sensors & Robotics Components**

[![Website](https://img.shields.io/badge/Website-electromartbd.bd-00d1ff?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.electromartbd.bd)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://mehrab-2020.github.io)
[![SEO Ready](https://img.shields.io/badge/SEO-Optimized%20%2B%20LLM%20Ready-00e676?style=for-the-badge&logo=google&logoColor=white)](https://www.electromartbd.bd/sitemap.xml)
[![Order via WhatsApp](https://img.shields.io/badge/Order-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/8801577098376)

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-repository-structure">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-adding-new-products">Product Workflow</a> •
  <a href="#-seo--ai-search-readiness">SEO & AI</a> •
  <a href="#-contact--support">Support</a>
</p>

---

</div>

## 📖 About the Project

**ElectroMart BD** is an e-commerce platform built specifically for students, engineers, robotics builders, and IoT enthusiasts across Bangladesh. The storefront delivers an ultra-fast, zero-bloat user experience designed for browsing, learning, and ordering electronic components with immediate WhatsApp checkout.

### 🌟 Product Collections
* **Microcontrollers & Development Boards:** Arduino Uno R3, Nano V3, Mega 2560, NodeMCU ESP8266, ESP32, and Raspberry Pi 4.
* **Sensors & Modules:** Ultrasonic (HC-SR04), Temperature & Humidity (DHT11), Gas (MQ-2), IR Reflective (TCRT5000), and 6-DOF IMU (MPU6050).
* **Robotics & Actuation:** N20 Micro Gear Motors, SG90 Servos, L298N & TB6612FNG Dual Motor Drivers, and motor mounts/wheels.
* **Prototyping Essentials:** 830-point Breadboards, Jumper Wires, Resistor Packs, Capacitor Kits, and Voltage Regulators (L7805CV).

---

## ✨ Key Features

- **⚡ Blazing Fast Performance:** Pure Vanilla HTML5, CSS3, and JavaScript — no heavy frontend frameworks or slow hydration cycles.
- **🔍 Full SEO & AI Search Engine Readiness:**
  - Dedicated static landing pages with long-tail keywords for all 26+ products.
  - Curated [`llms.txt`](llms.txt) for AI search engines (ChatGPT Search, Perplexity, Claude).
  - Schema.org structured data (`Product`, `BreadcrumbList`, `FAQPage`, `ElectronicsStore`).
  - Canonical tags, Open Graph meta tags, and automated XML sitemap.
- **💬 Seamless WhatsApp Checkout:** One-click cart-to-WhatsApp order dispatch with pre-formatted product summaries.
- **📱 Responsive Glassmorphic Dark UI:** Handcrafted CSS with modern design tokens, accessible typography (`Outfit` & `Inter`), and interactive search/filter capabilities.
- **🚚 Pathao Courier API Integration:** Lightweight Express.js backend (`server.js`) for automated parcel booking and order fulfillment.

---

## 📂 Repository Structure

```text
├── 📄 index.html                       # Storefront homepage & interactive product catalog
├── 📄 arduino-bangladesh.html          # Hub page: Arduino microcontrollers & pricing
├── 📄 esp32-bangladesh.html            # Hub page: ESP32 WiFi/Bluetooth boards
├── 📄 sensors-bangladesh.html          # Hub page: Sensors & modules
├── 📄 electronics-components-bd.html   # Hub page: Passive & discrete components
├── 📄 build-a-robotics-project-bangladesh.html  # Free project consultation portal
├── 📄 blog.html                        # Electronics tutorials & technical guides
│
├── 📁 images/                          # WebP optimized product imagery
│   └── 📁 webp/                        # Compressed, responsive product photos
│
├── 📄 styles.css                       # Global design system, glassmorphism & responsive CSS
├── 📄 products.js                      # Core product database & catalog schema
├── 📄 cart.js                          # Client-side shopping cart & WhatsApp checkout logic
├── 📄 nav.js                           # Shared dynamic navigation component
├── 📄 generate_products.js             # Automated static product page generator
│
├── 📄 server.js                        # Express.js backend for Pathao Logistics integration
├── 📄 package.json                     # Backend dependencies & npm scripts
│
├── 📄 robots.txt                       # Search crawler rules (including AI bots)
├── 📄 sitemap.xml                      # XML Sitemap for search engines
├── 📄 llms.txt                         # AI context file for LLM answer engines
├── 📄 CNAME                            # Custom domain configuration (www.electromartbd.bd)
├── 📄 .gitignore                       # Clean Git tracking configuration
│
└── 📁 scripts/
    └── 📁 maintenance/                 # Maintenance, migration, and update utilities
```

---

## 🚀 Getting Started

### 1. Running Locally (Static Frontend)
You can preview the website using any local web server:

```bash
# Using VS Code Live Server, or Python's built-in server:
python -m http.server 8000

# Open in browser:
http://localhost:8000
```

### 2. Running the Backend Server (Optional - Pathao Integration)
If you want to run the courier booking backend:

```bash
# Install dependencies
npm install

# Configure environment variables
# Create a .env file with your Pathao credentials (see .env.example)

# Start development server
npm start
```

---

## 🛠️ Adding New Products

ElectroMart BD uses an automated page generator to ensure every new item receives an SEO-optimized static landing page:

1. Open [`products.js`](products.js) and append your new product under the appropriate category:
   ```javascript
   {
     id: "my_new_module",
     seoSlug: "my-new-module-price-bd",
     name: "My New Module",
     metaTitle: "Buy My New Module in BD | ElectroMart BD",
     metaDescription: "Get the best price on My New Module in Bangladesh...",
     image: "./images/webp/my-new-module.webp",
     price: "৳250",
     shortDesc: "High quality sensor module for prototyping.",
     fullDesc: "Detailed product description...",
     features: ["5V Operating Voltage", "High Sensitivity"]
   }
   ```
2. Place the product photo in `images/webp/` with the matching filename.
3. Run the static generator:
   ```bash
   node generate_products.js
   ```
4. Commit and push the generated HTML file and updated `sitemap.xml`!

---

## 🤖 SEO & AI Search Readiness

ElectroMart BD is engineered from the ground up to rank in both traditional engines (Google, Bing) and next-generation generative answer engines:

- **[`llms.txt`](llms.txt):** A standardized Markdown context document summarizing product offerings, Dhaka dispatch details, pricing, and contact methods for AI crawlers.
- **AI Crawler Allow-List:** [`robots.txt`](robots.txt) explicitly welcomes `ChatGPT-User`, `OAI-SearchBot`, `CCBot`, `Google-Extended`, and `anthropic-ai`.
- **Structured Data:** Full schema validation including `Product`, `Offer`, `BreadcrumbList`, and `FAQPage` JSON-LD scripts.

---

## 📞 Contact & Support

* **Website:** [electromartbd.bd](https://www.electromartbd.bd)
* **WhatsApp / Hotline:** [+880 1577-098376](https://wa.me/8801577098376)
* **Location:** Dhaka, Bangladesh
* **Nationwide Delivery:** Available across all 64 districts via Pathao & Steadfast Courier

---

<div align="center">
  <sub>© 2026 ElectroMartBD. Designed with precision for builders and makers.</sub>
</div>
