/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import CropLibrary from "./pages/CropLibrary"
import CropDetail from "./pages/CropDetail"
import Community from "./pages/Community"
import MandiRates from "./pages/MandiRates"
import Logistics from "./pages/Logistics"
import Schemes from "./pages/Schemes"

export default function App() {
  return (
    <BrowserRouter basename="/KRISHIVANTA/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crops" element={<CropLibrary />} />
          <Route path="crops/:id" element={<CropDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="mandi" element={<MandiRates />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="schemes" element={<Schemes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
