describe("login/register", () => {
  beforeEach(() => {
    cy.visit("https://automationteststore.com/");
    cy.get("#customernav").click();
  });
  it("register", () => {
    cy.contains("I am a new customer.")
      .should("have.css", "color")
      .and("eq", "rgb(0, 161, 203)");
    cy.get("#accountFrm_accountregister").should("be.checked");
    cy.get('button[type="submit"]').eq(0).click();
    cy.request({
      url: "https://automationteststore.com/index.php?rt=account/create",
    }).then((resp) => {
      expect(resp.status).to.eq(200);
    });
    cy.visit("https://automationteststore.com/index.php?rt=account/create");
    cy.get("#AccountFrm_firstname")
      .type("Olya")
      .should("have.value", "Olya")
      .blur();
    cy.get("#AccountFrm_lastname").type("Prodaniuk");

    cy.get("#AccountFrm_email").type("testemail@email.com").blur();
    cy.get("#AccountFrm_telephone").type("12341234");
    cy.get("#AccountFrm_fax").type("faxfax");
    cy.get("#AccountFrm_company").type("company").blur();
    cy.get("#AccountFrm_address_1").should("be.visible").type("myaddress 6/16");
    cy.get("#AccountFrm_city").type("city").blur();
    cy.get("#AccountFrm_zone_id").select("Powys");
    cy.get("#AccountFrm_postcode").type("11111");
    cy.get("#AccountFrm_country_id").select("United Kingdom");
    cy.get("#AccountFrm_loginname").type("olya11");

    cy.get("#AccountFrm_password").type("1234");
    cy.get("#AccountFrm_confirm").type("1234");
    cy.get('[type="radio"]').eq(0).check();
    cy.get('[type="checkbox"]').check();
    cy.get('button[type="submit"]').eq(0).click();
    cy.get(".alert.alert-error.alert-danger").then(($div) => {
      if ($div.hasClass("alert alert-error alert-danger")) {
        cy.contains("login page").click();
      } else {
        cy.get('[title="Continue"]').click();
      }
    });
  });
  it("login", () => {
    cy.get("#loginFrm_loginname").type("testemail@email.com").blur();
    cy.get("#loginFrm_password").type("12341234");
    cy.contains("Login").click();
  });
});
