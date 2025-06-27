describe("Homepage", () => {
  const CKAN_URL = Cypress.env("CKAN_URL");

  beforeEach(() => {
    cy.visit("/");
  });

  it("Navbar links point to expected pages", () => {
    cy.get("nav").within(() => {
      cy.contains("Data").should("have.attr", "href", "/search");
      cy.contains("Topics").should("have.attr", "href", "/topics");
      cy.contains("a2gov").should("have.attr", "href", "/#external-link"); // TODO: update this once we have the link
    });
  });

  it("Search input navigates to /search?q=", () => {
    const query = "parks";
    cy.get(`[data-cy="search-input"]`).type(query);
    cy.get('[data-cy="search-submit-button"]').click();
    cy.url().should("include", `/search?q=${encodeURIComponent(query)}`);
  });

  it("Theme chips match CKAN groups", () => {
    cy.request(`${CKAN_URL}/api/3/action/group_list?all_fields=true`).then(
      (response) => {
        const groupNames = response.body.result.map((group) => group.title);
        cy.get('[data-cy^="theme-chip-"]').each(($chip, index) => {
          const chipText = $chip.text().trim();
          expect(groupNames).to.include(chipText);
        });
      }
    );
  });

  it("All dashboards link points to correct page", () => {
    cy.get('[data-cy="all-dashboards-link"]')
      .should("have.attr", "href")
      .and("eq", "/search?type=dashboard");
  });

  it("Popular dashboards match CKAN datasets with dashboard_url", () => {
    cy.request(
      `${CKAN_URL}/api/3/action/package_search?fq=dashboard_url:['' TO *]&rows=100`
    ).then((response) => {
      const dashboards = response.body.result.results;
      cy.get('[data-cy="popular-dashboards-section"] .swiper-slide').each(
        ($slide) => {
          const $btn = $slide.find("a");
          const key = $slide.data("cy");
          const dashboardId = key.split("dashboard-card-").at(1);
          const dashboard = dashboards.find((d) => d.id == dashboardId);

          expect($btn.attr("href")).to.eq(
            `/${dashboard.organization.name}/${dashboard.name}`
          );
          const title = $slide.find("h3").text().trim();
          expect(title).to.include(dashboard.title);
        }
      );
    });
  });

  it("All datasets link points to correct page", () => {
    cy.get('[data-cy="all-datasets-link"]')
      .should("have.attr", "href")
      .and("eq", "/search?type=dataset");
  });

  it("Recently added section matches CKAN datasets without dashboard_url", () => {
    cy.request(
      `${CKAN_URL}/api/3/action/package_search?fq=-dashboard_url:['' TO *]&rows=100`
    ).then((response) => {
      const datasets = response.body.result.results;

      cy.get('[data-cy="recently-added-section"] .grid > div').each(($card) => {
        const title = $card.find("h3").text().trim();
        const key = $card.data("cy");
        const datasetId = key.split("dataset-card-").at(1);
        const dataset = datasets.find((d) => d.id == datasetId);

        expect(title).to.include(dataset.title);

        // Check the Explore Dataset button
        const $btn = $card.find("a");
        expect($btn.attr("href")).to.eq(
          `/${dataset.organization.name}/${dataset.name}`
        );
      });
    });
  });
});
