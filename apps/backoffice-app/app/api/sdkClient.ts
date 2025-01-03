import { sdk } from '@/sdk/CommercetoolsSDK';
import { IncomingMessage } from 'http';
import { ServerOptions } from '@royalcyber/unified-commerce';

const token = 'eyJraWQiOiJtODA3bDFKQmV5Y3hObG1pM0NHWXBrUjdubno4X0xMc0NJQzlLa0s1OEdzIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjVLOUVSZXdTenVLeExkam5oMnUxQWdBYUNUYkRYSWgtVzNMUXVaRmhKUjQiLCJpc3MiOiJodHRwczovL2Rldi0zOTA0ODQ4Ny5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3MzQ3MTE0OTQsImV4cCI6MTczNDcxNTA5NCwiY2lkIjoiMG9ha3gweWMxa3V3RTRic1I1ZDciLCJzY3AiOlsicmVhZCJdLCJzdWIiOiIwb2FreDB5YzFrdXdFNGJzUjVkNyJ9.R3oQ0ACnf0ukDAw4JaRF4zhIWjCig94g_76e0Q1Kco3oSKJFAwsVObpHhIq8Umrf3eAQ72uhs2J_yX2oikJHFDkko2kaDc7ypWWAmCmiNJuMTpgXkiplivCfhrYQlP9YlArkHqGSjsJ6Sv77PLBHonCyVFhvf73QTohq4zdPK-wQYnqyxf9S39Bx0DzSQq6iMcrZn50LrV4z4qd3MMHbOSlRTaG4RnspIa2js6LEAntxfBWatCOWCdDdjwfuwgXw_yApiGnJbObOa7OAigpiUxBsPM4a9b3XlS06FOJA2IzSC18tPV6g-GYQBNqYPsGI0pQwVMfQV3iO8ThvXaazCQ'

sdk.defaultConfigure('en');

export const sdkServerOptions = {
  req: {
    headers: {
      'client-type': 'backoffice',
      locale: 'en_US',
      authorization: `Bearer ${token}`
    }
  } as unknown as IncomingMessage
} as ServerOptions;

export default sdk;
