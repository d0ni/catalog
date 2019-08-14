import React from "react";

export function RegisterForm() {
  return (
    <>
      <div className="register-form">
        <a className="btn" href="/auth/register/">
          Sign-up
        </a>
        <a className="btn" href="/auth/login/">
          Sign-in
        </a>
      </div>
    </>
  );
}
