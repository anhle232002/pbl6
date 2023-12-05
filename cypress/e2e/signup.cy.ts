describe("sign up", () => {
  // it("should handle login with valid information ", () => {
  //   cy.visit("http://localhost:3000/signup");
  //
  //   cy.get('input[name="email"]').type("john@gmail.com");
  //   cy.get('input[name="name"]').type("John Doe");
  //   cy.get('input[name="address"]').type("123 Main St");
  //   cy.get('input[name="phoneNumber"]').type("1234567890");
  //   cy.get('input[name="dateOfBirth"]').type("2002-03-02");
  //   cy.get('input[name="password"]').type("SecurePass123");
  //   cy.get('input[name="repassword"]').type("SecurePass123");
  //   cy.get("#signup-btn").click();
  //
  //   cy.url().should("equal", "http://localhost:3000");
  // });
  //
  it("test case 2", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("johngmail.com");
    cy.get('input[name="name"]').type("John@Doe!");
    cy.get('input[name="address"]').type(
      "12312312 312312312321312312312312312312312 Main St",
    );
    cy.get('input[name="phoneNumber"]').type("123-456-789");
    cy.get('input[name="dateOfBirth"]').type("2040-03-02");
    cy.get('input[name="password"]').type("weakp");
    cy.get('input[name="repassword"]').type("SecurePass1234");

    cy.get("#signup-btn").click();

    cy.url().should("equal", "http://localhost:3000/signup");
  });

  it("test case 3", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("john@gmail.com");
    cy.get('input[name="name"]').type(
      "A Very Long Name That Exceeds Maximum Lengthhhhhhhhhhhh",
    );
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="phoneNumber"]').type("123456789@!#");
    cy.get('input[name="dateOfBirth"]').type("2002-03-02");
    cy.get('input[name="password"]').type("weakp");
    cy.get('input[name="repassword"]').type("weakp");

    cy.get("#signup-btn").click();

    cy.get(".field-err")
      .eq(1)
      .invoke("text")
      .should(
        "equal",
        '"name" length must be less than or equal to 50 characters long',
      );

    cy.get(".field-err")
      .eq(3)
      .invoke("text")
      .should("equal", "Invalid Phone number");

    cy.get(".field-err")
      .eq(5)
      .invoke("text")
      .should("equal", "Password must be atleast 8 characters long");
    cy.url().should("equal", "http://localhost:3000/signup");
  });

  it("test case 4", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("john@gmail.com");
    cy.get('input[name="name"]').type("<script>alert('XSS');</script>");
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="phoneNumber"]').type("1234");
    cy.get('input[name="dateOfBirth"]').type("2002-03-02");
    cy.get('input[name="password"]').type("SecurePass123");
    cy.get('input[name="repassword"]').type("   ");

    cy.get("#signup-btn").click();

    cy.get(".field-err")
      .eq(1)
      .invoke("text")
      .should("equal", "Name must contain only alphabetic characters");

    cy.get(".field-err")
      .eq(3)
      .invoke("text")
      .should("equal", "Invalid Phone number");

    cy.get(".field-err")
      .eq(6)
      .invoke("text")
      .should("equal", "Confirm password does not match");

    cy.url().should("equal", "http://localhost:3000/signup");
  });

  it("test case 5", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("john@gmail.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="phoneNumber"]').type("1223456345");
    cy.get('input[name="dateOfBirth"]').type("2002-03-02");
    cy.get('input[name="password"]').type("SecurePass123");
    cy.get('input[name="repassword"]').type("SecurePass123");

    cy.get("#signup-btn").click();

    cy.get("#err-msg").invoke("text").should("equal", "Duplicate Phone Number");

    cy.url().should("equal", "http://localhost:3000/signup");
  });

  it("test case 6", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("john@gmail.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="phoneNumber"]').type("1234567891");
    cy.get('input[name="dateOfBirth"]').type("2002-03-02");
    cy.get('input[name="password"]').type("        ");
    cy.get('input[name="repassword"]').type("        ");

    cy.get("#signup-btn").click();
    cy.get("#err-msg").invoke("text").should("not.be.empty");

    cy.url().should("equal", "http://localhost:3000/signup");
  });

  it("test case 7", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="email"]').type("anh@gmail.com");
    cy.get('input[name="name"]').type("anh le");
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('input[name="phoneNumber"]').type("1234567809");
    cy.get('input[name="dateOfBirth"]').type("2002-03-02");
    cy.get('input[name="password"]').type("SecurePass123");
    cy.get('input[name="repassword"]').type("SecurePass123");

    cy.get("#signup-btn").click();
    cy.get("#err-msg")
      .invoke("text")
      .should("equal", "Username already exists in the system.");
    cy.url().should("equal", "http://localhost:3000/signup");
  });
});
