describe('Star Wars Battle', () => {

  it('should successfully loads on localhost', () => {
    cy.visit('/')
  });

  it('should check if 2 options in dropdown exist', () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('PEOPLE').click()
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
  });

  it('should choose the STARSHIP option from dropdown, press the Submit btn and send 4 requests to SWAPI', {
    defaultCommandTimeout: 15000
  }, () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
    cy.get('button').click()
    cy.intercept('https://www.swapi.tech/api/*').as('getStarships')
    cy.get('@getStarships.all').should('have.length', 4)
  });

  it('should redirect user to STARSHIPS battle field after selecting it from dropdown',  () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
    cy.get('button').click()
    cy.get('.action span').contains('STARSHIP')
  });

  it('should redirect user to PEOPLE battle field after selecting it from dropdown',  () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('PEOPLE').click()
    cy.get('button').click()
    cy.get('.action span').contains('PEOPLE')
  });

  it('should randomly choose 2 cards from STARSHIPS to battle and add a point to winning team! ', {
    defaultCommandTimeout: 10000
  }, () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
    cy.get('button').click()
    cy.intercept('https://www.swapi.tech/api/*').as('getStarships')
    cy.wait('@getStarships')
    cy.get('button').contains('Draw your Fighters').click()
    cy.get('app-score-board span').contains('1')
  });

  it('go back to category-view after pressing the "Go back to Categories" btn', {
    defaultCommandTimeout: 10000
  }, () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
    cy.get('button').click()
    cy.intercept('https://www.swapi.tech/api/*').as('getStarships')
    cy.wait('@getStarships')
    cy.get('button').contains('Go back to Categories').click()
    cy.get('.home-page').contains('Category')
  });

  it('should display spinner while loading', () => {
    cy.visit('/')
    cy.get('mat-select').click().get('mat-option').contains('STARSHIP').click()
    cy.get('button').click()
    cy.get('mat-spinner').should('be.visible')
  });

})
