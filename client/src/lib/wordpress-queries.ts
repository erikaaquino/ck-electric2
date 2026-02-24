export const GET_ALL_POSTS = `
  query GetAllPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        content
        excerpt
        date
        modified
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      modified
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_ALL_PAGES = `
  query GetAllPages($first: Int, $after: String) {
    pages(first: $first, after: $after) {
      nodes {
        id
        title
        slug
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = `
  query GetAllCategories {
    categories {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

export const NEW_QUERY = `
  query NewQuery {
    posts {
      nodes {
        heroSection {
          subtitle
          title
        }
        id
      }
    }
  }
`;

export const GET_ALL_PROJECTS = `
  query GetAllProjects {
    projects {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            id
            sourceUrl
            altText
          }
        }
        projectFields {
          fieldGroupName
          specifications {
            coverageArea
            fieldGroupName
            responseTime
            warranty
          }
          mainContentSection
        }
      }
    }
  }
`;

export const GET_PROJECT_BY_SLUG = `
  query GetProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          id
          sourceUrl
          altText
        }
      }
      seo {
        canonical
        cornerstone
        focuskw
        fullHead
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphSiteName
        opengraphTitle
        opengraphType
        opengraphUrl
        readingTime
        title
      }
      projectFields {
        fieldGroupName
        specifications {
          coverageArea
          fieldGroupName
          responseTime
          warranty
        }
        mainContentSection
      }
    }
  }
`;
