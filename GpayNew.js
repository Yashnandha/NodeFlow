import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {PaymentRequest} from '@google/react-native-make-payment';

const GpayNew = () => {
  const paymentDetails = {
    total: {
      amount: {
        currency: 'USD',
        value: '14.95',
      },
    },
  };

  const googlePayRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: [
            'AMEX',
            'DISCOVER',
            'INTERAC',
            'JCB',
            'MASTERCARD',
            'VISA',
          ],
        },
      },
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4TXWKODXLV',
      merchantName: 'Gopal Tailer',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: paymentDetails.total.amount.value,
      currencyCode: paymentDetails.total.amount.currency,
      countryCode: 'US',
    },
  };

  const paymentMethods = [
    {
      supportedMethods: 'google_pay',
      data: googlePayRequest,
    },
  ];

  function handleResponse(response) {
    console.log(response, 'response');
  }

  const makePayment = async () => {
    const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails);

    paymentRequest
      .canMakePayment()
      .then(canMakePayment => {
        if (canMakePayment) {
          showPaymentForm();
        } else {
          handleResponse('Google Pay unavailable');
        }
      })
      .catch(error => {
        handleResponse(`CanMakePayment error: ${error}`);
      });
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          margin: 20,
          textAlign: 'center',
        }}>
        {'Subscription :' + ' 14.95'}
      </Text>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          makePayment();
        }}
        style={styles.googlepaybuttonContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-lpwdc2CbTpVd6j4JJ2aVYFmtKD_-r-A7uQv3XdymSZPkpnQqB5lNQ6Cc1PLxPXa0cTE&usqp=CAU',
            isNetwork: true,
            shouldCache: true,
          }}
          style={styles.googlepaybutton}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>Pay With Google Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GpayNew;
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlepaybutton: {
    height: 25,
    width: 25,
  },
  googlepaybuttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
