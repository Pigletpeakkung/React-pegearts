import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
              
              {!isLoading && (
                <>
                  <Header />
                  <main>
                    <Hero />
                    {/* Add more sections here later */}
                  </main>
                </>
              )}
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
