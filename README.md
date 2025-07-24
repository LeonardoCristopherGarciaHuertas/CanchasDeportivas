# Sports Fields Management Application

This project is a frontend application for managing sports fields. It allows users to view available sports fields, get detailed information about each field, and navigate through the application easily.

## Project Structure

```
frontend-sgcd
├── src
│   ├── components
│   │   ├── FieldCard.tsx       # Displays information about a sports field
│   │   ├── FieldList.tsx       # Renders a list of FieldCard components
│   │   └── Navbar.tsx          # Provides navigation links for the application
│   ├── interfaces
│   │   └── Field.ts            # Defines the structure of a sports field object
│   ├── pages
│   │   ├── Home.tsx            # Landing page displaying a welcome message and fields
│   │   └── FieldDetail.tsx     # Displays detailed information about a specific field
│   ├── services
│   │   └── api.ts              # Functions for making API calls to the backend
│   ├── App.tsx                 # Main application component with routing
│   └── index.tsx               # Entry point of the application
├── package.json                 # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd frontend-sgcd
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
This will launch the application in your default web browser.

## Features

- View a list of available sports fields.
- Navigate between different pages using the Navbar.
- Get detailed information about each sports field.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License.