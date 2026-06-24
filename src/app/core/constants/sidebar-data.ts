export const SIDEBAR_DATA = [
  {
    title: 'Fundamentals',
    icon: 'bi bi-grid',
    isOpen: true,
    children: [
      { label: 'Data Binding', route: '/fundamentals/data-binding' },
      { label: 'Directives', route: '/fundamentals/directives' },
      { label: 'Pipes', route: '/fundamentals/pipes' },
    ]
  },

  {
    title: 'Forms',
    icon: 'bi bi-ui-checks',
    isOpen: false,
    children: [
      { label: 'Template Basic', route: '/forms/template-basic' },
      { label: 'Template Validation', route: '/forms/template-validation' },
      { label: 'Reactive Basic', route: '/forms/reactive-basic' },
      { label: 'Reactive Validation', route: '/forms/reactive-validation' },
      { label: 'Dynamic Forms', route: '/forms/dynamic-forms' },
      { label: 'Order Dynamically', route: '/forms/order-dynamically' },
      { label: 'Custom Validators', route: '/forms/custom-validators' },
      { label: 'Signal Form', route: '/forms/signal-forms' },
      { label: 'Signal Form Validation', route: '/forms/signal-form-validation' },
    ]
  },

  {
    title: 'Lifecycle',
    icon: 'bi bi-clock-history',
    isOpen: false,
    children: [
      { label: 'Lifecycle Hooks', route: '/lifecycle/lifecycle-hooks' },
      { label: 'Component Lifecycle Demo', route: '/lifecycle/component-lifecycle-demo' }
    ]
  },
  
  {
    title: 'Services',
    icon: 'bi bi-gear',
    isOpen: false,
    children: [
      { label: 'Service Demo', route: '/services/service-demo' },
      { label: 'Services Local CRUD', route: '/services/crud' },
      { label: 'Services CRUD', route: '/services/real-crud' }
    ]
  },

  {
    title: 'HTTP',
    icon: 'bi bi-cloud',
    isOpen: false,
    children: [
      { label: 'CRUD', route: '/http/crud' },
      { label: 'API Calls', route: '/http/api-calls' },
      { label: 'Interceptors', route: '/http/interceptors' },
      { label: 'Error Handling', route: '/http/error-handling' },
      { label: 'Async & Promises', route: '/http/async-promises' }
    ]
  },

  {
    title: 'RxJS',
    icon: 'bi bi-arrow-repeat',
    isOpen: false,
    children: [
      { label: 'Observables', route: '/rxjs/observables' },
      { label: 'Subjects', route: '/rxjs/subjects' },
      { label: 'Operators', route: '/rxjs/operators' },
      { label: 'API Stream', route: '/rxjs/api-stream' }
    ]
  },

  {
    title: 'Routing',
    icon: 'bi bi-link-45deg',
    isOpen: false,
    children: [
      { label: 'Basic Routing', route: '/routing/basic-routing' },
      { label: 'Route Params', route: '/routing/route-params' },
      { label: 'Guards', route: '/routing/guards' },
      { label: 'Lazy Loading', route: '/routing/lazy-loading' }
    ]
  },

  {
    title: 'State Management',
    icon: 'bi bi-diagram-3',
    isOpen: false,
    children: [
      { label: 'Signals Store', route: '/state/signals-store' },
      { label: 'Signal Inputs', route: '/state/signal-inputs' },
      { label: 'NgRx Basics', route: '/state/ngrx-basics' }
    ]
  },

  {
    title: 'Authentication',
    icon: 'bi bi-shield-lock',
    isOpen: false,
    children: [
      { label: 'JWT Login', route: '/auth/jwt-login' },
      { label: 'Route Protection', route: '/auth/route-protection' }
    ]
  },

  {
    title: 'Performance',
    icon: 'bi bi-speedometer2',
    isOpen: false,
    children: [
      { label: 'TrackBy', route: '/performance/trackby' },
      { label: 'Deferred Loading', route: '/performance/deferred-loading' },
      { label: 'Optimization', route: '/performance/optimization' }
    ]
  },

  {
    title: 'UI Components',
    icon: 'bi bi-palette',
    isOpen: false,
    children: [
      { label: 'Bootstrap', route: '/ui/bootstrap' },
      { label: 'Angular Material', route: '/ui/angular-material' },
      { label: 'PrimeNG', route: '/ui/primeng' }
    ]
  },

  {
    title: 'Architecture',
    icon: 'bi bi-diagram-2',
    isOpen: false,
    children: [
      { label: 'Feature Structure', route: '/architecture/feature-structure' },
      { label: 'Micro Frontend', route: '/architecture/micro-frontend' }
    ]
  },

  {
    title: 'Extras',
    icon: 'bi bi-tools',
    isOpen: false,
    children: [
      { label: 'ToDo List', route: '/extras/todo' },
      { label: 'Employee Search', route: '/extras/employee-search' },
      { label: 'Debugging', route: '/extras/debugging' },
      { label: 'Migration', route: '/extras/migration' },
      { label: 'CSS Preprocessors', route: '/extras/css-preprocessors' }
    ]
  }
];