require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.PATHAO_BASE_URL;

// Function to generate an access token from Pathao
async function getPathaoAccessToken() {
    try {
        const response = await axios.post(`${BASE_URL}/aladdin/api/v1/issue-token`, {
            client_id: process.env.PATHAO_CLIENT_ID,
            client_secret: process.env.PATHAO_CLIENT_SECRET,
            username: process.env.PATHAO_USERNAME,
            password: process.env.PATHAO_PASSWORD,
            grant_type: process.env.PATHAO_GRANT_TYPE
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching Pathao token:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Endpoint to create a new order
app.post('/api/create-order', async (req, res) => {
    try {
        // 1. Get Access Token
        const tokenData = await getPathaoAccessToken();
        const accessToken = tokenData.access_token;

        // 2. Prepare Order Data (Coming from your frontend cart.js)
        const orderDetails = req.body;
        
        // Example structure required by Pathao API (You will need to map your frontend data to this)
        const pathaoOrderPayload = {
            store_id: orderDetails.store_id || 'YOUR_STORE_ID', // Replace with your actual store ID
            merchant_order_id: `ORD-${Date.now()}`,
            sender_name: orderDetails.sender_name || 'ElectromartBD',
            sender_phone: orderDetails.sender_phone || '01XXXXXXXXX',
            recipient_name: orderDetails.recipient_name,
            recipient_phone: orderDetails.recipient_phone,
            recipient_address: orderDetails.recipient_address,
            recipient_city: orderDetails.recipient_city,
            recipient_zone: orderDetails.recipient_zone,
            recipient_area: orderDetails.recipient_area,
            delivery_type: 48, // 48 for normal delivery, 12 for express (depends on Pathao docs)
            item_type: 2, // 2 for parcel
            special_instruction: orderDetails.special_instruction || 'Handle with care',
            item_quantity: 1,
            item_weight: orderDetails.item_weight || 0.5,
            amount_to_collect: orderDetails.amount_to_collect || 0,
            item_description: orderDetails.item_description || 'Electronic Components'
        };

        // 3. Send Order to Pathao
        const response = await axios.post(`${BASE_URL}/aladdin/api/v1/orders`, pathaoOrderPayload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // 4. Send success response back to frontend
        res.status(200).json({
            success: true,
            message: 'Order created successfully on Pathao!',
            data: response.data
        });

    } catch (error) {
        console.error("Failed to create order:", error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create order on Pathao',
            error: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Pathao Base URL: ${BASE_URL}`);
});
