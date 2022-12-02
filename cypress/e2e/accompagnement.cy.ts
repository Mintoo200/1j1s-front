import {
  anÉtablissementAccompagnementList,
} from '../../src/server/établissement-accompagnement/domain/ÉtablissementAccompagnement.fixture';

describe('Parcours Accompagnement', () => {
  describe('quand l‘utilisateur cherche une commune', () => {
    before(() => {
      cy.visit('/accompagnement');
    });
    it('affiche 2 résultats en cas de réussite', () => {
      cy.get('input[type="text"').type('46100');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(400);
      cy.get('input[type="text"').type('{enter}');
      cy.get('button[type=submit]').type('{enter}');
      cy.intercept('/api/empois', anÉtablissementAccompagnementList());
      cy.get('ul[aria-label="Établissements d‘accompagnement"] > li').should('have.length', 2);
    });
  });
  describe('quand l‘utilisateur ajoute des paramettre incorrecte à la query', () => {
    before(() => {
      cy.visit('http://localhost:3000/accompagnement?libelleCommune=Figeac+%2846100%29&codeCommune=46102&oui=non');
    });
    it('affiche le message "Erreur - Demande incorrecte', () => {
      cy.contains('Erreur - Demande incorrecte').should('be.visible');
    });
  });
});