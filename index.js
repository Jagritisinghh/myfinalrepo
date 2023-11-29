const fs = require('fs');

const inputFile = 'input.json';
const outputFile = 'output.json';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  try {
    const userData = JSON.parse(data);

    const modifiedData = userData.map(user => {
      const totalPosts = user.posts.length;
      return { ...user, totalPosts };
    });

    fs.writeFile(outputFile, JSON.stringify(modifiedData, null, 2), err => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }

      console.log(`Modified data has been written to ${outputFile}`);
    });
  } catch (parseError) {
    console.error(`Error parsing JSON: ${parseError}`);
  }
});
