import 'cypress-file-upload'

describe("invoice generator", ()=> {
    it("Parse csv file", ()=> {
        Cypress.on('uncaught:exception', (err, runnable) => {

            // Log the error to the console for easy debugging      
            console.error(err);
            // returning false here prevents Cypress from failing the test      
            return false;
        });
        cy.visit('https://csvdemomockappp.bundlewallet.com/')
        cy.request('https://csvdemomockappp.bundlewallet.com/')
        .its('status')
        .should('eq', 200);
        cy.get('h1').should('exist')
        cy.get('.lead').should('exist')
        cy.get('a').should('exist')
        .should('contain.text', 'Click Here')
        //cy.get('a').click() 
        // this module was commented because there was a delay in the upload of file
        cy.get('#statement-file').attachFile('test.csv')
        cy.get('.btn').click()
        cy.wait(2000)
        cy.get('.alert-success').should('exist')
        cy.get('thead > tr > :nth-child(1)').should('exist')
        .should('contain.text', 'S.N')
        cy.get('thead > tr > :nth-child(2)').should('exist')
        .should('contain.text', 'Company')
        cy.get('thead > tr > :nth-child(3)').should('exist')
        .should('contain.text', 'Invoice Value')
        cy.get(':nth-child(1) > :nth-child(2) > .ng-binding').click()
        cy.get('.text-left')
        .should('exist')
        .should('contain.text', 'Company: Google')
        cy.wait(1000)
        cy.contains('Back to Result').click();
        cy.wait(1000)
        cy.get('tbody > :nth-child(2) > :nth-child(2) > .ng-binding').click()
        cy.wait(1000)
        cy.get('[ng-href="#!/"]').click()   

    })
})