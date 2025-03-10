"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 15px;

  &:hover {
    background: #0056b3;
  }
`;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: { username: string; password: string }) => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.replace("/protected");
      } else {
        const resData = await response.json();
        setErrorMessage(resData.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              {...register("username")}
              placeholder="Enter your username"
            />
            {errors.username && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </FormGroup>
          <Button type="submit">Sign In</Button>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
