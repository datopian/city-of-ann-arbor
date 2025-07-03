/// <reference types="cypress" />

import { expect } from "chai";

const uuid = () => crypto.randomUUID();

const org = {
  title: `${uuid()}${Cypress.env("ORG_NAME_SUFFIX")}`,
  name: `${uuid()}${Cypress.env("ORG_NAME_SUFFIX")}`,
};

const datasets = [
  {
    name: `${uuid()}-dataset`,
    title: `${uuid()}-dataset`,
    notes: `${uuid()}-dataset`,
    ann_arbor_dataset_type: "dataset",
    owner_org: org.name,
    tags: [{ name: "test" }],
  },
  {
    name: `${uuid()}-dashboard`,
    title: `${uuid()}-dashboard`,
    notes: `${uuid()}-dashboard`,
    ann_arbor_dataset_type: "dashboard",
    owner_org: org.name,
    visualization_url: "https://datopian.com",
  },
  {
    name: `${uuid()}-map`,
    title: `${uuid()}-map`,
    notes: `${uuid()}-map`,
    ann_arbor_dataset_type: "map",
    owner_org: org.name,
    visualization_url: "https://datopian.com",
  },
];

describe("Search page", () => {
  before(() => {
    cy.createOrganizationViaAPI(org);
    cy.createDatasetViaAPI(datasets[0]);
    cy.createDatasetViaAPI(datasets[1]);
    cy.createDatasetViaAPI(datasets[2]);

    cy.prepareFile(
      datasets[0].name,
      "sample.csv",
      "CSV",
      uuid(),
      "sample.csv",
      "Sample description"
    );
    cy.wait(5000);
  });

  beforeEach(() => {
    cy.visit(`/search`);
    cy.viewport(1920, 1080);
  });

  after(() => {
    cy.deleteDatasetViaAPI(datasets[0].name);
    cy.deleteDatasetViaAPI(datasets[1].name);
    cy.deleteDatasetViaAPI(datasets[2].name);
    cy.deleteOrganizationAPI(org.name);

    cy.purgeDataset(datasets[0].name);
    cy.purgeDataset(datasets[1].name);
    cy.purgeDataset(datasets[2].name);
    cy.purgeOrganization(org.name);
  });

  it("search by keyword works", () => {
    cy.get("#search-form-input").type(datasets[0].name);
    cy.get('[data-cy="search-form-submit-button"]').click();
    cy.get('[data-cy^="dataset-card-"]').contains(datasets[0].title);

    cy.get("#search-form-input").clear().type(datasets[1].name);
    cy.get('[data-cy="search-form-submit-button"]').click();
    cy.get('[data-cy^="dataset-card-"]').contains(datasets[1].title);

    cy.get("#search-form-input").clear().type(datasets[2].name);
    cy.get('[data-cy="search-form-submit-button"]').click();
    cy.get('[data-cy^="dataset-card-"]').contains(datasets[2].title);
  });

  it("search by dataset type works", () => {
    cy.wait(2000);
    cy.get('[data-cy="filter-type"]').click();
    cy.get('[data-cy="filter-type-option-dataset"]').click();
    cy.get('[data-cy^="dataset-card-badge-"]').each(($badge) => {
      expect($badge.text().trim()).to.eq("dataset");
    });
  });

  it("search by dashboard type works", () => {
    cy.wait(2000);
    cy.get('[data-cy="filter-type"]').click();
    cy.get('[data-cy="filter-type-option-dashboard"]').click();
    cy.get('[data-cy^="dataset-card-badge-"]').each(($badge) => {
      expect($badge.text().trim()).to.eq("dashboard");
    });
  });

  it("search by map type works", () => {
    cy.wait(2000);
    cy.get('[data-cy="filter-type"]').click();
    cy.get('[data-cy="filter-type-option-map"]').click();
    cy.get('[data-cy^="dataset-card-badge-"]').each(($badge) => {
      expect($badge.text().trim()).to.eq("map");
    });
  });

  it("search by format works", () => {
    cy.wait(2000);
    cy.get('[data-cy="filter-resFormat"]').click();
    cy.get('[data-cy="filter-resFormat-option-CSV"]').click();
    cy.get('[data-cy^="dataset-card-"]').each(($card) => {
      $card.find('[data-cy="format-csv"]').each((this, index, element) => {
        expect(element.text()).to.eq("CSV");
      });
    });
  });

  it("search by tag works", () => {
    cy.wait(2000);
    cy.get('[data-cy="filter-tags"]').click();
    cy.get('[data-cy="filter-tags-option-test"]').click();
    cy.get('[data-cy^="dataset-card-"]').each(($card) => {
      $card
        .find('[data-cy^="dataset-card-tag-"]')
        .each((index, element) => {
          expect(element.innerText).to.eq("test");
        });
    });
  });
});

export {};
