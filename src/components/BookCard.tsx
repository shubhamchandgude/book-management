import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { type Book } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../services/bookServices";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  book: Book;
  refresh: () => void;
}

const BookCard = ({ book, refresh }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(book.id!);
      toast.success("Book deleted");
      refresh();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>Genre: {book.genre}</Typography>
        <Typography>Year: {book.year}</Typography>
        <Typography>Status: {book.status}</Typography>
        <Box mt={2} display="flex" gap={1}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/edit/${book.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BookCard;
