const fs = require('fs');

describe('Application', () => {
  it('Includes tests', () => {
    expect(true).toEqual(true);
  }); 

  it('Includes a package.json', () => {
    expect(fs.existsSync('./package.json')).toEqual(true);
  });

  it('Includes a .gitignore', () => {
    expect(fs.existsSync('./.gitignore')).toEqual(true);
  });

  it('Includes a README.md', () => {
    expect(fs.existsSync('./README.md')).toEqual(true);
  });

  it('Includes the application', () => {
    expect(fs.existsSync('./app.js')).toEqual(true);
  })
});