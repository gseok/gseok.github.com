---
title: Gatsby RSS Feed 추가하기
date: 2022-08-15 6:35:00
author: gseok
categories: tech-talk
tags: gatsby
---

### 소개

gatsby에서 stie의 [RSS](https://namu.wiki/w/RSS) feed을 생성하는 방법을 소개합니다.

### 방법

gatsby는 기본적으로 plugin구조를 가지고 있어 여러 기능을 추가 할 수 있습니다. RSS Feed을 추가하는 기능 역시 plugin으로 존재합니다. gatsby 공식 사이트에서 `rss` 로 [plugin을 검색](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/?=rss)해보면 여러 RSS Feed plugin이 존재하는것을 볼 수 있습니다.

각 plugin은 각각의 설정 방법을 따라서 설치 및 RSS Reed을 생성해야 합니다. 본 소개에서는, 사용자 커스텀 plugin(community plugin)이 아닌, gatsby공식 plugin인 `gatsby-plugin-feed` 을 사용하여 rss을 생성하는 방법을 설명합니다.

### gatsby-plugin-feed 설치

npm 이나 yarn 을 사용하여 plugin을 설치합니다.

```bash
npm install gatsby-plugin-feed
```

또는

```bash
yarn add gatsby-plugin-feed
```

### gatsby-plugin-feed 설정

plugin을 설치 후 gatsby-config.js 파일 및 gatsby-node.js파일에 gatsby-plugin-feed 사용 설정을 추가해주어야 합니다.

**gatsby-config.js 설정**

```jsx
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  // 사이트 주소(post 주소포함)에 한글이 있는경우 encodeURI을 사용합니다.
                  // slug는 사이트의 post주소을 이름으로 씁니다. gatsby-node.js와 연관 있습니다.
                  url: encodeURI(site.siteMetadata.siteUrl + node.fields.slug),
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            // 최종 rss feed파일 입니다. 디렉토리가 다르거나, 이름이 다른경우 설정 가능합니다.
            output: "/rss.xml",
            // 본인의 blog rss feed용 타이틀을 명시합니다.
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // 전체 site주소에서 특정 주소 패턴만 rss feed생성해주는 부분입니다. 옵션널한 설정으로, 전체 사이트 rss시에는 제거해도 무방합니다.
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // feedburner같은 외부 rss feed서비스 사용시에 씁니다. 미사용시 제거합니다.
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
}
```

**gatsby-node.js 설정**

```jsx
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

- gatsby-config.js의  plugin설정에서 사용(query, feed등)하는 slug등와 같은 값은 gatsby-node.js에서 초기화 됩니다. 따라서 gatsby-node.js에 위와 같은 설정이 없다면 추가해주어야 합니다.

**주의사항**

💡 주의!
> [Gatsby공식 문서](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/)에 단순 “plugins: [`gatsby-plugin-feed`]” 설정만 `gatsby-config.js`파일에 추가 하여도 된다고 되어있는데, 이경우 아래와 같은 에러가 발생 할 수 있습니다. 따라서 해당 에러 발생시, Plugin사용 설정을 Full(Customizing the rss feed plugin)형태로 해주어야 합니다.

```bash
에러 예시

ERROR #11331  PLUGIN

Invalid plugin options for "gatsby-plugin-feed":

-"feeds" is required
```

</aside>

### RSS Feed 파일 생성(RSS.xml) 확인하기

```jsx
gatsby clean && gatsby build
```

명령어를 통해서, clean 상태에서 gatsby build을 구동하여 rss.xml파일 생성을 확인 할 수 있습니다.

추가적으로 아래 명령어를 통하여 local 개발 환경에서 build 및 serve을 하고 실제 주소에 접속하여 rss feed을 확인 할 수 있습니다.

```jsx
gatsby clean && gatsby build && gatsby serve
```

- 정상 구동시 [http://localhost:9000/rss.xml](http://localhost:9000/rss.xml) 에 접속하여 rss.xml 확인이 가능합니다.
- 만약 gatsby-config.js 파일에서 rss.xml 위치나 이름을 다르게 하였다면 변경한 주소 및 이름을 사용하여 확인하여야 합니다.

### RSS Feed 정상 확인하기

RSS Feed가 정상 생성되었는지 확인하는 방법 입니다. 보통 영어권 사용에, Gatsby나 Jeklly이 기본 혹은 공식으로 제공하는 plugin을 활용하면 거의 정상적인  RSS Feed파일(rss.xml)이 생성됩니다.

만약 RSS Feed을 커스터마이징 하여, 해당 파일의 정상 여부를 확인하고 싶을때 추가적으로 사용할수 있는 방법 입니다.

**W3C에서 제공하는 RSS Feed Validation Service 로 검증하기**

- Feed의 정상적인 Syntax(RSS, Atom), 사용을 검증합니다.
- [Feed Validatin Service(W3C)](https://validator.w3.org/feed/)

**Online Feed Viewer로 검증하기**

- Online에 존재하는 Feed Viewer을 사용하여, 정상적으로 Feed가 노출되나 검증합니다.
- google 등에서 `rss feed reader online` 등과 같은 검색어로 검색 이후, 나오는 여러 Online Feed Viewer을 사용하여 정상 인식되나 확인합니다.

### 참고

- [https://namu.wiki/w/RSS](https://namu.wiki/w/RSS)
- [https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/)
- [https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/)