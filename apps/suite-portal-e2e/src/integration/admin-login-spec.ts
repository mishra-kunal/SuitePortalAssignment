
describe('Admin Login', () => {
    beforeEach(() => {
      // Visit the admin login page before each test
      cy.visit('/admin/login');
    });
  
    it('allows the admin to log in with correct credentials', () => {
      // Type the email and password into the form fields
      cy.get('input[formControlName=email]').type('admin@example.com');
      cy.get('input[formControlName=password]').type('correctpassword');
  
      // Click the submit button
      cy.get('button[type=submit]').click();
  
      // Assert that the admin is redirected to the dashboard after successful login
      cy.url().should('include', '/dashboard');
  
      // You can add more assertions here to check for the presence of elements
      // on the dashboard page that indicate successful login
    });
  
    it('displays an error message for incorrect credentials', () => {
      // Type the email and incorrect password into the form fields
      cy.get('input[formControlName=email]').type('admin@example.com');
      cy.get('input[formControlName=password]').type('wrongpassword');
  
      // Click the submit button
      cy.get('button[type=submit]').click();
  
      // Assert that an error message is displayed
      cy.contains('Login failed').should('be.visible');
      // Replace 'Login failed' with the actual error message text displayed by your application
    });
  });