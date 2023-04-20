import { createBrowserRouter } from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import HomePage from './homepage/HomePage';
import AppRoot from '../AppRoot';
import AuthorPanel from './AuthorPanel/AuthorPanel';
import ArticlePage from './articlePage/ArticlePage';
import ArticlePost from '../components/article/ArticlePost';
import ProfilePage from './profilePage/ProfilePage';
import CreateArticleForm from '../components/authorpanel/CreateArticleForm';
import CreateTagForm from '../components/authorpanel/CreateTagForm';

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        element: <AuthPage />,
        children: [
          { path: '/login', element: <LoginForm /> },
          { path: '/register', element: <RegisterForm /> }
        ]
      },
      { element: <HomePage />, path: '/' },
      {
        element: <AuthorPanel />,
        path: '/authorPanel',
        children: [
          { element: <CreateArticleForm />, path: 'createArticle' },
          { element: <CreateTagForm />, path: 'createTag' }
        ]
      },
      {
        element: <ArticlePage />,
        path: '/article',
        children: [{ element: <ArticlePost />, path: ':id' }]
      },
      { element: <ProfilePage />, path: '/profile/:username' }
    ]
  }
]);

export default router;
