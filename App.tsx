import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/locales/i18n';
import { View } from 'react-native';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    i18n.init().then(() => setIsLoading(false)); // Ensure i18n is initialized before rendering
  }, []);

  if (isLoading) return null;
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n}>
          <AppNavigator />
        </I18nextProvider>
      </View>
    </Provider>
  );
};

export default App;