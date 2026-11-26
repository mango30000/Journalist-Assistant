import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "@/pages/auth/AuthPage";
import { EvidencePage } from "@/pages/evidence-package/EvidencePage";
import { HomePage } from "@/pages/home/HomePage";
import { BoardPage } from "@/pages/investigation-board/BoardPage";
import { InvestigationLayout } from "@/pages/investigation-board/InvestigationLayout";
import { InvestigationsPage } from "@/pages/investigations/InvestigationsPage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { MapPage } from "@/pages/relationship-map/MapPage";
import { SourcePage } from "@/pages/source/SourcePage";
import { TimelinePage } from "@/pages/timeline/TimelinePage";
import { AppLayout } from "./layout/AppLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <AuthPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/investigations", element: <InvestigationsPage /> },
          {
            path: "/investigations/:id",
            element: <InvestigationLayout />,
            children: [
              { index: true, element: <BoardPage /> },
              { path: "sources/:sourceId", element: <SourcePage /> },
              { path: "map", element: <MapPage /> },
              { path: "timeline", element: <TimelinePage /> },
              { path: "evidence", element: <EvidencePage /> },
            ],
          },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
