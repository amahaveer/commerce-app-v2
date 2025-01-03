import { SDK } from '@royalcyber/unified-commerce';
import { getLocalizationInfo } from './project.config';
import {
  ComposableCommerce,
  ComposableCommerceEvents,
} from './composable-commerce';

// Add other integration's custom events to the SDK's generic type here,
// by extending ComposableCommerceEvents with their type using an intersection.
// For example, <ComposableCommerceEvents & OtherEvents>.
// You may also wish to add your own custom events.
class CommercetoolsSDK extends SDK<ComposableCommerceEvents> {
  composableCommerce!: ComposableCommerce;
  // Add any other integrations here.

  constructor() {
    super();
    this.composableCommerce = new ComposableCommerce(this);
    // Initialize your other integrations here.

    this.on('errorCaught', (event) => {
      // Globally handle any errors caught by the SDK and integrations. For
      // example, log error, fire notification, etc.
      console.log('SDK error: ', event.data);
    });

    // Set up any other custom global event handlers here.
    // Ensure types are created and added to the SDK generic type
    // if specific to your project.
  }

  // A simplified, reusable method for configuring the SDK, as for
  // most cases only the locale and currency require input from runtime, or
  // may change on user input.
  defaultConfigure(localeString: string) {
    const { locale, currency } = getLocalizationInfo(localeString);

    sdk.configure({
      locale,
      currency,
      endpoint: 'http://localhost:4000/ct/action',
      extensionVersion: 'dev',
    });
  }
} 

// Create a single instance of the sdk.
const sdk = new CommercetoolsSDK();

// Export only the instance to serve as a singleton throughout
// the project.
export { sdk };
