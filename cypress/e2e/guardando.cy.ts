import { find } from 'cypress/types/lodash';

describe('Prueba', () => {
  it('Visitar HOME', () => {
    cy.visit({ url: '/auth/login', method: 'GET' });
    cy.get('input');
  });

  it('Obtener por ids', () => {
    cy.get('input');
  });

  it('Obtener por atributo', () => {
    cy.get('[placeholder="email@example.com"]');
  });

  it('Obtener por atributo y tag', () => {
    cy.get('input[placeholder="email@example.com"]');
  });

  it('Obtener por clase', () => {
    cy.get('.form-control');
  });

  it('Usando contains', () => {
    
    cy.contains('.btn', 'Ingresar');
  });

  it('Usando parent', () => {
    //Obteniendo el elemento padre
    cy.contains('.btn', 'Ingresar').parent();
    //Obteniendo el elemento padres
    cy.contains('.btn', 'Ingresar').parents();
    //Obteniendo otros elementos
    //cy.contains('.btn', 'Ingresar').parents().find('label');

    cy.get('form').find('input');
  });
});
