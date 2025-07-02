import { expect } from "chai";

describe("Homepage", () => {
  const CKAN_URL = Cypress.env("CKAN_URL");

  beforeEach(() => {
    cy.visit("/topics");
  });

  it("Topic cards match CKAN groups", () => {
    cy.request(`${CKAN_URL}/api/3/action/group_list?all_fields=true`).then(
      (response) => {
        const groups = response.body.result;
        cy.get('[data-cy^="group-card-"]').each(($card, index) => {
          const dataCy = $card.data("cy");
          const id = dataCy.split("group-card-").at(1);
          const group = groups.find((g) => g.id == id);

          const titleEl = $card.find("h2");

          expect(group.title).to.eq(titleEl.text());
          expect($card.attr("href")).to.eq(`/search?topic=${group.name}`);
        });
      }
    );
  });

  it("Search input works", () => {
    const query = "env";
    cy.get(`[data-cy="search-form-input"]`).type(query);
    cy.get('[data-cy="search-submit-button"]').click();
    cy.get('[data-cy^="group-card-"] h2').contains("Environment");
  });
});
