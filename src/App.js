// src/App.js
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { recoilPersist } from 'recoil-persist'; 
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import the default styles
import Home from './pages/Home';

const queryClient = new QueryClient();
const { persistAtom } = recoilPersist();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading products...</div>}>
          <div className="App">
            <h1 className="text-center text-3xl font-bold my-4">E-Commerce Store</h1>
            <Home/>
          </div>
        </Suspense>
      </QueryClientProvider>

      {/* Add ToastContainer to display notifications */}
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
