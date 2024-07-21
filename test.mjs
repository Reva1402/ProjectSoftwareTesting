import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import 'chromedriver';

const driver = new Builder().forBrowser('chrome').build();

describe('PixVibe Tests', function() {
  this.timeout(30000); // Set timeout to 30 seconds

  before(async () => {
    await driver.get('http://localhost:3000'); // Replace with your local or deployed URL
  });

  after(async () => {
    await driver.quit();
  });

  it('should sign up a new user', async () => {
    await driver.wait(until.elementLocated(By.id('signUpButton')), 10000).click();
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.id('signUpSubmit')).click();
    
    const welcomeMessage = await driver.wait(until.elementLocated(By.css('.welcome-message')), 5000);
    const text = await welcomeMessage.getText();
    expect(text).to.include('Welcome, testuser!');
  });

  it('should log in an existing user', async () => {
    await driver.wait(until.elementLocated(By.id('loginButton')), 10000).click();
    await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.id('loginSubmit')).click();
    
    const welcomeMessage = await driver.wait(until.elementLocated(By.css('.welcome-message')), 5000);
    const text = await welcomeMessage.getText();
    expect(text).to.include('Welcome, testuser!');
  });

  it('should upload a photo', async () => {
    await driver.wait(until.elementLocated(By.id('uploadButton')), 10000).click();
    const fileInput = await driver.findElement(By.id('fileInput'));
    await fileInput.sendKeys('/path/to/photo.jpg'); // Replace with the path to your test photo
    await driver.findElement(By.id('uploadSubmit')).click();
    
    const uploadMessage = await driver.wait(until.elementLocated(By.css('.upload-message')), 5000);
    const text = await uploadMessage.getText();
    expect(text).to.include('Photo uploaded successfully');
  });
});
