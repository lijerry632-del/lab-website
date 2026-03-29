export const navbarData = {
  homeTitle: '课题组汇报平台',
}

export const footerData = {
  author: '杨老师课题组',
  aboutAuthor: '本平台用于课题组内部周报提交、成员成果展示及科研资源共享。',
  authorInterest: '研究方向',
}

export const homePage = {
  title: '课题组汇报平台',
  description: ' ',
}

export const blogsPage = {
  title: '周报归档',
  description: '在此查看课题组所有成员的历史周报记录。',
}

export const categoryPage = {
  title: '资料共享',
  description: '课题组资料共享',
}

export const aboutPage = {
  title: '关于课题组',
  description: '方向.....',
  aboutMe:
    '欢迎来到我们的课题组汇报平台。本实验室致力于计算机视觉与民用工程的交叉研究，目前拥有成员 10 余名。本平台通过 Markdown 驱动，支持公式渲染与代码高亮，方便导师随时掌握科研进度。',
}

export const seoData = {
  title: `课题组汇报平台 | Lab Management System`,
  ogTitle: `课题组科研协作与汇报平台`,
  description: `成员实名展示、周报提交、导师点评及科研资源共享一站式平台。`,
  twitterDescription: `课题组科研协作与汇报平台`,
  image: '/site-logo.png', // 建议在 public 文件夹放一张校徽图片
  mySite: 'https://your-lab-site.com',
  twitterHandle: '@lab-admin',
}

export const socialLinks = {
  githubLink: 'https://https://github.com/lijerry632-del/lab-website', // 课题组 GitHub 主页
  linkedinLink: '#',
  twitterLink: '#',
  stackoverflowLink: '#',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
