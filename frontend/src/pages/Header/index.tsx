import React from 'react';

interface Props {
  title?: string;
  children: React.ReactNode;
}
export default function Header({ children }: Props) {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}
