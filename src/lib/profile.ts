import { assetPath, basePath } from './site.ts'

export const locales = ['zh-TW', 'en'] as const

export type Locale = (typeof locales)[number]

export const isLocale = (value: string): value is Locale => locales.some(locale => locale === value)

export const projectSlugs = ['jurislm', 'nidin', 'vclass', 'gj', 'channel-t', 'backlight-memory'] as const

const skillItem = (zhTw: string, en: string) => ({ 'zh-TW': zhTw, en })

const skillGroups = [
  { title: { 'zh-TW': '程式語言', en: 'Programming languages' }, tags: ['JavaScript', 'TypeScript', 'PHP', 'Java'] },
  {
    title: { 'zh-TW': '網頁基礎', en: 'Web fundamentals' },
    tags: ['HTML', 'CSS', skillItem('語意化標記', 'Semantic markup'), 'DOM', skillItem('瀏覽器 API', 'Browser APIs')]
  },
  {
    title: { 'zh-TW': '前端框架與函式庫', en: 'Frontend frameworks and libraries' },
    tags: ['Vue.js', 'React.js', 'Angular', 'jQuery']
  },
  { title: { 'zh-TW': '應用框架', en: 'Application frameworks' }, tags: ['Nuxt', 'Next.js'] },
  { title: { 'zh-TW': '後端框架', en: 'Backend frameworks' }, tags: ['FastAPI', 'Laravel'] },
  {
    title: { 'zh-TW': 'AI 應用框架', en: 'AI application frameworks' },
    tags: ['LangChain', 'LangGraph', 'LlamaIndex', 'Haystack', 'Semantic Kernel']
  },
  {
    title: { 'zh-TW': '多代理框架', en: 'Multi-agent frameworks' },
    tags: ['AutoGen', 'CrewAI', 'OpenAI Agents SDK']
  },
  {
    title: { 'zh-TW': 'AI 開發 SDK', en: 'AI development SDKs' },
    tags: ['OpenAI SDK', 'Anthropic SDK', 'Vercel AI SDK']
  },
  {
    title: { 'zh-TW': '模型與推論工具', en: 'Models and inference tools' },
    tags: ['Hugging Face Transformers', 'Ollama', 'vLLM']
  },
  {
    title: { 'zh-TW': '向量資料庫／檢索工具', en: 'Vector databases and retrieval tools' },
    tags: ['Qdrant', 'Milvus', 'Weaviate', 'Chroma', 'FAISS', 'pgvector']
  },
  {
    title: { 'zh-TW': '評估與追蹤工具', en: 'Evaluation and tracing tools' },
    tags: ['LangSmith', 'Langfuse', 'Ragas', 'DeepEval', 'Promptfoo']
  },
  {
    title: { 'zh-TW': '樣式與 UI', en: 'Styling and UI' },
    tags: [
      'Sass／SCSS',
      'Tailwind CSS',
      'Bootstrap',
      'CSS Modules',
      skillItem('元件庫', 'Component libraries'),
      'Design System'
    ]
  },
  {
    title: { 'zh-TW': '狀態管理', en: 'State management' },
    tags: ['Pinia', 'Vuex', 'Redux', 'Zustand', 'TanStack Query']
  },
  { title: { 'zh-TW': '路由', en: 'Routing' }, tags: ['Vue Router', 'React Router'] },
  { title: { 'zh-TW': '建置工具', en: 'Build tools' }, tags: ['Vite', 'Webpack', 'Babel', 'Rollup'] },
  { title: { 'zh-TW': '套件管理', en: 'Package managers' }, tags: ['npm', 'pnpm', 'Yarn'] },
  { title: { 'zh-TW': '執行環境', en: 'Runtime environments' }, tags: ['Node.js', 'Bun'] },
  { title: { 'zh-TW': '資料庫', en: 'Databases' }, tags: ['Microsoft SQL Server'] },
  {
    title: { 'zh-TW': 'API 與即時通訊', en: 'APIs and realtime communication' },
    tags: ['REST API', 'GraphQL', 'WebSocket', 'SSE']
  },
  {
    title: { 'zh-TW': '測試工具', en: 'Testing tools' },
    tags: ['Vitest', 'Jest', 'Testing Library', 'Playwright', 'Cypress']
  },
  {
    title: { 'zh-TW': '程式碼品質', en: 'Code quality' },
    tags: ['ESLint', 'Prettier', skillItem('型別檢查', 'Type checking'), 'Code Review']
  },
  { title: { 'zh-TW': '版本控制', en: 'Version control' }, tags: ['Git'] },
  {
    title: { 'zh-TW': '程式碼託管平台', en: 'Code hosting platforms' },
    tags: ['GitHub', 'GitLab']
  },
  {
    title: { 'zh-TW': '持續整合與部署', en: 'Continuous integration and deployment' },
    tags: ['GitHub Actions', 'GitLab CI', 'Jenkins']
  },
  { title: { 'zh-TW': '容器工具', en: 'Container tools' }, tags: ['Docker'] },
  {
    title: { 'zh-TW': '雲端平台', en: 'Cloud platforms' },
    tags: ['Google Cloud Platform', 'AWS', 'Azure']
  },
  {
    title: { 'zh-TW': '部署平台', en: 'Deployment platforms' },
    tags: ['Vercel', 'Netlify', 'Cloudflare']
  },
  {
    title: { 'zh-TW': '效能與監控', en: 'Performance and monitoring' },
    tags: ['Chrome DevTools', 'Lighthouse', 'Core Web Vitals', 'Sentry', 'Google Analytics']
  },
  {
    title: { 'zh-TW': '前端實務', en: 'Frontend practices' },
    tags: [
      skillItem('響應式設計', 'Responsive design'),
      skillItem('無障礙設計', 'Accessibility'),
      'SEO',
      'SSR／SSG',
      'PWA',
      skillItem('跨瀏覽器相容', 'Cross-browser compatibility'),
      skillItem('前端安全', 'Frontend security')
    ]
  },
  { title: { 'zh-TW': '設計工具', en: 'Design tools' }, tags: ['Figma', 'Storybook'] },
  {
    title: { 'zh-TW': '協作工具', en: 'Collaboration tools' },
    tags: ['Notion', 'Slack', 'Jira', 'Linear']
  }
] as const

const skillsFor = (locale: Locale) =>
  skillGroups.map(({ title, tags }) => ({
    title: title[locale],
    tags: tags.map(tag => (typeof tag === 'string' ? tag : tag[locale]))
  }))

export const contact = {
  email: 'zxtw17985321@gmail.com',
  phone: '+886 931206500',
  phoneHref: 'tel:+886931206500',
  github: 'https://github.com/terry90918',
  linkedin: 'https://www.linkedin.com/in/tien-yi-chen-98812812a/',
  website: 'https://terry90918.github.io/cv/',
  photo: assetPath('/images/profile/tien-yi-chen.png')
}

export const profiles = {
  'zh-TW': {
    name: '陳天一',
    role: '自由工作者',
    greeting: '你好，我是',
    location: '台灣・新竹縣竹北市',
    description: '',
    labels: {
      about: '履歷重點',
      work: '專案經歷',
      experience: '工作經歷',
      skills: '技能',
      contact: '聯絡方式',
      contactDetails: '完整聯絡方式',
      theme: '切換深淺色',
      language: '切換語言',
      viewExperience: '查看經歷',
      aboutTitle: '經歷數據',
      workTitle: '履歷中的專案',
      experienceTitle: '經歷一覽',
      skillsTitle: '技能分類',
      education: '學歷',
      military: '兵役',
      contactTitle: '聯絡方式',
      contactDescription: '',
      backHome: '返回首頁',
      otherWork: '其他專案',
      otherWorkTitle: '其他專案',
      organisation: '組織',
      responsibility: '負責範圍',
      period: '專案期間',
      tools: '領域與技術',
      readCase: '閱讀案例',
      contents: '文章目錄',
      thanks: '謝謝你的來訪',
      notFound: '找不到這個頁面',
      notFoundDescription: '這個網址目前沒有對應的內容。',
      email: '電子郵件',
      phone: '電話',
      location: '所在地',
      website: '個人網站'
    },
    stats: [
      {
        value: '21.35M',
        label: '司法資料流程容量'
      },
      {
        value: '0.957',
        label: '20 次抽樣測試平均召回率'
      },
      {
        value: '8.2M',
        label: 'Nidin 平台會員'
      },
      {
        value: '10',
        label: '直接管理的工程團隊人數'
      }
    ],
    skills: skillsFor('zh-TW'),
    experiences: [
      {
        company: '',
        role: '自由工作者',
        period: '',
        kind: '',
        team: '',
        bullets: [],
        projects: [
          {
            name: 'JurisLM／仁大法律',
            period: '2025.06.05–2026.09.18',
            bullets: [
              '規劃並建置 JurisLM 台灣法律 AI 平台，提供法律問答、合約審閱與書狀草擬等服務，負責產品規劃、系統開發、資料處理與維運。',
              '建立可處理 2,135 萬筆司法資料的擷取與檢索流程；以混合搜尋改善查詢品質，20 次抽樣測試的平均召回率達 0.957。',
              '設計 22 項工具、3 項資料資源及多層認證機制，確保不同使用者的資料隔離。'
            ]
          },
          {
            name: '逆光記憶／藍穎餐飲',
            period: '2026.04–2026.08・4 個月',
            bullets: [
              '獨立建置品牌直營電商，整合產品內容、會員、線上訂購及營運後台，協助甜點品牌建立自有數位銷售通路。'
            ]
          },
          {
            name: 'Channel-T／途銳資訊',
            period: '2025.06–2025.10・5 個月',
            bullets: [
              '建立 Channel-T 旅遊產品平台，透過 API 串接多家旅行社系統，自動同步行程、價格與出團資訊，減少重複建檔。',
              '建立 AI 商品建檔流程，將 PDF 與圖片轉為可搜尋、可發布的行程頁，並提供品牌官網與行程推薦；平台後續公開成果顯示，行程頁建置約 30 秒、行政效率提升逾 80%。'
            ]
          }
        ]
      },
      {
        company: '雲仲資訊',
        role: '技術經理',
        period: '2021.05–2025.06',
        kind: '全職・4 年 2 個月',
        team: '直接管理 10 人',
        projects: [],
        bullets: [
          '主導 Nidin 多品牌點餐平台的尖峰流量設計，以排程佇列分批發送活動優惠券，搭配 API 流量控管，避免發券作業影響訂單服務；平台支撐 820 萬會員與每年 1,500 萬筆以上訂單。',
          '建立可依品牌需求設定的產品模組，主導 55 項交付，服務 400 多個餐飲品牌、萬間門市及大型連鎖品牌的海外據點。',
          '主導 BDMS、ECMS、CRM 等內部系統與點餐產品的架構規劃及開發，整合網站、LINE、iOS 與 Android 的訂單、會員及行銷流程。',
          '通過 LINE 技術資格考試與審核，推動公司取得指定技術合作夥伴資格，並帶領團隊推出 LINE Mini App；串接涵蓋逾六成 POS 市場的業者及支付、物流服務。',
          '建立以會員資料為基礎的客戶管理與行銷功能；平台服務品牌的平均回購率達 50% 以上、業績提升 30% 以上。平台支援的 2025 珍奶節觸及逾 100 萬使用者、售出 200 萬杯，參與品牌訂單金額成長 60～100%。',
          '作為資安團隊成員，參與推動 Nidin 通過 ISO／IEC 27001:2022 認證。',
          '直接管理 10 人工程團隊，導入 Slack、Notion 與敏捷開發流程，集中管理產品文件與技術知識，年均參與約 100 場面試。'
        ]
      },
      {
        company: '昕力資訊',
        role: '主任工程師',
        period: '2020.02–2021.04',
        kind: '全職・1 年 3 個月',
        team: '管理 20 人',
        projects: [],
        bullets: [
          '主導國家發展委員會檔案管理局「機關檔案管理資訊系統」整合建置與功能增修，帶領 20 人團隊完成新台幣 1,800 萬元專案。',
          '建置可搜尋上億筆檔案目錄的全文檢索服務，並串接民眾線上申請與繳費流程。',
          '串接民眾端 MyEGOV 會員登入，規劃機關後台帳號與角色權限，支援各機關自訂存取範圍及敏感檔案管理。',
          '建立大型檔案分段傳輸與近百張客製化報表的共用架構，支援後續功能擴充。',
          '制定開發與無障礙規範，負責需求拆解、架構決策、團隊分工、績效考核與招募。'
        ]
      },
      {
        company: '紅點子科技',
        role: '資深軟體工程師',
        period: '2019.05–2020.02',
        kind: '全職・10 個月',
        team: '',
        projects: [],
        bullets: [
          '核心負責 VClass 從零建置至上線，整合課程預售、講師合作、付款與數位學習交付，讓講師能先驗證需求再推出課程。',
          '所參與建置的平台上線後一年發展逾 10 種學習主題、吸引近 3 萬人購課；後續單一公開課於五天內吸引近 5,000 人報名。',
          '負責 VoiceTube Hero Web 維護與擴建，支撐約 3.5 萬名付費用戶的學習服務，並優化網站效能、搜尋能見度與後續開發效率。'
        ]
      },
      {
        company: '歐克斯科技',
        role: '資深軟體工程師',
        period: '2018.06–2019.05',
        kind: '全職・1 年',
        team: '',
        projects: [],
        bullets: [
          '參與 Ubee 房屋比價平台開發，整合房仲網站與政府公開資料，讓使用者搜尋及比較數十萬筆待售物件。',
          '參與設計並實作 Ubee 地圖找房功能，整合 Leaflet 與 Google Maps 的混合地圖架構，支援大量物件呈現、跨來源比價與區域行情查詢；優化跨裝置操作與顯示效能，並降低第三方地圖服務成本。',
          '參與建置匿名諮詢與經紀人媒合流程，協助使用者從物件比較進入專業服務。'
        ]
      },
      {
        company: '幹得好科技',
        role: '軟體工程師',
        period: '2018.02–2018.06',
        kind: '全職・5 個月',
        team: '',
        projects: [],
        bullets: [
          '共同創辦幹得好科技，獨立負責「GJ 即時上工」的產品規劃、技術架構與全端開發，完成網站、行動端及雲端服務上線；團隊進駐台大創創中心，產品於 Meet Taipei 展出。',
          '建置連結中小企業與短期工作者的即時媒合服務，提供職缺搜尋、薪資與工作條件公開及智慧推播；同步上線出勤管理、薪資計算與雙向評價，涵蓋招募到工作結算流程。'
        ]
      },
      {
        company: '聖恩全生涯',
        role: '軟體工程師',
        period: '2014.10–2017.11',
        kind: '全職・3 年 2 個月',
        team: '',
        projects: [],
        bullets: [
          '參與「聖恩生活護照」網路商城建置，整合商品、會員權益、回饋金、訂單及配送流程，支援既有實體服務據點的線上交易。',
          '參與聖恩 App 建置，提供購物、優惠、組織與獎金查詢及配送通知，讓會員透過手機使用核心服務。',
          '更新既有電商系統與響應式網站，改善跨裝置操作、效能及維護；導入版本控制與團隊協作流程。'
        ]
      }
    ],
    education: {
      school: '大葉大學',
      field: '材料科學與工程學系',
      period: '2008.06–2012.06'
    },
    military: '2012.09.05–2013.08.06'
  },
  en: {
    name: 'Tien Yi Chen',
    role: 'Freelancer',
    greeting: 'Hello, I’m',
    location: 'Zhubei, Hsinchu County, Taiwan',
    description: '',
    labels: {
      about: 'Career highlights',
      work: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
      contactDetails: 'Contact details',
      theme: 'Toggle theme',
      language: 'Switch language',
      viewExperience: 'View experience',
      aboutTitle: 'Experience metrics',
      workTitle: 'Projects from my résumé',
      experienceTitle: 'Work history overview',
      skillsTitle: 'Skills by category',
      education: 'Education',
      military: 'Military service',
      contactTitle: 'Contact details',
      contactDescription: '',
      backHome: 'Back to home',
      otherWork: 'Other projects',
      otherWorkTitle: 'Other projects',
      organisation: 'Organisation',
      responsibility: 'Responsibility',
      period: 'Project period',
      tools: 'Domains & technologies',
      readCase: 'Read case study',
      contents: 'Contents',
      thanks: 'Thank you for visiting',
      notFound: 'Page not found',
      notFoundDescription: 'There is no content at this address.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      website: 'Personal website'
    },
    stats: [
      {
        value: '21.35M',
        label: 'Judicial records pipeline capacity'
      },
      {
        value: '0.957',
        label: 'Average recall across 20 sampled tests'
      },
      {
        value: '8.2M',
        label: 'Nidin platform members'
      },
      {
        value: '10',
        label: 'Engineers directly managed'
      }
    ],
    skills: skillsFor('en'),
    experiences: [
      {
        company: '',
        role: 'Freelancer',
        period: '',
        kind: '',
        team: '',
        bullets: [],
        projects: [
          {
            name: 'JurisLM / 仁大法律',
            period: '2025.06.05–2026.09.18',
            bullets: [
              'Planned and built JurisLM, a Taiwanese legal AI platform for legal questions, contract review, and legal document drafting. Owned product planning, development, data processing, and operations.',
              'Built ingestion and retrieval workflows capable of handling 21.35 million judicial records. Hybrid search achieved an average recall of 0.957 across 20 sampled tests.',
              'Designed 22 tools, 3 data resources, and multiple authentication layers to isolate data between users.'
            ]
          },
          {
            name: '逆光記憶 / 藍穎餐飲',
            period: '2026.04–2026.08 · 4 months',
            bullets: [
              'Independently built a direct-to-consumer commerce platform for a dessert brand, connecting product content, memberships, online ordering, and an operations dashboard.'
            ]
          },
          {
            name: 'Channel-T / 途銳資訊',
            period: '2025.06–2025.10 · 5 months',
            bullets: [
              'Built a travel product platform that integrates multiple travel agencies through APIs and automatically synchronises itineraries, prices, and departure information.',
              'Built an AI product creation workflow that converts PDFs and images into searchable, publishable itinerary pages, alongside branded websites and recommendations. Later public platform results reported about 30 seconds per itinerary page and over 80% improvement in administrative efficiency.'
            ]
          }
        ]
      },
      {
        company: '雲仲資訊',
        role: 'Technical Manager',
        period: '2021.05–2025.06',
        kind: 'Full-time · 4 years 2 months',
        team: '10 direct reports',
        bullets: [
          'Led peak traffic architecture for Nidin, a multi-brand ordering platform. Batched promotional coupons through scheduled queues and API traffic controls to protect order services. The platform supported 8.2 million members and over 15 million orders annually.',
          'Built configurable product modules and led 55 deliveries, serving over 400 food and beverage brands, 10,000 stores, and overseas locations of major chains.',
          'Led architecture and development for BDMS, ECMS, CRM, and ordering products, connecting orders, memberships, and marketing across web, LINE, iOS, and Android.',
          'Passed LINE technical qualification exams and review, helped the company obtain designated technical partner status, and led the launch of a LINE Mini App. Integrated POS providers covering over 60% of the market, plus payment and logistics services.',
          'Built membership-based CRM and marketing features. Brands served by the platform averaged over 50% repeat purchase rates and over 30% sales growth. The 2025 bubble tea festival supported by the platform reached over 1 million users, sold 2 million cups, and increased participating brands’ order value by 60–100%.',
          'Contributed as a security team member to Nidin’s ISO/IEC 27001:2022 certification.',
          'Directly managed 10 engineers, introduced Slack, Notion, and agile workflows, centralised product documentation and technical knowledge, and participated in about 100 interviews annually.'
        ],
        projects: []
      },
      {
        company: '昕力資訊',
        role: 'Principal Engineer',
        period: '2020.02–2021.04',
        kind: 'Full-time · 1 year 3 months',
        team: 'Managed 20 engineers',
        bullets: [
          'Led integration and enhancement of the Archives Management Information System for the National Archives Administration, National Development Council. Led a 20-person team to deliver an NT$18 million project.',
          'Built full-text search across over 100 million archival catalogue records and integrated public online applications and payments.',
          'Integrated MyEGOV sign-in for public users and designed back-office accounts and role permissions, supporting agency-specific access scopes and sensitive archive management.',
          'Created a shared architecture for chunked large-file transfers and nearly 100 customised reports to support future enhancements.',
          'Established development and accessibility standards and owned requirements breakdown, architecture decisions, team allocation, performance reviews, and recruitment.'
        ],
        projects: []
      },
      {
        company: '紅點子科技',
        role: 'Senior Software Engineer',
        period: '2019.05–2020.02',
        kind: 'Full-time · 10 months',
        team: '',
        bullets: [
          'Took a core role in building VClass from zero to launch, integrating course presales, instructor collaboration, payments, and digital learning delivery so instructors could validate demand before launching courses.',
          'Within a year of launch, the platform I helped build grew to over 10 learning topics and nearly 30,000 course buyers. A later public course attracted nearly 5,000 registrations in five days.',
          'Maintained and expanded VoiceTube Hero Web for approximately 35,000 paying users, improving performance, search visibility, and development efficiency.'
        ],
        projects: []
      },
      {
        company: '歐克斯科技',
        role: 'Senior Software Engineer',
        period: '2018.06–2019.05',
        kind: 'Full-time · 1 year',
        team: '',
        bullets: [
          'Contributed to Ubee, a housing price comparison platform combining real estate websites and government open data to search and compare hundreds of thousands of listings.',
          'Helped design and implement map-based property search using a hybrid Leaflet and Google Maps architecture. Supported large listing volumes, cross-source comparisons, and regional market queries while improving cross-device performance and reducing third-party map costs.',
          'Helped build anonymous consultation and agent matching workflows connecting property comparison with professional services.'
        ],
        projects: []
      },
      {
        company: '幹得好科技',
        role: 'Software Engineer',
        period: '2018.02–2018.06',
        kind: 'Full-time · 5 months',
        team: '',
        bullets: [
          'Co-founded 幹得好科技 and independently owned product planning, architecture, and full-stack development for GJ Instant Work, launching web, mobile, and cloud services. The team joined the NTU Entrepreneurship Center and exhibited at Meet Taipei.',
          'Built real-time matching for small businesses and short-term workers, including job search, transparent pay and working conditions, smart notifications, attendance, payroll, and two-way reviews.'
        ],
        projects: []
      },
      {
        company: '聖恩全生涯',
        role: 'Software Engineer',
        period: '2014.10–2017.11',
        kind: 'Full-time · 3 years 2 months',
        team: '',
        bullets: [
          'Helped build the 聖恩生活護照 online store, connecting products, member benefits, cashback, orders, and delivery to support existing physical service locations.',
          'Helped build the mobile app for shopping, promotions, organisation and bonus queries, and delivery notifications.',
          'Modernised existing commerce systems and responsive websites, improving cross-device usability, performance, and maintenance while introducing version control and team collaboration.'
        ],
        projects: []
      }
    ],
    education: {
      school: 'Da-Yeh University',
      field: 'Materials Science and Engineering',
      period: '2008.06–2012.06'
    },
    military: '2012.09.05–2013.08.06'
  }
}

export type Profile = typeof profiles.en

export function localeHref(pathname: string, locale: Locale, hash = ''): string {
  const path = basePath && pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname
  const localizedPath = path === '/' || path === '' ? '/zh-TW' : path

  const chapters = [
    ['背景與需求', 'context-requirements'],
    ['我的角色', 'my-role'],
    ['實作與交付', 'implementation-delivery'],
    ['成果', 'outcomes']
  ]

  const fragment = hash.replace(/^#/, '')

  const chapter = chapters.find(pair =>
    pair.some(value => value === fragment || encodeURIComponent(value) === fragment)
  )

  const anchor = chapter ? chapter[locale === 'en' ? 1 : 0] : fragment

  return localizedPath.replace(/^\/(zh-TW|en)(?=\/|$)/, `/${locale}`) + (anchor ? `#${anchor}` : '')
}
