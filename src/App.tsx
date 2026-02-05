"use client"

import * as React from "react"


import { Toaster } from "./components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

// הגדרת טיפוסים בסיסיים עבור pagesConfig
interface PagesConfig {
  Pages: Record<string, React.ComponentType<any>>;
  Layout?: React.ComponentType<{ children: React.ReactNode; currentPageName: string }>;
  mainPage?: string;
}

const { Pages, Layout, mainPage } = pagesConfig as PagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => <></>;

interface LayoutWrapperProps {
  children: React.ReactNode;
  currentPageName: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, currentPageName }) => {
  if (Layout) {
    return <Layout currentPageName={currentPageName}>{children}</Layout>;
  }
  return <>{children}</>;
};

const AuthenticatedApp: React.FC = () => {

  return (
    <Routes>
      {/* דף הבית */}
      <Route 
        path="/" 
        element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } 
      />

      {/* מיפוי שאר הדפים */}
      {Object.entries(Pages).map(([path, PageComponent]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <PageComponent />
            </LayoutWrapper>
          }
        />
      ))}

      {/* דף 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
  );
}

export default App;