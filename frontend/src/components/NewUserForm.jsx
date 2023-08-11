import { DevTool } from "@hookform/devtools";
import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const NewUserForm = ({ onSubmitNewUser }) => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmitNewUser)}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <TextField
        sx={{ marginTop: "5px" }}
        size="small"
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Name is required",
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        size="small"
        type="email"
        placeholder="Email"
        {...register("email", {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
          required: "Email is required",
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        size="small"
        type="text"
        placeholder="Mobile"
        {...register("mobile", {
          required: "Mobile Number is required",
          minLength: {
            value: 8,
            message: "At least 8 characters",
          },
          pattern: {
            value: /^[0-9]*$/,
            message: "Only numbers allowed",
          },
        })}
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
      />
      <TextField
        size="small"
        type="date"
        placeholder="Join Date"
        {...register("date", {
          required: "Date is required",
          valueAsDate: true,
        })}
        error={!!errors.date}
        helperText={errors.date?.message}
      />
      <TextField
        size="small"
        type="number"
        placeholder="Orders"
        {...register("orders", {
          required: "Orders is required",
          valueAsNumber: true,
        })}
        error={!!errors.orders}
        helperText={errors.orders?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <DevTool control={control} />
    </form>
  );
};

export default NewUserForm;
