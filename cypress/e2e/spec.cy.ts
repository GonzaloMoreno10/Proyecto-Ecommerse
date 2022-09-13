import { eq, includes } from 'cypress/types/lodash';

describe('Prueba', () => {
  it('Login sin ApiKey', () => {
    cy.request({
      url: '/auth/login',
      failOnStatusCode: false,
      method: 'POST',
      body: {
        UsrEmail: 'gonzamoreno21@gmail.com',
        UsrPass: 'Gm951357*',
      },
    })
      .its('body')
      .its('code')
      .should('eq', 401);
  });

  it('Login cont ApiKey', () => {
    cy.request({
      url: '/auth/login',
      failOnStatusCode: false,
      method: 'POST',
      headers: {
        ApiKey: '7CU92HFYWwQQOwHgNzUGV6gNuTjwwtGvDMYW98i3hpw=',
      },
      body: {
        UsrEmail: 'gonzamoreno21@gmail.com',
        UsrPass: 'Gm951357*',
      },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data').to.have.property('token');
    });
  });
});
