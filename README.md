# BNDS Frontend

Frontend for BNDS Serverless version. Based in SvelteKit.

BNDS is a webapp designed to check if a smartphone and its variants are compatible with the frequencies and technologies provided by chilean mobile operators. 


## Installation
To install a local version of the frontend, follow the steps:
1. Clone the repo
2. Make sure you have the latest version of NodeJS
3. run ```npm install```.
4. Create a ```.env```with the required parameters.

## Running
To start a dev version of the frontend without building, run ```npx svelte-kit dev```.
The frontend should be available at ```http://localhost:3000```.

## Building
This project uses the static adapter in order to get a SPA (Single Page Application) available for uploading to an S3 bucket. 
To build, run ```npx svelte-kit build```. 
The app should be available in folder ```build```.

## Contact
For any inquiries, contact ```eperezf [at] pisapapeles.net```
