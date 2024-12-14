import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
//
//
//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <QueryClientProvider client={queryClient}>
            <Toaster
              visibleToasts={1}
              position="top-right"
              richColors
              closeButton={true}
            />
            <App />
          </QueryClientProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </>
  </StrictMode>
);
