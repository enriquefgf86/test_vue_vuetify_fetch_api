/// <reference types="cypress" />
describe("Initializing view with the first elements", () => {
  it("should be on initial page related to local host 8080", () => {
    cy.visit("http://localhost:8080/");
  });

  it("input data", () => {
    cy.get("[data-test=text-field]").should("exist");

    cy.get("[data-test=text-field]")
      .invoke("val")
      .should((val) => {
        return val === 15;
      });
  });

  it("should display data fetched", () => {
    cy.get("[data-test=data]")
      .should("not.be.empty")
      .should("not.have.length.lessThan", 15);

    cy.get("[data-test=card]")
      .first()
      .trigger("mouseover")
      .should("have.css", "border-radius", "16%");
  });

  it("deleting cards from selection", () => {
    cy.get("[ data-testid=img_card]").click().should();
  });
});
