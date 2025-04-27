import React, { useEffect, useRef } from 'react';

/**
 * React wrapper for the ML Lifecycle Visualization web component
 * 
 * Usage:
 * ```jsx
 * import MLLifecycleWrapper from './MLLifecycleWrapper';
 * 
 * function App() {
 *   return (
 *     <div className="app">
 *       <h1>My React App</h1>
 *       <MLLifecycleWrapper />
 *     </div>
 *   );
 * }
 * ```
 */
function MLLifecycleWrapper() {
  const elementRef = useRef(null);
  
  useEffect(() => {
    // Dynamically import the web component
    const loadComponent = async () => {
      try {
        // Import the web component library
        // This relies on the package being linked or installed
        const { initMLLifecycleComponent } = await import('ml-lifecycle-visualization');
        
        // Initialize the component
        initMLLifecycleComponent();
      } catch (error) {
        console.error('Failed to load ML Lifecycle component:', error);
      }
    };
    
    loadComponent();
    
    // Clean up function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []);
  
  return (
    <div className="ml-lifecycle-container" style={{ width: '100%', height: '600px' }}>
      <ml-lifecycle-visualization ref={elementRef}></ml-lifecycle-visualization>
    </div>
  );
}

export default MLLifecycleWrapper; 