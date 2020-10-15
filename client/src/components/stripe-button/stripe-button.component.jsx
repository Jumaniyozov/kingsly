import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_s9qCsKErGhjYmsCGDKZ46PI700BJXwADi8';

  const onToken = token => {
    axios({
      url:'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('pay success')
    }).catch(err => {
      console.error('payment error: ', JSON.parse(err));
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Kingsly'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
