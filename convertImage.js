const fs = require('fs');
const path = require('path');

// Read the image file
fs.readFile('f:/WX/images/login_background.jpg', (err, data) => {
  if (err) {
    console.error('Error reading image file:', err);
    return;
  }

  // Convert image data to base64
  const base64Image = data.toString('base64');
  console.log('Base64 encoded image:');
  console.log('data:image/jpeg;base64,' + base64Image);
});
