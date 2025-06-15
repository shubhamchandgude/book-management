import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import BookDashboard from "./pages/BookDashboard";
import BookFormPage from "./pages/BookFromPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Container sx={{ minWidth: "70%" }}>
        <Typography variant="h4" mt={2} mb={2} align="center">
          Book Management Dashboard
        </Typography>
        <Routes>
          <Route path="/" element={<BookDashboard />} />
          <Route path="/add" element={<BookFormPage />} />
          <Route path="/edit/:id" element={<BookFormPage />} />
        </Routes>
        <Toaster position="top-right" />
      </Container>
    </Router>
  );
}

export default App;
