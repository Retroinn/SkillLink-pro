import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import AddProject from './pages/AddProject';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import CreatePost from './pages/CreatePost';
import Premium from './pages/Premium';
import Analytics from './pages/Analytics';

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/add" element={<AddProject />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/blog/create" element={<CreatePost />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
);

export default App;
