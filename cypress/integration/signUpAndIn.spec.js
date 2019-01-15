import Chance from 'chance';
const chance = new Chance();
//npm run e2e

describe('F4F', () => {
    const email = chance.email();
    const pass = 'ValidPassword123';
    const name = chance.string({ length: 5, pool: 'abcdefghijklmnopqrstuvwxyz' });
    const calories = chance.string({ length: 3, pool: '1234567890' });
    const carbs = chance.string({ length: 3, pool: '1234567890' });
    const protein = chance.string({ length: 3, pool: '1234567890' });
    const fat = chance.string({ length: 3, pool: '1234567890' });
    const cardio = chance.string({ length: 3, pool: '1234567890' });
    beforeEach(() => {
        cy.visit('http://localhost:4200/mpt/j2oiOsWoBnypa1vD36Ua');
    })
    it('Opens create food item dialog', () => {
        //Opens the food dialog
        cy.get('#createFoodBtn').click();
        //Assert if the dialog is open by checking for the h3 on top of the dialog
        cy.get('h3').should('contain', 'Add New Food Product');
    });

    // it('signs up a new user', () => {
    //     //Goes to add food to db route
    //     cy.get('#createFoodBtn').click();
    //     //Assert right tab
    //     cy.get('h4').should('contain', 'Please sign up');
    //     //Fill out the form
    //     cy.get('input[name=email]').type(email);
    //     cy.get('input[name=password]').type(pass);
    //     cy.get('button[name=signupBtn]').click();
    //     //Assert that button was clicked
    //     cy.get('h4').should('contain', 'Please sign in');
    // });


    // it('has a title', () => {
    //     cy.contains('Welcome to Fit 4 Food');
    // });
    // it('adds food to db', () => {
    //     //Fills out the form
    //     cy.get('#headerAddFood').click();
    //     cy.get('input[name=name]').type(name);
    //     cy.get('input[name=calories]').type(calories);
    //     cy.get('input[name=carbs]').type(carbs);
    //     cy.get('input[name=protein]').type(protein);
    //     cy.get('input[name=fat]').type(fat);
    //     //Adds the random generated food to db
    //     cy.get('button[type=submit]').click();
    // });
    


    // it('checks if cardio is correctly added', () => {
    //     //goes to cardio route
    //     cy.get('#headerAddExercise').click();
    //     //Fills out the cardio input
    //     cy.get('input[name=cardio]').type(cardio);
    //     //Adds the random generated cardio number to the overview
    //     cy.get('button[type=submit]').click();
    //     //Opens side nav bar
    //     cy.get('#sideNavBtn').click();
    //     //Asserts that cardio is added
    //     cy.contains(cardio);
    // });
});