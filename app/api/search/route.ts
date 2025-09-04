// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { Client } from '@elastic/elasticsearch';

// (Your client initialization code remains the same)
const client = new Client({
  node: process.env.ELASTIC_URL || "https://my-elasticsearch-project-d63f88.es.us-central1.gcp.elastic.cloud:443",
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "VGdaSEVKa0JmV0tiY2sxSlBmQWg6NFd1UFd0RGZBOGc3cFBHbUpWbDVYdw==",
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

// Inside app/api/search/route.ts

try {
  const response = await client.search({
    // FIX #1: Use the correct index name
    index: 'search-a21l', 
    
    // FIX #2: Corrected structure - no body parameter
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: query,
              fields: ['title', 'subject', 'chapter', 'teacher', 'program'],
              fuzziness: "AUTO",
              boost: 2 
            }
          },
          {
            multi_match: {
                query: query,
                fields: ['title', 'subject', 'chapter', 'teacher', 'program'],
                type: "bool_prefix"
            }
          }
        ]
      }
    }
  });

  const results = response.hits.hits.map((hit: any) => ({
    ...hit._source,
    highlight: hit.highlight // Include highlights for search term highlighting
  }));
  
  return NextResponse.json({
    results: results,
    aggregations: response.aggregations || null
  });

} catch (error) {
  console.error("Elasticsearch query failed:", error);
  return NextResponse.json({ error: 'An error occurred while fetching search results' }, { status: 500 });
}
}