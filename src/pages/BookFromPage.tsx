import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Book } from "../types";
import { addBook, getBookById, updateBook } from "../services/bookServices";
import toast from "react-hot-toast";

const BookFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState<Book>({
    title: "",
    author: "",
    genre: "",
    year: new Date().getFullYear(),
    status: "Available",
  });

  useEffect(() => {
    if (isEdit && id) {
      getBookById(id).then(setInitialValues);
    }
  }, [id, isEdit]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      genre: Yup.string().required("Required"),
      year: Yup.number().min(1900).max(2100).required("Required"),
      status: Yup.string().oneOf(["Available", "Issued"]).required(),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit && id) {
          await updateBook(id, values);
          toast.success("Book updated");
        } else {
          await addBook(values);
          toast.success("Book added");
        }
        navigate("/");
      } catch (error) {
        toast.error("Operation failed");
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      maxWidth="sm"
      mx="auto"
      mt={4}
    >
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Edit Book" : "Add Book"}
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        {...formik.getFieldProps("title")}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        {...formik.getFieldProps("author")}
        error={formik.touched.author && Boolean(formik.errors.author)}
        helperText={formik.touched.author && formik.errors.author}
      />
      <TextField
        select
        fullWidth
        margin="normal"
        label="Genre"
        {...formik.getFieldProps("genre")}
        error={formik.touched.genre && Boolean(formik.errors.genre)}
        helperText={formik.touched.genre && formik.errors.genre}
      >
        <MenuItem value="Fiction">Fiction</MenuItem>
        <MenuItem value="Mystery">Mystery</MenuItem>
        <MenuItem value="Thriller">Thriller</MenuItem>
        <MenuItem value="Classic">Classic</MenuItem>
        <MenuItem value="Psychology">Psychology</MenuItem>
      </TextField>
      <TextField
        type="number"
        fullWidth
        margin="normal"
        label="Published Year"
        {...formik.getFieldProps("year")}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
      />
      <TextField
        select
        fullWidth
        margin="normal"
        label="Status"
        {...formik.getFieldProps("status")}
        error={formik.touched.status && Boolean(formik.errors.status)}
        helperText={formik.touched.status && formik.errors.status}
      >
        <MenuItem value="Available">Available</MenuItem>
        <MenuItem value="Issued">Issued</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {isEdit ? "Update Book" : "Add Book"}
      </Button>
    </Box>
  );
};

export default BookFormPage;
