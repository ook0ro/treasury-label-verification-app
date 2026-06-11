# Treasury Alcohol Label Verification App

## Overview

This project is a prototype developed for the Treasury Take-Home Assessment. The application helps compliance agents verify alcohol beverage labels by extracting text from uploaded label images and comparing the extracted information against application data.

The goal is to reduce manual verification effort by automating common compliance checks while still allowing human review of extracted information.

## Live Application

https://treasury-label-verification-app-lovat.vercel.app/

## Source Code Repository

https://github.com/ook0ro/treasury-label-verification-app

## Features

* Upload alcohol label images
* Preview uploaded label before processing
* OCR text extraction using Tesseract.js
* Verify Brand Name
* Verify Class/Type Designation
* Verify Alcohol Content
* Verify Net Contents
* Detect Government Warning Statement
* Display extracted OCR text
* Display verification results with match indicators

## Technology Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Tesseract.js OCR
* GitHub
* Vercel

## Application Workflow

1. User enters expected application information.
2. User uploads an alcohol label image.
3. OCR extracts text from the image.
4. Extracted text is normalized.
5. The application compares extracted text against expected values.
6. Results are displayed showing matches and missing items.
7. Extracted OCR text is shown for manual review.

## Assumptions

* Uploaded images are clear and readable.
* OCR accuracy depends on image quality.
* The prototype performs client-side processing only.
* No images or extracted text are permanently stored.
* Human review remains part of the compliance process.

## Local Development

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Future Enhancements

* Batch label processing
* Fuzzy matching for OCR errors
* Confidence scoring
* Support for rotated and low-quality images
* Export verification reports
* Integration with compliance workflow systems

## Notes

This application is intended as a proof-of-concept prototype and is not integrated with existing Treasury systems.
