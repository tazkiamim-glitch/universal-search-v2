// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';

// --- PASTE YOUR CREDENTIALS DIRECTLY HERE ---
const esUrl = "https://my-elasticsearch-project-d63f88.es.us-central1.gcp.elastic.cloud:443";
const apiKey = "VGdaSEVKa0JmV0tiY2sxSlBmQWg6NFd1UFd0RGZBOGc3cFBHbUpWbDVYdw==";

// Check if credentials are still placeholders (optional but good practice)
if (esUrl.includes("YOUR_") || apiKey.includes("YOUR_")) {
  console.error("\nFATAL ERROR: Elasticsearch credentials are not set in app/api/search/route.ts. Please replace the placeholder values and restart the server.\n");
}

const client = new Client({
  node: esUrl,
  auth: { apiKey: apiKey },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const response = await client.search({
      index: 'search-a21l', // This is the correct index name
      body: {
        query: {
          bool: {
            should: [
              { multi_match: { query: query, fields: ['title^4', 'topic^3'], type: "phrase", boost: 4 } },
              { multi_match: { query: query, fields: ['title^3', 'topic^2', 'chapter', 'subject', 'teacher'], fuzziness: "AUTO", boost: 2 } },
              { multi_match: { query: query, fields: ['title', 'topic', 'chapter', 'subject'], type: "bool_prefix" } }
            ],
            minimum_should_match: 1
          }
        },
        aggs: {
          results_by_type: { terms: { field: "content_type" } },
          premium_split: { terms: { field: "is_premium" } }
        },
        highlight: { fields: { "*": {} } }
      }
    });

    const results = response.hits.hits.map((hit: any) => ({ ...hit._source, highlight: hit.highlight }));
    const aggregations = response.aggregations;

    return NextResponse.json({ results, aggregations });

  } catch (error: any) {
    console.error("\n--- ELASTICSEARCH API ERROR ---");
    if (error.meta && error.meta.body && error.meta.body.error) {
        console.error("Error details:", JSON.stringify(error.meta.body.error, null, 2));
    } else {
        console.error("Full error object:", error);
    }
    console.error("--- END ELASTICSEARCH API ERROR ---\n");
    
    return NextResponse.json({ error: 'An error occurred during search.', details: "Check server logs for more information." }, { status: 500 });
  }
}

