"use client";
import Image from "next/image";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import About from "./pages/About";
import Team from "./pages/Team";
import Blog from "./pages/Blog";

// import components
import Navbar from "../components/Navbar";
import BlogNavbar from "../components/BlogNavbar";

export default function Home() {
  return (
    <BrowserRouter>
      <BlogNavbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
