// src/pages.config.ts
import LeadForm from './pages/LeadForm';
import React from 'react';

// הגדרת הטיפוס של הקונפיגורציה
interface PagesConfig {
  mainPage: string;
  Pages: Record<string, React.ComponentType<any>>;
  Layout?: React.ComponentType<{ children: React.ReactNode; currentPageName: string }> | null;
}

export const PAGES: Record<string, React.ComponentType<any>> = {
    "LeadForm": LeadForm,
};

export const pagesConfig: PagesConfig = {
    mainPage: "LeadForm",
    Pages: PAGES,
    Layout: null, // עכשיו TS יודע שזה יכול להיות null
};