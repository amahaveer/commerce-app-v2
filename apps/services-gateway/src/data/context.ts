export const CONTEXTS: any = {
  CT: {
    environment: 'dev',
    defaultLocale: 'en_US',
    configuration: {
      clientId: 'EjO_3v41o3lbnLvCiA4mo5tJ',
      clientSecret: 'Uj9h6RrVfk1w5zRvrKn4eSATUlE-jqY4',
      projectKey: 'bonelli-2',
      authUrl: 'https://auth.us-central1.gcp.commercetools.com',
      hostUrl: 'https://api.us-central1.gcp.commercetools.com',
    },
  },
  SENDGRID: {
    sendgrid: {
      apiKey:
        'RG+dRWTOS+r6lwmIVU6wHMXoGlZG85IxoztPAQG736tlz9LY2+CEkS1swKK2sVeynlmcyubK1wez/et+1XXOqPky7y/xpFzxJ3Hr99dgQ6D8SX2vzNd/knCfd7aZyLFYu75CCgMQD30Fpa3vTQWr5AHeFcY7leFmD55dMdQYrYgO99ZAWkLHW72EJN3GvSAqVEfeEfAdlu6G+z9npbslF1OBsUsOIIC7tOilGfVxaAW0JAkXi5hRtcvMKMFeZf16nrHBycw5TdDnd+3vnXXwSF6TnkdIHkECur1ojxZhrnsfge/5Hdjc/iSrCrCjlSpjf3syjaM56dddP6NfVBPM0pI25XoMdYhhYqq+BoTKVsHNN81l1NXYsfLayMQf62a6ISma/t2Zili8xxSFZGxWHTnlmAl9w05Wee9xcIJIvoDnKDOhyf7Q9u+PqfkX6Gg4KIf9/AZDtKOL8aYcGixbuvW+wWzXS4VY/20i/g4TJD8Zqyk4CqRx5mDQGsOh9z5Tt5u48goY9tJslUkKZiIYyayNiEJdxnUmPdZ5hFHDlXikyZyDT4bYnhqRA8GwIDq2A4A+Oy/fSdiFvNJgZypfOYFoagItZwa0TRqgdkUkRGhKHp/t/IwWTt8cyOilP+gNKA+6LymrxViGHVpgrKInyJScuDJI39MNNvBtJgQ4vAo=',
      sender: 'connect-support@commercetools.com',
      client_host: 'https://poc-b2ctest7.frontend.site/',
      template_account_verification: 'D-0B3D41A307454D55BE2CE5097CBDF857',
      template_password_reset: 'D-835B96E30E6947978B44307958EFE460',
      template_order_confirmation: 'D-CD553DA56912473C9D266679DF1D06C6',
      template_welcome_customer: 'D-6C567EA4FBC4427AAAC5DD4C9263F74D',
      template_account_deletion: 'D-7E423A89D7224CD0AB891C5FB10BB8E0',
    },
  },
  CONTENTFUL: {
    contentful: {
      accessToken:
        '3d50038afea30f11997a73f887c4aa12d7d411d9da6825dabcc250b78623a530',
      previewToken:
        '7391f414d8febe45caf58672ddb65ae62b2c37d525c10205669ba57c6f47bfa6',
      spaceId: '2yke74xvylnq',
    },
  },
  PAYMENT: {
    adyen: {
      apiKey:
        'AQErhmfuXNWTK0Qc+iSTnWk1ovaYTZ9CAp9ZDTAF5fUTlH0PC2KPju69BQz0QRDBXVsNvuR83LVYjEgiTGAH-8sAbp8nUvmAIDA6l3S5ArrV+ridkFgG4ohxt5eAFuWc=-6[pcJ5LQUbwCe?6z',
      merchantAccount: 'Commercetools553ECOM',
      clientKey: 'test_7KZ5EUGTIRGTXP3JVBPKV43YW4MQ7MLZ',
      baseUrl: 'https://checkout-test.adyen.com/v69',
      hmacKey:
        'C8AA7C20B8FD92AC3402323B88219108D1BC0BBD0EF49636250BF36B4F3F1260',
    },
  },
  CLOUDINARY: {
    cloudinary: {
      apiKey: 472577853184612,
      apiSecret: 'LCbAxHWQUOZRkubMzd4aDQHnNfQ',
      autoTaggingMinConfidence: 0.8,
      autoTaggingService: '',
      cloudName: 'dlwdq84ig',
      mediaPoolName: 'royalcyberb2c',
    },
  },
  SMTP: {
    smtp: {
      host: 'smtp.eu.mailgun.org',
      port: 587,
      encryption: 'tls',
      user: 'demo-mails@mailing-dev.frontastic.cloud',
      password: '6728c0654a870556657ca6475f75f79f-2cc48b29-e8bd7f2c',
      sender: 'no-reply@frontastic.cloud',
      client_host: 'https://poc-royalcyberb2c.frontend.site',
    },
  },
};
