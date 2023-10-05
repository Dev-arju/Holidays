import { Routes, Route } from "react-router-dom";

/** Pages */
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";

// provider
import ProviderAuth from "./pages/Provider/ProviderAuth";
import Register from "./pages/Provider/Register";
import ResetPassword from "./pages/Provider/ResetPassword";
import NewPassword from "./pages/Provider/NewPassword";
import ProviderDashboard from "./pages/Provider/Dashboard";
import ProviderPackages from "./pages/Provider/Packages";
import AddPackage from "./pages/Provider/AddPackage";
import EditPackage from "./pages/Provider/EditPackage";
import ProviderProperties from "./pages/Provider/Properties";
import EditProperty from "./pages/Provider/EditProperty";
import AddProperty from "./pages/Provider/AddProperty";
import PriceOption from "./pages/Provider/PriceOption";
import EditPriceOption from "./pages/Provider/EditPriceOption";

// admin
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminAuth from "./pages/Admin/Auth";

/** Components */
import NotFound from "./components/NotFound";
import UserAuthenticated from "./components/UserAuthenticated";
import ProviderPrivateRoutes from "./components/Provider/PrivateRoutes";
import AdminPrivateRoutes from "./components/admin/PrivateRoutes";
import PersonalInfo from "./components/Provider/PersonalInfo";
import BussinessInfo from "./components/Provider/BussinessInfo";
import Packages from "./pages/Packages";

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="packages" element={<Packages />} />

        <Route element={<UserAuthenticated />}>
          <Route path="auth" element={<UserLogin />} />
          <Route path="register" element={<UserSignUp />} />
        </Route>
      </Route>

      {/* Provider Routes */}
      <Route path="/provider">
        <Route element={<ProviderPrivateRoutes />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="packages" element={<ProviderPackages />} />
          <Route path="packages/add" element={<AddPackage />} />
          <Route path="packages/edit/:docId" element={<EditPackage />} />
          <Route path="properties" element={<ProviderProperties />} />
          <Route path="properties/add" element={<AddProperty />} />
          <Route
            path="properties/add/price-options/:docId"
            element={<PriceOption />}
          />
          <Route path="properties/edit/:docId" element={<EditProperty />} />
          <Route
            path="properties/edit/price-options/:docId"
            element={<EditPriceOption />}
          />
        </Route>
        <Route path="auth" element={<ProviderAuth />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="reset/:id" element={<NewPassword />} />
        <Route path="register" element={<Register />}>
          <Route index element={<PersonalInfo />} />
          <Route path="bussiness/:providerId" element={<BussinessInfo />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <Route element={<AdminPrivateRoutes />}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="auth" element={<AdminAuth />} />
      </Route>
      {/** Page Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
