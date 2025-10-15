describe('Desafio seletores challenging_dom', () => {
  it('Clicar nos 3 botoões e em todos os edit/delete', () => {
    cy.visit('https://the-internet.herokuapp.com/challenging_dom');

    cy.contains('h3', 'Challenging DOM', { timeout: 10000 }).should('be.visible');
    
    cy.document().then(doc => {
      const t = doc.querySelector('table#table');
    // eslint-disable-next-line no-console
      console.log('Tabela existe?', !!t, 'Linhas:', t?.querySelectorAll('tbody tr').length);
    });

    cy.get("a.button")
      .each((_, i) => {
        cy.get('a.button').eq(i).click()
      });
    
    cy.get('div.example table', { timeout: 10000})
      .should('be.visible');
    cy.get('div.example table', {timeout: 10000})
      .should('have.length.greaterThan', 0)
    
    cy.get('div.example table tbody tr').each((_, i) => {
      cy.get('div.example table tbody tr').eq(i).within(() => {
        cy.contains('a', 'edit').click().should('exist');
        cy.contains('a', 'delete').click().should('exist');
      });
    });
  });
});