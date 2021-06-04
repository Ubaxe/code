context('happy path', () => {
    before(() => {
        cy.exec('cd ../ && npm run reset && npm restart');
    })
    beforeEach(() => {
        cy.restoreLocalStorage();
     });
     afterEach(() => {
        cy.saveLocalStorage();
      });
    it('Registers successfully', () => {
        cy.visit('http://localhost:3000/register');
        const name = 'abc';
        const email = 'abc@unsw.com';
        const password = '12456';
        cy.get('input[name=name]').focus().type(name)
        cy.get('input[name=email]').focus().type(email)
        cy.get('input[name=password]').focus().type(password)
        // wait 2 seconds to click button. 
        // otherwise, the server can not response 
        cy.wait(3000)
        cy.get('button[type=submit]').focus().click();
        cy.url().should('eq','http://localhost:3000/dashboard')
    });

    it('Creates a new game successfully', () => {
        cy.visit('http://localhost:3000/dashboard');
        const gamename = "First"
        cy.get('input[name=gameName]').focus().type(gamename)
        cy.wait(1000)
        cy.get('input[type=submit]').focus().click();
        cy.get('.MuiTypography-h5').contains(gamename)
    });

    it('Starts a game successfully', () => {
        cy.visit('http://localhost:3000/dashboard');
        cy.get('.MuiSvgIcon-root').click()
        expect('.MuiTypography-body2 > :nth-child(1) > .MuiButton-label').to.exist
        cy.wait(1000)
        cy.get('.MuiDialog-container').click('top')
        cy.get('svg').should('have.css', 'fill', 'rgb(255, 0, 0)')
    });

    it('Ends a game successfully', () => {
        cy.get('[style="fill: red;"]').click()
        cy.wait(1000)
        cy.get('[style="background-color: rgb(253, 63, 82); margin: 5%; font-weight: bold;"]').click()
        cy.get('.MuiDialog-container').click('top')
        cy.get('svg').should('have.css', 'fill', 'rgb(0, 128, 0)')
    });

    it('Loads the results page successfully', () => {
        cy.get('.MuiSvgIcon-root').click()
        expect('.MuiTypography-body2 > :nth-child(1) > .MuiButton-label').to.exist
        cy.wait(1000)
        cy.get('.MuiDialog-container').click('top')
        cy.get('[style="fill: red;"]').click()
        cy.wait(1000)
        cy.get('[style="background-color: rgb(144, 238, 144); margin: 5%; font-weight: bold;"]').click()
        cy.url().should('contain', 'result')
    });

    it('Logs out of the application successfully', () => {
        cy.visit('http://localhost:3000/dashboard');
        cy.get('#logout').click()
        cy.url().should('eq','http://localhost:3000/')
        cy.wait(2000)
    });
    it('Logs back into the application successfully', () => {
        const email = 'abc@unsw.com';
        const password = '12456';
        cy.get('#email').focus().type(email)
        cy.get('#password').focus().type(password)
        cy.wait(2000)
        cy.get('button[type=submit]').focus().click();
        cy.url().should('eq','http://localhost:3000/dashboard')
    });

});