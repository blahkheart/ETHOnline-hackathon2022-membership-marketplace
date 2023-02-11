import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

// export const subgraphURI = "https://api.thegraph.com/subgraphs/name/blahkheart/members-hub-goerli";
export const subgraphURI = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

export const apolloClient = new ApolloClient({
  uri: subgraphURI,
  cache: new InMemoryCache(),
});

export const tagQuery = `
  {
    tags {
      id
      name
      creator {
        address
      }
      memberships {
        id
        membershipAddress
        creator
      }
    }
  }
  `;

export const membershipQuery = `
  {
    memberships(first: 25, orderBy: createdAt, orderDirection: asc) {
      id
      membershipAddress
      relatedTags {
        id
        name
      }
      creator {
        address
      }
    }
  }
  `;

const tagCreatorQuery = `
  {
    tagCreators(first: 25, orderBy: createdAt, orderDirection: asc) {
      id
      address
      tagsCount 
    }
  }
  `;

const broadcasterQuery = `
  {
    broadcasters(first: 25, orderBy: createdAt, orderDirection: asc) {
      id
      address
      membershipCount
      memberships {
        membershipAddress
      } 
    }
  }
  `;

export const EXAMPLE_GRAPHQL = `
  {
    orders(first: 25, orderBy: createdAt, orderDirection: desc) {
      id
      createdAt
      creator {
        address
      }
      vendor {
        address
      }
      amount
    }
    customers {
      id
      address
    }
    orderCounters{
      ordersCount
    }
  }
  `;

export const gqlTagsQuery = gql`
  {
    tags {
      id
      name
      creator {
        address
      }
      memberships {
        id
        membershipAddress
        creator
      }
    }
  }
`;

export const testVarQuery = gql`
  query ($where: String) {
    memberships(where: { relatedTags_contains: [$where] }) {
      id
      membershipAddress
      relatedTags {
        id
        name
      }
      creator {
        address
      }
    }
  }
`;
