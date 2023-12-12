# Transform JS

Transform JS is a simple utility designed to convert a finite non-zero set of arguments into a JSON representation. This tool allows users to define key-value pairs, providing a flexible way to create JSON objects based on user input.

## Usage

### Installation
```npm install```

### Run
```npm start```

### Features
 - JSON Transformation: Convert a set of user-defined key-value pairs into a JSON string.  
 - Base64 Encoding: Encode the JSON string using Base64 encoding.
 - Encryption: Encrypt the JSON string using AES-256-CBC encryption with a user-provided secret key.
 - Decryption: Decrypt an encrypted JSON string using the original secret key.  

## Transformations

### JSON Transformation:  
 - Prompts the user to choose the transformation option (json).
 - Takes user input for key-value pairs.  
 - Outputs the resulting JSON string.

### Base64 Encoding:
 - Prompts the user to choose the transformation option (base64).  
 - Encodes the JSON string using Base64 encoding. 
 - Outputs the Base64-encoded string.  

### Encryption:
 - Prompts the user to choose the transformation option (encrypt).  
 - Takes user input for a secret key.  
 - Encrypts the JSON string using AES-256-CBC encryption.  
 - Outputs the encrypted string.  

### Decryption:  
 - Prompts the user to choose the transformation option (decrypt).
 - Takes user input for a secret key.
 - Decrypts an encrypted JSON string.  
 - Outputs the decrypted JSON string.

### How to Use
 - Run the application using npm start.  
 - Follow the on-screen prompts to select a transformation option and provide the necessary input.
 - View the output based on the chosen transformation.