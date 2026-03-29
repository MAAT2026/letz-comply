import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from './components/layout/AppLayout';
import AppWrapper from './pages/AppWrapper';
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import LearnPage from './pages/LearnPage';
import CalendarPage from './pages/CalendarPage';
import ActionsPage from './pages/ActionsPage';
import ToolsPage from './pages/ToolsPage';
import FundAdvisor from './pages/FundAdvisor';
import ProfilePage from './pages/ProfilePage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import LoginPage from './pages/LoginPage';

// Authenticated inner routes — handles auth errors / loading
const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isLoadingAuth && !isLoadingPublicSettings && authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<AppWrapper />}>
           <Route index element={<Navigate to="feed" replace />} />
           <Route path="feed" element={<FeedPage />} />
           <Route path="learn" element={<LearnPage />} />
           <Route path="calendar" element={<CalendarPage />} />
           <Route path="actions" element={<ActionsPage />} />
           <Route path="tools" element={<ToolsPage />} />
           <Route path="fund-advisor" element={<FundAdvisor />} />
           <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<LandingPage />} />
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            {/* Legal pages */}
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/cookies" element={<CookiePolicyPage />} />
            {/* Authenticated app under /app/* */}
            <Route path="/app/*" element={<AuthenticatedApp />} />
            {/* Redirect legacy top-level routes to /app/* */}
            <Route path="/feed" element={<Navigate to="/app/feed" replace />} />
            <Route path="/learn" element={<Navigate to="/app/learn" replace />} />
            <Route path="/calendar" element={<Navigate to="/app/calendar" replace />} />
            <Route path="/actions" element={<Navigate to="/app/actions" replace />} />
            <Route path="/tools" element={<Navigate to="/app/tools" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  )
}

export default App