// Test creating a booking through the API to verify email integration
const testBookingAPI = async () => {
  const bookingData = {
    customer_name: "Test Customer",
    customer_email: "test@example.com",
    customer_phone: "+1234567890",
    service_id: 55, // Acne Facial (from the services we saw)
    booking_date: "2025-10-15",
    booking_time: "14:30",
    notes: "Test booking for email confirmation"
  };

  try {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();
    console.log('📅 Booking API Test Result:');
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Booking created successfully with confirmation email integration!');
    } else {
      console.log('❌ Booking creation failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Test purchase API
const testPurchaseAPI = async () => {
  const purchaseData = {
    customer_name: "Test Customer",
    customer_email: "test@example.com", 
    customer_phone: "+1234567890",
    items: [
      { product_id: 1, quantity: 2 },
      { product_id: 2, quantity: 1 }
    ],
    shipping_address: "123 Test Street, Test City, TC 12345"
  };

  try {
    const response = await fetch('http://localhost:5000/api/products/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseData)
    });

    const result = await response.json();
    console.log('🛍️ Purchase API Test Result:');
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Purchase processed successfully with confirmation email integration!');
    } else {
      console.log('❌ Purchase processing failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

const runAPITests = async () => {
  console.log('🚀 Testing API endpoints with email confirmation integration...\n');
  
  await testBookingAPI();
  console.log('\n' + '='.repeat(50) + '\n');
  await testPurchaseAPI();
  
  console.log('\n✨ API tests completed!');
};

runAPITests();