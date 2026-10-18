// Mesmos passos e asserções para CSS e XPath: muda apenas o localizador.
export const xpath = Cypress.env('seletores') === 'xpath';
export const el = (css, xp) => xpath ? cy.xpath(xp) : cy.get(css);
export const qa = value => el(`[data-qa="${value}"]`, `//*[@data-qa="${value}"]`);
export const id = value => el(`#${value}`, `//*[@id="${value}"]`);
export const nav = path => el(`header a[href="${path}"]`, `//header//a[@href="${path}"]`);
export const tituloLogin = () => el('.login-form h2', '//div[@class="login-form"]/h2');
export const tituloSignup = () => el('.signup-form h2', '//div[@class="signup-form"]/h2');

export function abrirLogin() {
  cy.visit('/');
  cy.location('pathname').should('eq', '/');
  el('#slider', '//*[@id="slider"]').should('be.visible');
  nav('/login').should('be.visible').click();
  cy.location('pathname').should('eq', '/login');
}
export function logar(conta) {
  tituloLogin().should('be.visible').and('have.text', 'Login to your account');
  qa('login-email').type(conta.email);
  qa('login-password').type(conta.password, { log: false });
  qa('login-button').click();
}
export function verificarLogado(conta) {
  el('header .navbar-nav', '//header//ul[contains(@class,"navbar-nav")]')
    .should('contain.text', 'Logged in as').and('contain.text', conta.name);
  nav('/logout').should('be.visible');
}
export function excluirPelaInterface() {
  nav('/delete_account').click();
  qa('account-deleted').should('be.visible').and('contain.text', 'Account Deleted!');
}


export function cadastrarPelaInterface(conta) {
    tituloSignup().should('be.visible').and('have.text', 'New User Signup!');
    qa('signup-name').type(conta.name);
    qa('signup-email').type(conta.email);
    qa('signup-button').click();
    tituloLogin().should('contain.text', 'Enter Account Information').and('be.visible');
    id('id_gender2').check().should('be.checked');
    qa('name').should('have.value', conta.name);
    qa('email').should('have.value', conta.email);
    qa('password').type(conta.password, { log: false });
    qa('days').select(conta.birth_date);
    qa('months').select(conta.birth_month);
    qa('years').select(conta.birth_year);
    id('newsletter').check().should('be.checked');
    id('optin').check().should('be.checked');
    qa('first_name').type(conta.firstname);
    qa('last_name').type(conta.lastname);
    qa('company').type(conta.company);
    qa('address').type(conta.address1);
    qa('address2').type(conta.address2);
    qa('country').select(conta.country);
    qa('state').type(conta.state);
    qa('city').type(conta.city);
    qa('zipcode').type(conta.zipcode);
    qa('mobile_number').type(conta.mobile_number);
    qa('create-account').click();
    qa('account-created').should('be.visible').and('contain.text', 'Account Created!');
    qa('continue-button').click();
}
