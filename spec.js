describe('Example E2E test', () => {
    it('should navigate to the homepage', () => {
      cy.visit('http://localhost:4200');
      cy.contains('Welcome to My App');
    });
  
    it('should display weather data for a valid city', () => {
      cy.visit('http://localhost:4200');
      cy.get('input[name="city"]').type('Almaty');
      cy.get('button[type="submit"]').click();
      cy.contains('Temperature:');
      cy.contains('Description:');
    });
  });
  