import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import './index.css';
import App from './App';
import TrainingPage from './pages/TrainingPage';
import TrilhaPage from './pages/TrilhaPage';

const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Lector' },
    ],
  }),
  notFoundComponent: () => <div>Página não encontrada.</div>,
  component: () => (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const trainingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'treinamento/$id',
  component: TrainingPage,
});

const trilhaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'trilha',
  component: TrilhaPage,
});

const trilhaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'trilha/$id',
  component: TrilhaPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  trainingRoute,
  trilhaRoute,
  trilhaDetailRoute,
]);

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}