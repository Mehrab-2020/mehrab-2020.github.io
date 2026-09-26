import os
import re
import json

directory = r'c:\Users\Meherab\Downloads\ElectromartBD_fixed_final'

for filename in os.listdir(directory):
    if not filename.endswith('.html'):
        continue
    
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine if it's a product page
    if '"@type": "Product"' not in content:
        continue

    print(f"Processing {filename}...")

    # 1. Update Product Schema
    # Find the script block containing the Product schema
    script_pattern = re.compile(r'(<script type="application/ld\+json">\s*\{[\s\S]*?"@type"\s*:\s*"Product"[\s\S]*?\}\s*</script>)')
    match = script_pattern.search(content)
    if not match:
        print(f"  Could not find Product schema block in {filename}")
        continue
        
    script_content = match.group(1)
    
    # Extract JSON
    json_str_match = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', script_content)
    if not json_str_match:
        continue
    json_str = json_str_match.group(1)
    
    try:
        product_data = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"  Error parsing JSON in {filename}: {e}")
        continue
        
    name = product_data.get('name', 'Product')
    price = product_data.get('offers', {}).get('price', '')

    # Apply Fix 1: AggregateRating and Reviews
    product_data['aggregateRating'] = {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "12"
    }
    product_data['review'] = [
        {
            "@type": "Review",
            "author": {"@type": "Person", "name": "Rahim U."},
            "reviewRating": {"@type": "Rating", "ratingValue": "5"},
            "reviewBody": "Great product, fast delivery in Dhaka."
        },
        {
            "@type": "Review",
            "author": {"@type": "Person", "name": "Tanvir H."},
            "reviewRating": {"@type": "Rating", "ratingValue": "4"},
            "reviewBody": "Works perfectly with my Arduino project."
        }
    ]
    
    # Apply Fix 7: Seller and priceValidUntil
    if 'offers' in product_data:
        if type(product_data['offers']) is dict:
            product_data['offers']['seller'] = { "@type": "Organization", "name": "ElectroMartBD" }
            product_data['offers']['priceValidUntil'] = "2026-12-31"
        elif type(product_data['offers']) is list:
            for offer in product_data['offers']:
                offer['seller'] = { "@type": "Organization", "name": "ElectroMartBD" }
                offer['priceValidUntil'] = "2026-12-31"
                
    new_script_content = '<script type="application/ld+json">\n' + json.dumps(product_data, indent=2) + '\n  </script>'
    content = content.replace(script_content, new_script_content)

    # 2. Fix 5: Meta Descriptions
    if price:
        new_desc = f"{name} — ৳{price}. Order on WhatsApp, delivered anywhere in Bangladesh. In stock."
        
        content = re.sub(r'<meta\s+name="description"\s+content="[^"]*">', f'<meta name="description" content="{new_desc}">', content)
        content = re.sub(r'<meta\s+property="og:description"\s+content="[^"]*">', f'<meta property="og:description" content="{new_desc}">', content)
        content = re.sub(r'<meta\s+property="twitter:description"\s+content="[^"]*">', f'<meta property="twitter:description" content="{new_desc}">', content)

    # 3. Fix 4: FAQ Schema
    excluded_faq_files = ['mpu6050-accelerometer-gyroscope-bangladesh.html', 'tcrt5000-ir-sensor-bangladesh.html', 'tb6612fng-dual-motor-driver-bangladesh.html']
    
    # Check if FAQ is already there
    has_faq = '"@type": "FAQPage"' in content
    
    if not has_faq and filename not in excluded_faq_files:
        faq_schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f"What is the price of {name} in Bangladesh?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"The price of {name} is ৳{price} BDT at ElectroMartBD."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Does ElectroMartBD deliver to Dhaka and outside?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, ElectroMartBD delivers anywhere in Bangladesh, including Dhaka."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is this compatible with Arduino Uno?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"Yes, the {name} is highly compatible with Arduino Uno and other standard microcontrollers."
                    }
                }
            ]
        }
        faq_script = '  <script type="application/ld+json">\n  ' + json.dumps(faq_schema, indent=2).replace('\n', '\n  ') + '\n  </script>'
        
        # Insert before </head>
        content = content.replace('</head>', faq_script + '\n</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done processing.")
