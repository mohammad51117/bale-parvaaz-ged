/* Atlas Study Hall: route structure separates the quiet study desk, subject libraries, and focused standalone readers. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SubjectPage from "./pages/SubjectPage";
import QuestionReader from "./pages/QuestionReader";
import StudyMap from "./pages/StudyMap";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/subject/:slug" component={SubjectPage} />
    <Route path="/study-map" component={StudyMap} />
    <Route path="/reader/:groupId" component={QuestionReader} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
