describe("Login", () => {
  it("should log in with valid credentials", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("anh@gmail.com");
    cy.get("#password").type("123123123");

    cy.get("button").click();

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should handle login failure with invalid email", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("anhgmail.com");
    cy.get("#password").type("123123123");

    cy.get("button").click();

    cy.url().should("equal", "http://localhost:3000/login");
  });

  it("should handle login failure with invalid password", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("anh@gmail.com");
    cy.get("#password").type("2345124123");

    cy.get("button").click();

    cy.get("#err-message")
      .invoke("text")
      .should("equal", "Incorrect username or password.");
    cy.url().should("equal", "http://localhost:3000/login");
  });

  it("should handle login failure with non existing account", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("#email").type("nhnanh@gmail.com");
    cy.get("#password").type("2345124123");

    cy.get("button").click();

    cy.get("#err-message")
      .invoke("text")
      .should("equal", "Incorrect username or password.");

    cy.url().should("equal", "http://localhost:3000/login");
  });

  it("should handle log in with empty fields", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("button").click();

    cy.url().should("equal", "http://localhost:3000/login");
  });
});
