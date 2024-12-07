import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import ContactPage from "./page/ContactPage";
import ProfilePage from "./page/ProfilePage";
import ProductsPage from "./page/ProductsPage";
import SingleProductPage from "./page/SingleProductPage";
import BillingPage from "./page/BillingPage";
import AdminHomePage from "./page/Admin/HomePage";
import { Layout } from "./layouts/Layout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Layout>
                <SingleProductPage />
              </Layout>
            }
          />
          <Route
            path="/billing"
            element={
              <Layout>
                <BillingPage />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminHomePage />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <p>404 Not Found!</p>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
