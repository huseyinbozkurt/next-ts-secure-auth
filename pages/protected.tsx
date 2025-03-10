"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

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

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #d9534f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 15px;

  &:hover {
    background: #c9302c;
  }
`;

const ProtectedPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();

        if (!response.ok || !data.isAuthenticated) {
          router.replace("/login");
        }
      } catch (error) {
        console.log(error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Protected Page</Title>
        <p>Welcome! You have successfully logged in.</p>
        <Button onClick={handleLogout}>Logout</Button>
      </Card>
    </Container>
  );
};

export default ProtectedPage;
