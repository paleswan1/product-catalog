import AppRouting from './utils/Routing';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/clients/queryClient';
import { Provider } from 'react-redux';
import { makeStore } from './lib/store/store';

function App() {
  return (
    <Provider store={makeStore()}>
      <QueryClientProvider client={queryClient}>
        <AppRouting />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
