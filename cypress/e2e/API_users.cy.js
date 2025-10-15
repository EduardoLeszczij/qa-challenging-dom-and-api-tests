// Suíte de testes API - JSONPlaceholder /users com validação de schema 
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function expectValidSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        throw new Error(ajv.errorsText(validate.errors, { separator: '\n' }));
    }
}

describe('API /users - valida CRUD + JSON Schema', () => {
    let userSchema;

    before(() => {
        cy.fixture('user.schema.json').then(s => { userSchema = s; });
    });

    it('GET /users -> 200 e lista válida', () => {
        cy.request('GET', '/users')
            .its('status').should('eq', 200); cy.request('GET', '/users').then(({ status, body }) => { expect(status).to.eq(200); expect(body).to.be.an('array').and.to.have.length.greaterThan(0); body.forEach(u => expectValidSchema(userSchema, u)); });
    });

    it('GET /users/1 -> 200 e schema válido', () => {
        cy.request('GET', '/users/1').then(({ status, body }) => {
            expect(status).to.eq(200); expectValidSchema(userSchema, body); expect(body.id).to.eq(1);
        });
    });

    it('POST /users -> 201 (ou 200) e schema válido', () => {
        const payload = {
            name: 'Ada Lovelace',
            username: 'adal',
            email: 'ada@example.com',
            address: {
                street: 'Algorithm Ave',
                suite: 'Apt. 42',
                city: 'London',
                zipcode: 'WC2N 5DU',
                geo: { lat: '51.5074', lng: '0.1278' }
            },
            phone: '555-1234', website: 'ada.dev',
            company: {
                name: 'Analytical Engines',
                catchPhrase: 'Poetry of Logic',
                bs: 'compute dreams'
            }
        };

        cy.request('POST', '/users', payload).then(({ status, body }) => {
            expect([200, 201]).to.include(status);
            expect(body).to.have.property('id');
            expect(body.id).to.be.a('number');
            expectValidSchema(userSchema, body);
        });
    });

    it('PUT /users/1 -> 200 e schema válido', () => {
        const payload = {
            id: 1, 
            name: 'Ada Lovelace (Updated)', 
            username: 'adal', 
            email: 'ada.updated@example.com', 
            address: { street: 'Algorithm Ave', 
                suite: 'Apt. 42', 
                city: 'London', 
                zipcode: 'WC2N 5DU', 
                geo: { lat: '51.5074', 
                    lng: '0.1278' } 
            }, 
            phone: '555-1234', 
            website: 'ada.dev', 
            company: { 
                name: 'Analytical Engines', 
                catchPhrase: 'Poetry of Logic', 
                bs: 'compute dreams' 
            }
        };

        cy.request('PUT', '/users/1', payload).then(({ status, body }) => {
            expect(status).to.eq(200);
            expectValidSchema(userSchema, body);
            expect(body.id).to.eq(1);
        });
    });

    it('DELETE /users/1 -> 200 ou 204; corpo adequado', () => {
        cy.request('DELETE', '/users/1').then(({ status, body }) => {
            expect([200, 204]).to.include(status);
            if (status === 200) { expect(body).to.be.an('object'); }
        });
    });
}); 