module.exports = {
  title: `Gseok Blog`,
  description: `GyeongSeok Seo story`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://gseok.github.io`,
  ogImage: `https://gseok.github.io/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `gseok/gseok.github.com`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: 'UA-38849338-1', // Google Analytics Tracking ID
  author: {
    name: `서경석`,
    bio: {
      role: `개발자`,
      description: [
        '기술탐구를 좋아하는',
        '사람에 가치를 두는',
        '능동적으로 일하는',
        '기술 공유를 좋아하는',
        '이로운 것을 만드는',
      ],
      thumbnail: 'gseok.jpeg', // Path to the image in the 'asset' folder
      gravata: `https://www.gravatar.com/avatar/f667bba300015ff621f1b4f30f900cc1?s=250&r=x`,
    },
    social: {
      github: `https://github.com/gseok`,
      linkedIn: `https://www.linkedin.com/in/gyeongseok-seo-77607510a/`,
      email: `gseok.seo@gmail.com`,
      person: `https://gseok.github.io/ppt/aboutme`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.02 ~',
        activity: '개인 블로그 개발 및 운영',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '개발 블로그 테마 개발',
        description:
          '개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.',
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'blog.png',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
    ],
  },
};