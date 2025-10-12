const { sendBookingConfirmation, sendPurchaseConfirmation } = require('./emailService');

// Test booking confirmation
const testBookingConfirmation = async () => {
  console.log('🧪 Testing booking confirmation email...');
  
  const customerEmail = 'test@example.com';
  const customerName = 'John Doe';
  const bookingDetails = {
    id: 123,
    booking_date: '2025-10-15',
    booking_time: '14:30',
    notes: 'Please arrive 15 minutes early'
  };
  const serviceDetails = {
    name: 'Deep Cleansing Facial',
    description: 'A comprehensive facial treatment for deep skin cleansing',
    price: 85.00,
    duration: 60
  };
  
  try {
    const result = await sendBookingConfirmation(customerEmail, customerName, bookingDetails, serviceDetails);
    console.log('✅ Booking confirmation test result:', result);
  } catch (error) {
    console.error('❌ Booking confirmation test failed:', error);
  }
};

// Test purchase confirmation
const testPurchaseConfirmation = async () => {
  console.log('🧪 Testing purchase confirmation email...');
  
  const customerEmail = 'test@example.com';
  const customerName = 'Jane Smith';
  const orderDetails = {
    orderNumber: 'JLS' + Date.now()
  };
  const items = [
    { id: 1, name: 'Luxury Hair Serum', price: 45.99, quantity: 2 },
    { id: 2, name: 'Premium Face Mask', price: 29.99, quantity: 1 }
  ];
  
  try {
    const result = await sendPurchaseConfirmation(customerEmail, customerName, orderDetails, items);
    console.log('✅ Purchase confirmation test result:', result);
  } catch (error) {
    console.error('❌ Purchase confirmation test failed:', error);
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting email confirmation tests...\n');
  
  await testBookingConfirmation();
  console.log(''); // Add spacing
  await testPurchaseConfirmation();
  
  console.log('\n✨ Email confirmation tests completed!');
  process.exit(0);
};

runTests();