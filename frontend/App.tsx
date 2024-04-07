import { StyleSheet } from 'react-native';
import { NativeRouter, Routes, Route, Navigate } from "react-router-native"
import { Login, Register, Home, UserHomePage, LoginError } from './screens';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <UserHomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
