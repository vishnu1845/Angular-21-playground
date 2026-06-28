import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      // Default Redirect
      {
        path: '',
        redirectTo: 'fundamentals/data-binding',
        pathMatch: 'full'
      },

      // ==================== FUNDAMENTALS ====================
      {
        path: 'fundamentals/data-binding',
        loadComponent: () => import('./features/fundamentals/data-binding/data-binding')
          .then(m => m.DataBinding)
      },
      {
        path: 'fundamentals/directives',
        loadComponent: () => import('./features/fundamentals/directives/directives')
          .then(m => m.Directives)
      },
      {
        path: 'fundamentals/pipes',
        loadComponent: () => import('./features/fundamentals/pipes/pipes')
          .then(m => m.Pipes)
      },

      // ==================== FORMS ====================
      {
        path: 'forms/template-basic',
        loadComponent: () => import('./features/forms/template-basic/template-basic')
          .then(m => m.TemplateBasic)
      },
      {
        path: 'forms/template-validation',
        loadComponent: () => import('./features/forms/template-validation/template-validation')
          .then(m => m.TemplateValidation)
      },
      {
        path: 'forms/reactive-basic',
        loadComponent: () => import('./features/forms/reactive-basic/reactive-basic')
          .then(m => m.ReactiveBasic)
      },
      {
        path: 'forms/reactive-validation',
        loadComponent: () => import('./features/forms/reactive-validation/reactive-validation')
          .then(m => m.ReactiveValidation)
      },
      {
        path: 'forms/dynamic-forms',
        loadComponent: () => import('./features/forms/dynamic-forms/dynamic-forms')
          .then(m => m.DynamicForms)
      },
      {
        path: 'forms/order-dynamically',
        loadComponent: () => import('./features/forms/order-dynamically/order-dynamically')
          .then(m => m.OrderDynamically)
      },
      {
        path: 'forms/custom-validators',
        loadComponent: () => import('./features/forms/custom-validators/custom-validators')
          .then(m => m.CustomValidators)
      },
      {
        path: 'forms/signal-forms',
        loadComponent: () => import('./features/forms/signal-forms/signal-forms')
          .then(m => m.SignalForms)
      },
      {
        path: 'forms/signal-form-validation',
        loadComponent: () => import('./features/forms/signal-form-validation/signal-form-validation')
          .then(m => m.SignalFormValidation)
      },

      // ==================== SERVICES ====================
      {
        path: 'services/service-demo',
        loadComponent: () => import('./features/services/service-demo/service-demo')
          .then(m => m.ServiceDemo)
      },
      {
        path: 'services/crud',
        loadComponent: () => import('./features/services/crud/crud')
          .then(m => m.Crud)
      },
      {
        path: 'services/real-crud',
        loadComponent: () => import('./features/services/real-crud/real-crud')
          .then(m => m.RealCrud)
      },

      // ==================== HTTP ====================
      {
        path: 'http/crud',
        loadComponent: () => import('./features/http/crud/crud')
          .then(m => m.Crud)
      },
      {
        path: 'http/api-calls',
        loadComponent: () => import('./features/http/api-calls/api-calls')
          .then(m => m.ApiCalls)
      },
      {
        path: 'http/interceptors',
        loadComponent: () => import('./features/http/interceptors/interceptors')
          .then(m => m.Interceptors)
      },
      {
        path: 'http/error-handling',
        loadComponent: () => import('./features/http/error-handling/error-handling')
          .then(m => m.ErrorHandling)
      },
      {
        path: 'http/async-promises',
        loadComponent: () => import('./features/http/async-promises/async-promises')
          .then(m => m.AsyncPromises)
      },

      // ==================== RXJS ====================
      {
        path: 'rxjs/observables',
        loadComponent: () => import('./features/rxjs/observables/observables')
          .then(m => m.Observables)
      },
      {
        path: 'rxjs/subjects',
        loadComponent: () => import('./features/rxjs/subjects/subjects')
          .then(m => m.Subjects)
      },
      {
        path: 'rxjs/operators',
        loadComponent: () => import('./features/rxjs/operators/operators')
          .then(m => m.Operators)
      },
      {
        path: 'rxjs/api-stream',
        loadComponent: () => import('./features/rxjs/api-stream/api-stream')
          .then(m => m.ApiStream)
      },

      // ==================== ROUTING ====================
      {
        path: 'routing/basic-routing',
        loadComponent: () => import('./features/routing/basic-routing/basic-routing')
          .then(m => m.BasicRouting)
      },
      {
        path: 'routing/route-params',
        loadComponent: () => import('./features/routing/route-params/route-params')
          .then(m => m.RouteParams)
      },
      {
        path: 'routing/guards',
        loadComponent: () => import('./features/routing/guards/guards')
          .then(m => m.Guards)
      },
      {
        path: 'routing/lazy-loading',
        loadComponent: () => import('./features/routing/lazy-loading/lazy-loading')
          .then(m => m.LazyLoading)
      },

      // ==================== STATE ====================
      {
        path: 'state/signals-store',
        loadComponent: () => import('./features/state/signals-store/signals-store')
          .then(m => m.SignalsStore)
      },
      {
        path: 'state/signal-inputs',
        loadComponent: () => import('./features/state/signal-inputs/signal-inputs')
          .then(m => m.SignalInputs)
      },
      {
        path: 'state/ngrx-basics',
        loadComponent: () => import('./features/state/ngrx-basics/ngrx-basics')
          .then(m => m.NgrxBasics)
      },

      // ==================== LIFECYCLE ====================
      {
        path: 'lifecycle/lifecycle-hooks',
        loadComponent: () => import('./features/lifecycle/lifecycle-hooks/lifecycle-hooks')
          .then(m => m.LifecycleHooks)
      },
      {
        path: 'lifecycle/component-lifecycle-demo',
        loadComponent: () => import('./features/lifecycle/component-lifecycle-demo/component-lifecycle-demo')
          .then(m => m.ComponentLifecycleDemo)
      },
      
      // ==================== COMPONENT COMM ====================
      {
        path: 'component-comm/parent-child',
        loadComponent: () => import('./features/component-comm/parent/parent')
          .then(m => m.Parent)
      },
      {
        path: 'component-comm/view-child',
        loadComponent: () => import('./features/component-comm/view-child/view-child')
          .then(m => m.ViewChild)
      },
      {
        path: 'component-comm/view-children',
        loadComponent: () => import('./features/component-comm/view-children/view-children')
          .then(m => m.ViewChildren)
      },
      {
        path: 'component-comm/service-comm',
        loadComponent: () => import('./features/component-comm/service-comm/service-comm')
          .then(m => m.ServiceComm)
      },
      {
        path: 'component-comm/signal-comm',
        loadComponent: () => import('./features/component-comm/signal-comm/signal-comm')
          .then(m => m.SignalComm)
      },
      {
        path: 'component-comm/route-comm',
        loadComponent: () => import('./features/component-comm/route-comm/route-comm')
          .then(m => m.RouteComm)
      },

      // ==================== AUTH ====================
      {
        path: 'auth/jwt-login',
        loadComponent: () => import('./features/auth/jwt-login/jwt-login')
          .then(m => m.JwtLogin)
      },
      {
        path: 'auth/route-protection',
        loadComponent: () => import('./features/auth/route-protection/route-protection')
          .then(m => m.RouteProtection),
        canActivate: [authGuard]   // 🔒 add this line
      },
      // ==================== PERFORMANCE ====================
      {
        path: 'performance/trackby',
        loadComponent: () => import('./features/performance/trackby/trackby')
          .then(m => m.Trackby)
      },
      {
        path: 'performance/deferred-loading',
        loadComponent: () => import('./features/performance/deferred-loading/deferred-loading')
          .then(m => m.DeferredLoading)
      },
      {
        path: 'performance/optimization',
        loadComponent: () => import('./features/performance/optimization/optimization')
          .then(m => m.Optimization)
      },

      // ==================== UI ====================
      {
        path: 'ui/bootstrap',
        loadComponent: () => import('./features/ui/bootstrap/bootstrap')
          .then(m => m.Bootstrap)
      },
      {
        path: 'ui/angular-material',
        loadComponent: () => import('./features/ui/angular-material/angular-material')
          .then(m => m.AngularMaterial)
      },
      {
        path: 'ui/primeng',
        loadComponent: () => import('./features/ui/primeng/primeng')
          .then(m => m.Primeng)
      },

      // ==================== ARCHITECTURE ====================
      {
        path: 'architecture/feature-structure',
        loadComponent: () => import('./features/architecture/feature-structure/feature-structure')
          .then(m => m.FeatureStructure)
      },
      {
        path: 'architecture/micro-frontend',
        loadComponent: () => import('./features/architecture/micro-frontend/micro-frontend')
          .then(m => m.MicroFrontend)
      },

      // ==================== EXTRAS ====================
      {
        path: 'extras/employee-search',
        loadComponent: () => import('./features/extras/employee-search/employee-search')
          .then(m => m.EmployeeSearch)
      },
      {
        path: 'extras/todo',
        loadComponent: () => import('./features/extras/todo/todo')
          .then(m => m.Todo)
      },
      {
        path: 'extras/debugging',
        loadComponent: () => import('./features/extras/debugging/debugging')
          .then(m => m.Debugging)
      },
      {
        path: 'extras/migration',
        loadComponent: () => import('./features/extras/migration/migration')
          .then(m => m.Migration)
      },
      {
        path: 'extras/css-preprocessors',
        loadComponent: () => import('./features/extras/css-preprocessors/css-preprocessors')
          .then(m => m.CssPreprocessors)
      },

      // Pages
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home')
          .then(m => m.Home)
      }
    ]
  },

  // ==================== OUTSIDE LAYOUT ====================
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login')
      .then(m => m.Login)
  },

  // 404 Page
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found')
      .then(m => m.NotFound)
  }
];