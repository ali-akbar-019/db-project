import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import AboutPage from "./page/AboutPage";
import AdminHomePage from "./page/Admin/HomePage";
import Categories from "./page/Categories";
import ContactPage from "./page/ContactPage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";
import SingleCategoryPage from "./page/SingleCategoryPage";
import SingleProductPage from "./page/SingleProductPage";
import AdminLayout from "./layouts/AdminLayout";
import ErrorPage from "./page/ErrorPage";
import ProductsPage from "./page/ProductsPage";
import AdminProductsPage from "./page/Admin/ProductsPage";
import AdminCustomersPage from "./page/Admin/CustomersPage";
import AdminSettingsPage from "./page/Admin/SettingsPage";
import VisualsPage from "./page/Admin/VisualsPage";
import AuthCallbackPage from "./page/AuthCallbackPage";
import OrdersPage from "./page/Admin/OrdersPage";
import FavItems from "./page/FavProductsPage";
import DataTable from "./page/BillingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        {/*  */}
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        {/*  */}
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
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/categories/:cat"
          element={
            <Layout>
              <SingleCategoryPage />
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
              <DataTable />
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
        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminHomePage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <AdminProductsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminLayout>
              <AdminCustomersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrdersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/visuals"
          element={
            <AdminLayout>
              <VisualsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <AdminSettingsPage />
            </AdminLayout>
          }
        />
        {/*  */}
        <Route
          path="/fav-products"
          element={
            <Layout>
              <FavItems />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
