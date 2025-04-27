import './MLLifecycleComponent';

export * from './MLLifecycleComponent';

// Also provide a function to initialize the component programmatically
export function initMLLifecycleComponent() {
  if (!customElements.get('ml-lifecycle-visualization')) {
    import('./MLLifecycleComponent');
  }
  return 'ml-lifecycle-visualization';
} 