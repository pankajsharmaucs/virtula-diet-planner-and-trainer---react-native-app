import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper'; // Import the Provider
import AppNavigator from './navigation/AppNavigator'; // Your AppNavigator component
import store from './src/redux/store'; // Import the Redux store
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>  {/* Wrap your AppNavigator with PaperProvider */}
        <AppNavigator /> {/* Your navigation structure */}
      </PaperProvider>
    </Provider>
  );
}
