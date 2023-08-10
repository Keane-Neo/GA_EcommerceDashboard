import { DevTool } from "@hookform/devtools";
import { Button, Input, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewProductForm = ({ onSubmitNewProduct }) => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const [imageFile, setImageFile] = useState([]);

  const handleUpload = (e) => {
    setImageFile(e.target.files[0]);
    console.log(imageFile);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitNewProduct)}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "80%",
      }}
    >
      <TextField
        sx={{ marginTop: "5px" }}
        size="small"
        type="text"
        label="description"
        {...register("description", {
          required: "description is required",
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        size="small"
        type="number"
        label="price"
        {...register("price", {
          required: "price is required",
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <Stack direction={"column"}>
        <Typography variant="h4" fontSize="1rem">
          Photo
        </Typography>
        <Input type="file" onChange={handleUpload}></Input>
      </Stack>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <DevTool control={control} />
    </form>
  );
};

export default NewProductForm;
