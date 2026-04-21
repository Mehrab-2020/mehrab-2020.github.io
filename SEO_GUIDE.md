# ElectromartBD SEO Playbook & Next Steps

This guide outlines exactly how to execute the remaining steps of your FULL SEO PLAN.

## 1. 🖼️ Image SEO (EASY WIN)

Right now, your images might be named things like `arduino_uno.png` or `IMG123.jpg`.
**Your Task:**
1. Open your `/images` folder.
2. Rename every single image to match the `seoSlug` exact match.
   - ❌ `arduino_uno.png`
   - ✅ `arduino-uno-r3-bangladesh.png`
   - ❌ `dht11.png`
   - ✅ `dht11-sensor-bangladesh.png`
3. If you rename them locally, simply update the script paths in `products.js` to match, and then run `node generate_products.js` again to lock the names into the final HTML!

## 2. 🌍 Local SEO (VERY POWERFUL)

To rank for "electronics shop near me", you must register on Google.
**Your Task:**
1. Go to **Google Business Profile** (google.com/business).
2. Create your listing:
   - **Name:** ElectroMart BD
   - **Category:** Electronics Store
   - **Address:** Your exact location in Dhaka (even if it's a home-based office, hiding the address is fine, just list the service area as Bangladesh).
   - **Phone:** +880 1998 421007
   - **Website:** https://www.electromartbd.bd
3. Post 1-2 product photos every week.

## 3. ✍️ Blog Strategy (TRAFFIC BOOSTER)

We recommend 2 articles per week. Write these using an AI or by yourself. They should be published directly on a Medium.com blog linked to your site, or you can add a `/blog` folder to this project later!

**First 4 Articles to Write:**
1. *Best Arduino Projects for Beginners in Bangladesh (2026)*
2. *Top 10 Sensors for Arduino: A Guide for BD Students*
3. *Arduino vs Raspberry Pi: Which is best for Bangladesh Market?*
4. *Where to Buy Electronics Components in Dhaka & Online?*

*Rule: Always link from the blog article directly to your exact static product URL, i.e., `https://www.electromartbd.bd/arduino-uno-r3-bangladesh.html`*

## 4. 🔗 Backlink Strategy (RANK BOOST)

To gain Domain Authority fast with 10–20 high-quality backlinks:
1. **Facebook Groups:** Share your blog posts and new product URLs in groups like "Dhaka Robotics Club" or "Arduino Bangladesh Enthusiasts". Do not just spam links. Answer a question, and post the link as the *resource*.
2. **Quora Spaces:** Create an account and search for "Where can I buy Arduino Uno in BD?". Answer the question and drop the `https://www.electromartbd.bd/arduino-uno-r3-bangladesh.html` link.
3. **Reddit:** Visit `/r/bangladesh` or related student/university groups. Offer a student discount code and link your site.

## 5. 🤖 Running The Custom Page Generator

Going forward, any time you add *new products* to your store:
1. Open `products.js` and add the item with a new `seoSlug: "my-custom-keyword-bd"`.
2. Open your terminal in the `ElectromartBD` directory.
3. Run: `node generate_products.js`
4. This script will magically create `my-custom-keyword-bd.html` completely optimized for Google. Upload it to your host!
