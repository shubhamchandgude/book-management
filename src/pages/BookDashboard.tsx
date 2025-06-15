import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { getBooks } from "../services/bookServices";
import { type Book } from "../types";

const BookDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  console.log(search, "search");
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let result = books;
    if (search) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genre) {
      result = result.filter((b) => b.genre === genre);
    }
    if (status) {
      result = result.filter((b) => b.status === status);
    }
    setFiltered(result);
  }, [search, genre, status, books]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            size="small"
            label="Search by Title or Author"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Select
            size="small"
            fullWidth
            displayEmpty
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Mystery">Mystery</MenuItem>
            <MenuItem value="Thriller">Thriller</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
            <MenuItem value="Psychology">Psychology</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Select
            fullWidth
            size="small"
            displayEmpty
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 12 }} display={"flex"} justifyContent={"end"}>
          <Button
            sx={{ width: { xs: "100%", md: "20%" } }}
            variant="contained"
            onClick={() => navigate("/add")}
          >
            Add Book
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Grid container spacing={2}>
            {filtered.slice(page * 10, page * 10 + 10).map((book) => (
              <Grid size={{ xs: 12, md: 6 }} key={book.id}>
                <BookCard book={book} refresh={fetchBooks} />
              </Grid>
            ))}
          </Grid>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(newPage: any) => setPage(newPage)}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
          />
        </Box>
      )}
    </Box>
  );
};

export default BookDashboard;
