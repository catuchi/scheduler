describe("Appointments", () => {
  before(function () {
    // runs once before the first test in this block
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[alt='Tori Malcolm']").click();

    cy.get("[data-testid=student-name-input]").clear().type("Burna Boy");

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.contains(".appointment__card--show", "Burna Boy");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Tori Malcolm").should("not.exist");
    cy.contains(".appointment__card--show", "Burna Boy").should("not.exist");
  });
});
