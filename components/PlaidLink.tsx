"use client";

import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "./ui/button";

export default function PlaidLink({ variant }: { variant: string }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create-link-token", {
        method: "GET",
      });

      const { link_token } = await response.json();
      setToken(link_token);
    };

    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken: string) => {
    await fetch("/api/plaid/exchange-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          <strong>Link account</strong>
        </Button>
      ) : variant === "secondary" ? (
        <Button onClick={() => open()} disabled={!ready} type="submit">
          <strong>Link account</strong>
        </Button>
      ) : (
        <Button onClick={() => open()} disabled={!ready} type="submit">
          <strong>Link account</strong>
        </Button>
      )}
    </>
  );
}
