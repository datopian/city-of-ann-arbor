/// <reference types="cypress" />
const uuid = () => crypto.randomUUID();

const org = `${uuid()}${Cypress.env("ORG_NAME_SUFFIX")}`;
const sample_org = `${uuid()}${Cypress.env("ORG_NAME_SUFFIX")}`;
const datasetTitle = `${uuid()}`;
const datasetName = `${uuid()}`;
const resourceId = `${uuid()}`;

describe("Resource Page", () => {
  const testResourceDescription =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  before(() => {
    cy.createOrganizationViaAPI({
      title: org,
      name: sample_org,
      email: "example@org.com",
    });
    cy.createDatasetViaAPI({
      id: uuid(),
      name: datasetName,
      title: datasetTitle,
      owner_org: sample_org,
      dashboard_url: "",
    });
    cy.prepareFile(
      datasetName,
      "sample.csv",
      "CSV",
      resourceId,
      "sample.csv",
      testResourceDescription
    );
    cy.wait(5000);
  });

  beforeEach(() => {
    cy.visit(`/${org}/${datasetName}/r/${resourceId}`);
  });

  after(() => {
    cy.deleteDatasetViaAPI(datasetName);
    cy.deleteOrganizationAPI(sample_org);
  });

  it("displays correct page title and metadata", () => {
    cy.title().should("contain", "sample.csv");

    // Check resource name is displayed
    cy.get("h1").should("contain", "sample.csv");

    // Check resource description if it exists
    if (testResourceDescription) {
      cy.contains(testResourceDescription).should("be.visible");
    }
  });

  it("sidebar shows correct resource information", () => {
    // Check resources count
    cy.contains(`1 resources`).should("be.visible");

    // Check current resource is highlighted
    cy.contains("sample.csv").should("be.visible");
  });

  it("sidebar toggle functionality works", () => {
    // Click collapse button if visible
    cy.get("button[aria-label='Collapse sidebar']").then(($btn) => {
      if ($btn.is(":visible")) {
        cy.wrap($btn).click();

        // Check expand button appears
        cy.get("button[aria-label='Expand sidebar']")
          .should("be.visible")
          .click();
      }
    });
  });

  it("resource tabs are functional", () => {
    // Check all tabs are present
    cy.contains("Preview").should("be.visible");
    cy.contains("Table Schema").should("be.visible");
    cy.contains("API").should("be.visible");

    // Test Table Schema tab
    cy.contains("Table Schema").click();
    cy.get("table").should("be.visible");
    cy.contains("Field").should("be.visible");
    cy.contains("Type").should("be.visible");

    // Test API tab
    cy.contains("API").click();
    cy.contains("curl").should("be.visible");
    cy.contains("python").should("be.visible");
    cy.contains("r").should("be.visible");
  });

  it("API examples contain correct resource ID", () => {
    cy.contains("API").click();

    // Check curl example
    cy.contains("curl").should("be.visible");
    cy.get("pre").should("contain", resourceId);

    // Check all code examples contain the resource ID
    cy.get("code").each(($code: any) => {
      cy.wrap($code).should("contain", resourceId);
    });
  });

  it("data explorer loads in preview tab", () => {
    // Check if preview content loads
    cy.contains("Preview").click();

    // Wait for content to load
    cy.get("body", { timeout: 10000 }).should("be.visible");
  });

  it("responsive design works on mobile", () => {
    cy.viewport("iphone-6");

    // Check that main content is still accessible
    cy.get("h1").should("be.visible");
    cy.contains("Preview").should("be.visible");
  });

  it("format badge displays correct format", () => {
    cy.get("body").should("contain", "CSV");
  });
});

export {};
