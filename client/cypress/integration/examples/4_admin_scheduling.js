describe('Checking basic admin scheduling functionalities', ()=>{
    it('Enter value and sign in as admin and reach events page', ()=>{
        cy.visit('localhost:3000/login')
        cy.get('[id=email]').type('admin@admin.com')
        cy.get('[id=password]').type('123')
        cy.get('[id=role]').select('Admin')
        cy.get('[data-testid=submit]').click()
        cy.url().should('contain','/protected')
        cy.get('button').contains('Events').click()
        cy.url().should('contain','/protected/events')
    }) 
    it('create event and update', ()=>{
        cy.visit('localhost:3000/login')
        cy.get('[id=email]').type('admin@admin.com')
        cy.get('[id=password]').type('123')
        cy.get('[id=role]').select('Admin')
        cy.get('[data-testid=submit]').click()
        cy.url().should('contain','/protected')
        cy.get('button').contains('Events').click()
        cy.url().should('contain','/protected/events')
        cy.get('button').contains('CREATE EVENT').click()
        cy.get('[data-testid=EventName]').type('SWE Sprint 1')
        cy.get('[data-testid=Location]').type('Virtual')
        cy.get('[data-testid=Description]').type('Faculty Calendar Scheduler')
        cy.get('[data-testid=role]').select('Meeting')
        cy.get('[id=st]').click().get('button').contains('10').click()
        cy.get('.MuiPickersClock-squareMask').click('topRight');
        cy.get('.MuiPickersClock-squareMask').click('bottom');
        cy.get('button').contains('OK').click()
        cy.get('[id=et]').click().get('button').contains('10').click()
        cy.get('.MuiPickersClock-squareMask').click(250, 120);
        cy.get('.MuiPickersClock-squareMask').click('bottom');
        cy.get('button').contains('OK').click()
        cy.get('button').contains('SUBMIT').click() 
        cy.get('button').contains('VIEW ALL EVENTS').click()
        cy.get('td').contains('SWE Sprint 1')
        cy.get('button').contains('Edit').click()
        cy.get('[t-id=EventName]').type('SWE Sprint 1 (CSE E)')
        cy.get('[t-id=Location]').type('Virtual - MS Teams')
        cy.get('[t-id=Description]').type('Faculty Calendar Scheduler Review')
        cy.get('[t-id=role]').select('Misc')
        cy.get('button').contains('UPDATE').click()
        cy.get('[id=chakra-toast-manager-bottom]').should('contain','Event SWE Sprint 1 update success')
    })
})