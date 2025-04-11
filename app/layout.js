import React from 'react';
import PropTypes from 'prop-types'; // Add this import
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Cadet Health Reporting System (CHRS)",
  description: "As a cadet, your health and well-beign are our top priority.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

// Add prop type validation
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};