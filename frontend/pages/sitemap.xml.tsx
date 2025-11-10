import { searchDatasets } from "@/lib/queries/dataset";
import { Dataset } from "@/types/ckan";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://data.a2gov.org';

interface FacetItem {
  name: string;
  count: number;
  display_name: string;
}

interface Facet {
  title: string;
  items: FacetItem[];
}

interface SearchFacets {
  organization: Facet;
  groups: Facet;
  res_format: Facet;
  tags: Facet;
}

function generateSiteMap(datasets: Dataset[], searchFacets: SearchFacets) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://data.a2gov.org</loc>
        <priority>1.0</priority>
     </url>
     <url>
       <loc>https://data.a2gov.org/search</loc>
       <priority>0.9</priority>
     </url>
     ${searchFacets.groups.items.map((group) => `
     <url>
       <loc>https://data.a2gov.org/search?topic=${group.name}</loc>
       <priority>0.9</priority>
     </url>
     `).join('')}
     <url>
       <loc>https://data.a2gov.org/topics</loc>
       <priority>0.9</priority>
     </url>
     ${datasets
      .flatMap((dataset) => {
        const resourceUrls = dataset.resources.filter(r => r.datastore_active).map((resource) => `<url>
           <loc>${`${EXTERNAL_DATA_URL}/${dataset.organization.name}/${dataset.name}/r/${resource.id}`}</loc>
           <lastmod>${resource.last_modified}</lastmod>
           <priority>0.6</priority>
       </url>`);
        return [`
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${dataset.organization.name}/${dataset.name}`}</loc>
           <lastmod>${dataset.metadata_modified}</lastmod>
           <priority>0.8</priority>
       </url>
     `, ...resourceUrls];
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const initialRequestOption = {
    query: "",
    offset: 0,
    limit: 1000,
    tags: [],
    groups: [],
    orgs: [],
    resFormat: [],
    type: [],
  };

  const search_result = await searchDatasets(initialRequestOption);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(search_result.results, search_result.search_facets);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

