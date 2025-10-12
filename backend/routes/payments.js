const express = require('express');
const router = express.Router();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;

// Authorize.net payment processing
router.post('/process', async (req, res) => {
  const { amount, cardNumber, expirationDate, cardCode, firstName, lastName, email } = req.body;
  
  // Authorize.net API credentials
  const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID || '';
  const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY || '';
  const environment = process.env.AUTHORIZENET_ENVIRONMENT || 'sandbox';
  
  try {
    // Validate credentials
    if (!apiLoginId || !transactionKey) {
      return res.status(400).json({ 
        error: 'Payment gateway not configured. Please add Authorize.net API credentials.' 
      });
    }

    // Validate required fields
    if (!amount || !cardNumber || !expirationDate || !cardCode) {
      return res.status(400).json({ 
        error: 'Missing required payment fields' 
      });
    }

    // Set API endpoint based on environment
    if (environment === 'production') {
      SDKConstants.endpoint = 'https://api.authorize.net/xml/v1/request.api';
    } else {
      SDKConstants.endpoint = 'https://apitest.authorize.net/xml/v1/request.api';
    }

    // Create merchant authentication
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginId);
    merchantAuthenticationType.setTransactionKey(transactionKey);

    // Create credit card data
    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expirationDate);
    creditCard.setCardCode(cardCode);

    // Create payment type
    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Create customer data (optional but recommended)
    const customerData = new ApiContracts.CustomerDataType();
    customerData.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
    if (email) {
      customerData.setEmail(email);
    }

    // Create billing address (optional)
    const billTo = new ApiContracts.CustomerAddressType();
    if (firstName) billTo.setFirstName(firstName);
    if (lastName) billTo.setLastName(lastName);

    // Create transaction request
    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);
    transactionRequestType.setCustomer(customerData);
    if (firstName || lastName) {
      transactionRequestType.setBillTo(billTo);
    }

    // Create the API request
    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    // Execute the transaction
    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    ctrl.execute(function() {
      const apiResponse = ctrl.getResponse();
      const response = new ApiContracts.CreateTransactionResponse(apiResponse);

      if (response != null) {
        if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
          if (response.getTransactionResponse().getMessages() != null) {
            // Success
            return res.json({
              success: true,
              transactionId: response.getTransactionResponse().getTransId(),
              responseCode: response.getTransactionResponse().getResponseCode(),
              messageCode: response.getTransactionResponse().getMessages().getMessage()[0].getCode(),
              description: response.getTransactionResponse().getMessages().getMessage()[0].getDescription(),
              authCode: response.getTransactionResponse().getAuthCode(),
              amount: amount
            });
          } else {
            // Transaction failed
            if (response.getTransactionResponse().getErrors() != null) {
              return res.status(400).json({
                success: false,
                error: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
                errorCode: response.getTransactionResponse().getErrors().getError()[0].getErrorCode()
              });
            }
          }
        } else {
          // Transaction failed
          if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
            return res.status(400).json({
              success: false,
              error: response.getTransactionResponse().getErrors().getError()[0].getErrorText(),
              errorCode: response.getTransactionResponse().getErrors().getError()[0].getErrorCode()
            });
          } else {
            return res.status(400).json({
              success: false,
              error: response.getMessages().getMessage()[0].getText(),
              errorCode: response.getMessages().getMessage()[0].getCode()
            });
          }
        }
      } else {
        return res.status(500).json({
          success: false,
          error: 'No response from payment gateway'
        });
      }
    });

  } catch (err) {
    console.error('Payment processing error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Payment processing failed: ' + err.message 
    });
  }
});

// Test endpoint to verify Authorize.Net configuration
router.get('/test-config', (req, res) => {
  const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID;
  const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;
  const environment = process.env.AUTHORIZENET_ENVIRONMENT || 'sandbox';
  
  res.json({
    configured: !!(apiLoginId && transactionKey),
    environment: environment,
    hasApiLoginId: !!apiLoginId,
    hasTransactionKey: !!transactionKey
  });
});

module.exports = router;
