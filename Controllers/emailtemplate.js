exports.getHTML = (verificationURL) => {
    return (`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
            body {
                font-family: 'Luciole', sans-serif; /* Change font to Roboto */
                margin: 0;
                padding: 0;
                background-color: #eaf7ef; /* Background color */
                background-image: url('https://cdn.shopify.com/s/files/1/0499/2817/5767/products/il_fullxfull.3204359785_n0nk_2000x.jpg?v=1625236208');
                background-size: 50%;
                background-repeat: tile;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: rgba(221, 255, 221, 0.95); /* Glass-themed background color with opacity */
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #4CAF50;
            }
    
            p {
                color: #555555;
                line-height: 1.6;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                text-align: center;
                text-decoration: none;
                background-color: #4CAF50;
                color: #ffffff;
                border-radius: 4px;
            }
    
            .certificate {
                margin-top: 20px;
                text-align: center;
            }
        </style>
        <!-- Add the Roboto font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Luciole:wght@400;700&display=swap">
    </head>
    <body>
    
    <div class="container">
        <h1>Please Verify your account using the link below! 🔐</h1>
        <a href=${verificationURL}><p>${verificationURL},</p></a>
    </div>
    
    </body>
    </html>
    `);
}