import HeroClient from './_components/hero-client'
import FeaturesClient from './_components/features-client'
import ParticleBackground from './_components/particle-background'
import CountryPavilionClient from './_components/country-pavilion-client'
import GlobeSection from './_components/globe-section'
import SolutionsSection from './_components/solutions-section'
import ProductPlatform from './_components/product-platform'
import EnterpriseStats from './_components/enterprise-stats'

const BASE_URL = 'https://ibcbarter.com'

function JsonLd({ locale }: { locale: string }) {
  const isZh = locale === 'zh-CN'
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'IBC AI Trade OS',
        alternateName: isZh ? 'IBC 易货贸易操作系统' : 'IBC Barter',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
        },
        description: isZh
          ? '以中国为核心交易枢纽的 AI 跨境易货贸易平台，连接全球供需双方'
          : 'AI-powered cross-border barter trade platform with China as the core hub, connecting global buyers and sellers',
        foundingDate: '2023',
        foundingLocation: 'Hong Kong',
        areaServed: 'Worldwide',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
        sameAs: ['https://skyw.group'],
        parentOrganization: {
          '@type': 'Organization',
          name: 'SkyW Capital',
          url: 'https://skyw.group',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'IBC AI Trade OS',
        publisher: { '@id': `${BASE_URL}/#organization` },
        inLanguage: ['zh-CN', 'en'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/${locale}/opportunities?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${locale}/#webpage`,
        url: `${BASE_URL}/${locale}`,
        name: isZh ? 'IBC AI 易货贸易操作系统 - 全球跨境AI易货交易平台' : 'IBC AI Trade OS - Global Cross-border AI Barter Trading Platform',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
        inLanguage: locale,
      },
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/#service`,
        name: isZh ? 'AI 跨境易货贸易撮合服务' : 'AI Cross-border Barter Trade Matching',
        provider: { '@id': `${BASE_URL}/#organization` },
        serviceType: isZh ? '易货贸易 / 跨境贸易撮合' : 'Barter Trade / Cross-border Trade Matching',
        areaServed: 'Worldwide',
        description: isZh
          ? 'AI 驱动的跨境易货贸易平台，提供智能匹配、定价验证、多元结算服务'
          : 'AI-driven cross-border barter platform offering smart matching, pricing validation, and multi-currency settlement',
      },
      {
        '@type': 'FAQPage',
        mainEntity: isZh
          ? [
              {
                '@type': 'Question',
                name: '什么是跨境易货贸易？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '跨境易货贸易（Barter Trade）是指企业之间以货换货、以服务换货物的贸易方式，无需全额美元结算。IBC 平台通过 AI 智能匹配，帮助全球企业找到合适的易货对手方，完成真实贸易成交。',
                },
              },
              {
                '@type': 'Question',
                name: 'IBC AI Trade OS 如何帮助企业降低美元依赖？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC 平台支持 USDT/USDC/CNHC 等多链稳定币结算，同时提供易货抵扣、托管支付和组合结算路径，企业可将美元结算比例从 100% 降低至 30% 以下，大幅节省汇率损耗和中间行手续费。',
                },
              },
              {
                '@type': 'Question',
                name: '平台如何进行 AI 智能匹配？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC 的 AI 匹配引擎基于企业画像、商品标签、历史交易记录和实时市场数据，自动识别供需双方的最优匹配对，并给出匹配度评分、价格参考和风险提示，全程无需人工介入。',
                },
              },
              {
                '@type': 'Question',
                name: '哪些行业适合使用易货贸易？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC 平台覆盖矿产资源、能源化工、农业大宗、纺织轻工、机械设备、电子元器件、建材钢铁、医药健康八大核心行业，尤其适合有大量库存积压、季节性产能过剩或外汇管制困扰的企业。',
                },
              },
              {
                '@type': 'Question',
                name: '如何在 IBC 平台免费入驻？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '点击平台首页「免费入驻」按钮，填写企业基本信息、上传营业执照、描述供给与采购需求，完成认证后即可免费发布供需、进入 AI 匹配池，无任何前期费用。',
                },
              },
            ]
          : [
              {
                '@type': 'Question',
                name: 'What is cross-border barter trade?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cross-border barter trade is a business exchange where companies trade goods or services directly without full USD payment. IBC\'s AI matching platform connects global enterprises to find compatible barter partners and complete real trade deals.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does IBC AI Trade OS reduce USD dependency?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC supports multi-chain stablecoin settlement (USDT/USDC/CNHC), barter offsets, escrow payments, and hybrid settlement paths. Enterprises can reduce USD exposure from 100% to under 30%, saving significant FX losses and correspondent bank fees.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does the AI smart matching work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC\'s AI matching engine analyzes enterprise profiles, product tags, trade history, and real-time market data to identify optimal supply-demand matches. It provides match scores, price references, and risk flags — fully automated without human intervention.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which industries are best suited for barter trade?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IBC covers 8 core industries: minerals, energy & chemicals, agricultural commodities, textiles, machinery, electronics, steel & construction, and pharmaceuticals. It\'s ideal for businesses with excess inventory, seasonal overcapacity, or foreign exchange restrictions.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I join IBC for free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Click "Get Started Free" on the homepage, fill in your company details, upload your business license, and describe your supply and procurement needs. After verification, you can post supply/demand and enter the AI matching pool at zero cost.',
                },
              },
            ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh-CN'

  const t = {
    nav: {
      onboarding: isZh ? '企业入驻' : 'Onboarding',
      supply: isZh ? '发布供给' : 'Post Supply',
      demand: isZh ? '发布需求' : 'Post Demand',
      countries: isZh ? '国别馆' : 'Countries',
    },
    hero: {
      badge: isZh ? 'AI 驱动 · 全球互联 · 中国枢纽' : 'AI-Powered · Globally Connected · China Hub',
      title: isZh ? '全球跨境易货贸易' : 'Global Cross-border Barter Trade',
      titleHighlight: isZh ? 'AI 操作系统' : 'AI Operating System',
      subtitle: isZh
        ? '以中国为核心交易枢纽，连接全球供需双方。AI 辅助匹配、定价、谈判，降低美元依赖，打通履约与结算闭环。'
        : 'China as the core trading hub, connecting global buyers and sellers. AI-assisted matching, pricing, and negotiation — reducing USD dependency and closing the trade fulfillment loop.',
      ctaPrimary: isZh ? '免费入驻' : 'Get Started Free',
      ctaSecondary: isZh ? '了解平台' : 'Explore Platform',
    },
    stats: [
      { value: '1,200+', label: isZh ? '已服务企业' : 'Enterprises Served' },
      { value: '$2.4B+', label: isZh ? '累计撮合交易' : 'Trade Facilitated' },
      { value: '58', label: isZh ? '覆盖国家与地区' : 'Countries & Regions' },
      { value: '99.2%', label: isZh ? '履约完成率' : 'Fulfillment Rate' },
    ],
    features: {
      title: isZh ? '六大核心能力' : 'Six Core Capabilities',
      subtitle: isZh ? '从招引到成交，AI 驱动每一个环节' : 'AI drives every step from attraction to deal closure',
      items: [
        {
          icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'from-blue-500 to-cyan-500',
          title: isZh ? '全球招引' : 'Global Attraction',
          desc: isZh ? '多语言国际门户，精准吸引想与中国交易的全球合作伙伴' : 'Multilingual portal that draws global partners who want to trade with China',
        },
        {
          icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
          color: 'from-violet-500 to-purple-600',
          title: isZh ? 'AI 智能匹配' : 'AI Smart Matching',
          desc: isZh ? '基于企业画像与商品标签，AI 实时撮合全球供需双方' : 'Enterprise profiles and product tags power real-time AI supply-demand matching',
        },
        {
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'from-amber-400 to-orange-500',
          title: isZh ? 'AI 定价验值' : 'AI Pricing & Valuation',
          desc: isZh ? 'AI 辅助大宗商品定价，货值验证，降低信息不对称摩擦' : 'AI-assisted commodity pricing and cargo valuation to reduce information asymmetry',
        },
        {
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
          color: 'from-emerald-500 to-teal-500',
          title: isZh ? 'AI 谈判推进' : 'AI Negotiation',
          desc: isZh ? '智能生成谈判策略，自动推进意向对话直至成交确认' : 'Intelligent negotiation strategies auto-advance conversations to deal confirmation',
        },
        {
          icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
          color: 'from-rose-500 to-pink-500',
          title: isZh ? '多元结算' : 'Multi-currency Settlement',
          desc: isZh ? '降低美元依赖，支持人民币、多币种及稳定币结算' : 'Reduce USD dependency with RMB, multi-currency, and stablecoin settlement options',
        },
        {
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'from-sky-500 to-indigo-500',
          title: isZh ? '履约闭环' : 'Fulfillment Loop',
          desc: isZh ? '订单、合同、单证、供应链金融全链路一体化管理' : 'Orders, contracts, documents, and supply chain finance — all in one platform',
        },
      ],
    },
    cases: {
      title: isZh ? '合作案例' : 'Partnership Cases',
      subtitle: isZh ? '真实成交，见证 AI 贸易的力量' : 'Real deals, powered by AI trade intelligence',
      items: [
        {
          flag: '🇧🇷',
          country: isZh ? '巴西' : 'Brazil',
          company: isZh ? '圣保罗农业集团' : 'São Paulo Agri Group',
          category: isZh ? '大宗农产品' : 'Bulk Agri Commodities',
          amount: '$3.2M',
          desc: isZh
            ? '通过 AI 匹配对接中国饲料加工企业，完成大豆易货交易，人民币结算，节省汇率损耗约 4%'
            : 'AI-matched a Chinese feed-processing firm, completed soy barter deal in RMB, saving ~4% in FX costs',
        },
        {
          flag: '🇿🇦',
          country: isZh ? '南非' : 'South Africa',
          company: isZh ? '约翰内斯堡矿产商' : 'Johannesburg Minerals Co.',
          category: isZh ? '矿产资源' : 'Mineral Resources',
          amount: '$5.8M',
          desc: isZh
            ? 'AI 定价引擎验证铬矿货值，3 天完成报价-谈判-合同，较传统流程缩短 70%'
            : 'AI pricing engine validated chromite ore value; quote-to-contract in 3 days — 70% faster than traditional',
        },
        {
          flag: '🇻🇳',
          country: isZh ? '越南' : 'Vietnam',
          company: isZh ? '河内电子制造商' : 'Hanoi Electronics Mfr.',
          category: isZh ? '电子元器件' : 'Electronic Components',
          amount: '$1.9M',
          desc: isZh
            ? '通过国别馆发布供给，AI 精准推送至 12 家中国采购商，最终成交 3 单'
            : 'Posted supply via Country Pavilion; AI pushed to 12 Chinese buyers, 3 deals closed',
        },
      ],
    },
    hotOpportunities: {
      title: isZh ? '热门商机' : 'Hot Opportunities',
      subtitle: isZh ? '实时供需，AI 持续更新' : 'Real-time supply & demand, AI-updated',
      items: [
        { type: isZh ? '供给' : 'Supply', flag: '🇦🇺', tag: isZh ? '铁矿石' : 'Iron Ore', qty: '50,000 MT', price: '$85/MT', country: isZh ? '澳大利亚' : 'Australia' },
        { type: isZh ? '需求' : 'Demand', flag: '🇮🇩', tag: isZh ? '纺织品' : 'Textiles', qty: '200,000 m', price: '$2.8/m', country: isZh ? '印度尼西亚' : 'Indonesia' },
        { type: isZh ? '供给' : 'Supply', flag: '🇷🇺', tag: isZh ? '木材' : 'Timber', qty: '10,000 m³', price: '$320/m³', country: isZh ? '俄罗斯' : 'Russia' },
        { type: isZh ? '需求' : 'Demand', flag: '🇳🇬', tag: isZh ? '机械设备' : 'Machinery', qty: '50 units', price: '$28,000/u', country: isZh ? '尼日利亚' : 'Nigeria' },
        { type: isZh ? '供给' : 'Supply', flag: '🇨🇱', tag: isZh ? '铜矿' : 'Copper Ore', qty: '8,000 MT', price: '$9,200/MT', country: isZh ? '智利' : 'Chile' },
        { type: isZh ? '需求' : 'Demand', flag: '🇵🇰', tag: isZh ? '电子元件' : 'Electronics', qty: '100,000 pcs', price: '$12/pc', country: isZh ? '巴基斯坦' : 'Pakistan' },
      ],
    },
    trust: {
      title: isZh ? '安全可信的贸易平台' : 'A Trusted Trade Platform',
      subtitle: isZh ? '每一笔交易，都有制度保障' : 'Every transaction, backed by institutional safeguards',
      items: [
        {
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
          title: isZh ? 'ISO 27001 认证' : 'ISO 27001 Certified',
          desc: isZh ? '国际信息安全管理体系认证' : 'International information security certification',
        },
        {
          icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
          title: isZh ? '合规结算' : 'Compliant Settlement',
          desc: isZh ? '符合多国外汇监管要求' : 'Multi-jurisdiction FX compliance',
        },
        {
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          title: isZh ? '数据加密' : 'Data Encryption',
          desc: isZh ? '端到端 TLS 1.3 + 存储加密' : 'End-to-end TLS 1.3 + at-rest encryption',
        },
        {
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
          title: isZh ? '企业实名认证' : 'Enterprise KYC',
          desc: isZh ? '全链路企业身份核验体系' : 'Full-chain enterprise identity verification',
        },
      ],
    },
    about: {
      badge: isZh ? 'SkyW Capital 战略支持' : 'Backed by SkyW Capital',
      title: isZh ? '专为全球跨境贸易而生' : 'Built for Global Cross-border Trade',
      subtitle: isZh
        ? 'IBC AI Trade OS 由天汇资本（SkyW Capital）投资孵化，依托其在大宗商品、能源、黄金及跨境金融领域的深厚资源，打造面向全球的 AI 贸易操作系统。'
        : 'IBC AI Trade OS is backed by SkyW Capital, leveraging deep resources in commodities, energy, gold, and cross-border finance to build a globally-focused AI trade operating system.',
      highlights: [
        { value: '15+', label: isZh ? '年跨境贸易经验' : 'Years of Trade Experience' },
        { value: '20+', label: isZh ? '全球合作金融机构' : 'Global Financial Partners' },
        { value: '6', label: isZh ? '核心业务板块' : 'Core Business Divisions' },
        { value: 'HK/SG', label: isZh ? '双总部布局' : 'Dual HQ: HK & SG' },
      ],
      divisions: [
        { icon: '⚡', name: isZh ? '能源贸易' : 'Energy Trading', desc: isZh ? '石油、天然气、煤炭大宗能源跨境撮合' : 'Cross-border deal-making in oil, gas & coal' },
        { icon: '🥇', name: isZh ? '黄金贵金属' : 'Gold & Precious Metals', desc: isZh ? '黄金现货、合约与跨境实物配送' : 'Gold spot, contracts & cross-border delivery' },
        { icon: '📈', name: isZh ? '基金管理' : 'Fund Management', desc: isZh ? '私募基金、LP 权益与跨境资产配置' : 'Private funds, LP equity & cross-border allocation' },
        { icon: '🏦', name: isZh ? 'IPO 锚定' : 'IPO Anchoring', desc: isZh ? '港股 IPO 基石、锚定投资与市值管理' : 'HK IPO cornerstone, anchoring & market cap mgmt' },
        { icon: '🛡️', name: isZh ? '信用保险' : 'Credit Guarantee', desc: isZh ? '跨境贸易信保、履约担保与融资增信' : 'Trade credit insurance, performance bonds & financing' },
        { icon: '🌐', name: isZh ? '跨境结算' : 'Cross-border Settlement', desc: isZh ? '人民币、多币种及稳定币结算通道' : 'RMB, multi-currency & stablecoin payment corridors' },
      ],
    },
    industries: {
      title: isZh ? '覆盖八大核心行业' : 'Eight Core Industry Verticals',
      subtitle: isZh ? '从资源到制造，全链路 AI 贸易能力' : 'From resources to manufacturing — full-chain AI trade capabilities',
      items: [
        { emoji: '🏭', name: isZh ? '矿产资源' : 'Minerals & Mining', count: isZh ? '1,200+ 供应商' : '1,200+ Suppliers' },
        { emoji: '⚡', name: isZh ? '能源化工' : 'Energy & Chemicals', count: isZh ? '380+ 供应商' : '380+ Suppliers' },
        { emoji: '🌾', name: isZh ? '农业大宗' : 'Agri Commodities', count: isZh ? '2,100+ 供应商' : '2,100+ Suppliers' },
        { emoji: '🧵', name: isZh ? '纺织轻工' : 'Textiles & Light Mfr', count: isZh ? '950+ 供应商' : '950+ Suppliers' },
        { emoji: '🔩', name: isZh ? '机械设备' : 'Machinery & Equipment', count: isZh ? '620+ 供应商' : '620+ Suppliers' },
        { emoji: '💡', name: isZh ? '电子元器件' : 'Electronics & Components', count: isZh ? '780+ 供应商' : '780+ Suppliers' },
        { emoji: '🏗️', name: isZh ? '建材钢铁' : 'Steel & Construction', count: isZh ? '430+ 供应商' : '430+ Suppliers' },
        { emoji: '🏥', name: isZh ? '医药健康' : 'Pharma & Health', count: isZh ? '290+ 供应商' : '290+ Suppliers' },
      ],
    },
    insights: {
      title: isZh ? '行业洞察' : 'Industry Insights',
      subtitle: isZh ? '来自 IBC 研究团队的全球贸易动态' : 'Global trade intelligence from the IBC research team',
      readMore: isZh ? '阅读全文' : 'Read More',
      allArticles: isZh ? '查看全部洞察' : 'View All Insights',
      items: [
        {
          tag: isZh ? '人民币结算' : 'RMB Settlement',
          date: '2026-03-10',
          title: isZh ? '人民币国际化提速：2026 年跨境贸易结算新格局' : 'RMB Internationalization Accelerates: New Settlement Landscape in 2026',
          summary: isZh
            ? '随着中东、东南亚及非洲更多国家接受人民币结算，美元在跨境贸易中的垄断地位正在被打破。本文分析当前形势与 IBC 平台的应对策略。'
            : 'As more countries in the Middle East, SE Asia, and Africa accept RMB settlement, dollar dominance is being challenged. IBC\'s strategic response.',
        },
        {
          tag: isZh ? '大宗商品' : 'Commodities',
          date: '2026-03-05',
          title: isZh ? 'AI 定价引擎如何降低大宗商品交易中的信息不对称' : 'How AI Pricing Engines Reduce Information Asymmetry in Commodity Trading',
          summary: isZh
            ? '传统大宗商品定价依赖人工报价与经验判断，AI 实时分析全球价格信号，将定价误差压缩至 1.5% 以内，大幅降低交易摩擦。'
            : 'Traditional commodity pricing relies on manual quotes. AI analyzes global price signals in real-time, compressing pricing error to under 1.5%.',
        },
        {
          tag: isZh ? '非洲市场' : 'Africa Markets',
          date: isZh ? '2026-02-28' : '2026-02-28',
          title: isZh ? '非洲：2026 年全球跨境贸易最大增量市场' : 'Africa: The Largest Incremental Market for Cross-border Trade in 2026',
          summary: isZh
            ? '非洲大陆自贸区（AfCFTA）全面落地，55 国自由贸易带来巨大商机。IBC 平台已覆盖 22 个非洲国家，本文分析重点机遇。'
            : 'With AfCFTA fully operational across 55 nations, IBC now covers 22 African countries. Key opportunities analyzed.',
        },
      ],
    },
    cta: {
      title: isZh ? '准备开启 AI 驱动的全球贸易？' : 'Ready to Start AI-Powered Global Trade?',
      subtitle: isZh ? '立即入驻，免费使用核心功能，加入 1,200+ 全球贸易伙伴' : 'Join free, access core features, and connect with 1,200+ global trade partners',
      primary: isZh ? '免费入驻' : 'Get Started Free',
      secondary: isZh ? '发布商机' : 'Post Opportunity',
    },
    coreValue: {
      title: isZh ? '核心价值主张' : 'Core Value Propositions',
      subtitle: isZh ? '三大支柱，重构全球贸易基础设施' : 'Three pillars rebuilding global trade infrastructure',
      cards: [
        {
          emoji: '💳',
          title: isZh ? '稳定币结算网络' : 'Stablecoin Settlement Network',
          desc: isZh
            ? '支持 USDT/USDC/CNHC 等多链稳定币，摆脱美元体系依赖，实现跨境贸易 T+0 结算，降低汇率风险与中间行成本。'
            : 'Multi-chain stablecoin support (USDT/USDC/CNHC), breaking free from USD dependency with T+0 cross-border settlement and reduced FX & correspondent bank costs.',
          color: 'from-blue-500 to-cyan-500',
          tags: isZh ? ['T+0 结算', '多链支持', '合规通道'] : ['T+0 Settlement', 'Multi-chain', 'Compliant'],
        },
        {
          emoji: '📦',
          title: isZh ? '贸易金融 RWA 引擎' : 'Trade Finance RWA Engine',
          desc: isZh
            ? '将电子提单（e-BL）、信用证、应收账款等真实贸易资产上链，生成可交易的 RWA 资产包，打通贸易融资与链上流动性。'
            : 'Tokenize real trade assets — e-BL, LCs, receivables — into tradeable RWA packages, bridging trade finance with on-chain liquidity.',
          color: 'from-violet-500 to-purple-600',
          tags: isZh ? ['e-BL 上链', 'RWA 资产包', '链上融资'] : ['e-BL Tokenization', 'RWA Packages', 'On-chain Finance'],
        },
        {
          emoji: '🤖',
          title: isZh ? 'AI 贸易操作系统' : 'AI Trade Operating System',
          desc: isZh
            ? '覆盖采购→匹配→定价→谈判→合同→履约→结算全链路，AI 自动化每个节点，将贸易周期从周缩短至天。'
            : 'Full-loop automation from sourcing → matching → pricing → negotiation → contract → fulfillment → settlement. AI cuts trade cycles from weeks to days.',
          color: 'from-amber-400 to-orange-500',
          tags: isZh ? ['全链路 AI', '合同自动化', '履约监控'] : ['Full-loop AI', 'Contract Automation', 'Fulfillment Tracking'],
        },
      ],
    },
    solutions: {
      title: isZh ? '解决方案' : 'Solutions',
      subtitle: isZh ? '为每一类角色量身定制的贸易能力' : 'Purpose-built capabilities for every stakeholder',
      roles: [
        {
          label: isZh ? '跨境贸易企业' : 'Cross-border Enterprises',
          pain: {
            title: isZh ? '痛点' : 'Pain Points',
            items: isZh
              ? [
                  '美元结算依赖高，汇率波动侵蚀利润',
                  '买卖双方信息不对称，寻源成本高',
                  '贸易融资难，应收账款周转慢',
                  '履约过程不透明，纠纷处理成本高',
                ]
              : [
                  'High USD dependency — FX volatility erodes margins',
                  'Information asymmetry between buyers and sellers, high sourcing costs',
                  'Difficult trade financing, slow receivables turnover',
                  'Opaque fulfillment process, high dispute resolution costs',
                ],
          },
          solution: {
            title: isZh ? 'IBC 解法' : 'IBC Solution',
            items: isZh
              ? [
                  '稳定币多链结算，规避汇率风险，T+0 到账',
                  'AI 精准撮合引擎，实时匹配全球供需方',
                  'RWA 资产包释放应收账款流动性，链上融资',
                  '智能合同 + 链上履约追踪，全程可审计',
                ]
              : [
                  'Multi-chain stablecoin settlement — zero FX risk, T+0 arrival',
                  'AI matching engine — real-time global supply-demand pairing',
                  'RWA packages unlock receivables liquidity with on-chain financing',
                  'Smart contracts + on-chain fulfillment tracking — fully auditable',
                ],
          },
        },
        {
          label: isZh ? '政府及园区' : 'Governments & Parks',
          pain: {
            title: isZh ? '痛点' : 'Pain Points',
            items: isZh
              ? [
                  '招商引资渠道单一，外资触达成本高',
                  '园区贸易数据分散，决策依据不足',
                  '跨境贸易配套服务不完善，企业留存率低',
                  '缺乏数字化展示平台，全球可见度低',
                ]
              : [
                  'Limited FDI attraction channels, high outreach costs',
                  'Fragmented trade data across the park, insufficient decision support',
                  'Incomplete cross-border trade support services, low enterprise retention',
                  'Lack of digital showcase platform, low global visibility',
                ],
          },
          solution: {
            title: isZh ? 'IBC 解法' : 'IBC Solution',
            items: isZh
              ? [
                  '国别馆 + 园区专属门户，全球 58 国精准曝光',
                  '贸易数据看板，实时呈现供需热点与撮合效果',
                  '一站式贸易生态：金融、物流、合规配套接入',
                  'AI 招商助手，智能推荐潜在投资方与合作伙伴',
                ]
              : [
                  'Country Pavilion + dedicated park portal — precision exposure across 58 countries',
                  'Trade data dashboard — real-time supply/demand heatmaps and matching outcomes',
                  'One-stop trade ecosystem: finance, logistics, and compliance integrations',
                  'AI investment attraction assistant — smart recommendations for investors & partners',
                ],
          },
        },
        {
          label: isZh ? '金融机构' : 'Financial Institutions',
          pain: {
            title: isZh ? '痛点' : 'Pain Points',
            items: isZh
              ? [
                  '贸易融资风险高，尽调成本大',
                  '跨境资产流动性差，难以快速变现',
                  '合规审核流程繁琐，效率低下',
                  '缺乏与实体贸易流的深度连接',
                ]
              : [
                  'High trade financing risk, expensive due diligence',
                  'Poor cross-border asset liquidity, difficult rapid liquidation',
                  'Compliance review processes are cumbersome and inefficient',
                  'Lack of deep connectivity to actual trade flows',
                ],
          },
          solution: {
            title: isZh ? 'IBC 解法' : 'IBC Solution',
            items: isZh
              ? [
                  'RWA 资产包提供链上可验证的贸易凭证',
                  '电子提单（e-BL）上链，资产真实性零信任验证',
                  '链上审计日志，合规成本降低 60%',
                  '直连贸易流，获取第一手贸易数据用于风控',
                ]
              : [
                  'RWA packages provide on-chain verifiable trade proof',
                  'e-BL tokenization with zero-trust asset authenticity verification',
                  'On-chain audit logs — 60% reduction in compliance costs',
                  'Direct connection to trade flows for first-hand risk management data',
                ],
          },
        },
        {
          label: isZh ? '新兴市场国家' : 'Emerging Market Countries',
          pain: {
            title: isZh ? '痛点' : 'Pain Points',
            items: isZh
              ? [
                  '外汇短缺，美元支付能力受限',
                  '贸易基础设施薄弱，数字化程度低',
                  '国际贸易融资渠道匮乏',
                  '中间商层级多，贸易成本居高不下',
                ]
              : [
                  'Forex shortage — limited USD payment capacity',
                  'Weak trade infrastructure, low digital adoption',
                  'Scarce access to international trade financing',
                  'Many intermediary layers keeping trade costs high',
                ],
          },
          solution: {
            title: isZh ? 'IBC 解法' : 'IBC Solution',
            items: isZh
              ? [
                  '本币 + 稳定币结算，绕开美元体系直接交易',
                  'AI 贸易 OS 即服务（TaaS），低门槛数字化接入',
                  '链上 RWA 资产融资，无需传统银行账户',
                  '直连中国及全球供需方，消除多级中间商',
                ]
              : [
                  'Local currency + stablecoin settlement — bypass USD system entirely',
                  'AI Trade OS as-a-Service (TaaS) — low-barrier digital onboarding',
                  'On-chain RWA financing without requiring traditional bank accounts',
                  'Direct connection to China and global supply/demand — eliminate multi-tier middlemen',
                ],
          },
        },
      ],
    },
    products: {
      title: isZh ? '产品与平台' : 'Products & Platforms',
      subtitle: isZh ? '五大产品，构建完整的贸易操作系统' : 'Five products building a complete trade operating system',
      labelDetails: isZh ? '核心功能' : 'Key Features',
      items: [
        {
          id: 'tradeos',
          name: 'TradeOS',
          tagline: isZh ? '全链路 AI 贸易操作系统' : 'Full-loop AI Trade Operating System',
          badge: isZh ? '旗舰产品' : 'Flagship',
          desc: isZh
            ? 'TradeOS 是 IBC 的核心产品，集成 AI 撮合、谈判、合同、履约与结算于一体，覆盖跨境贸易全生命周期，将传统 30 天的贸易流程压缩至 72 小时以内。'
            : 'TradeOS is IBC\'s flagship product — integrating AI matching, negotiation, contract, fulfillment, and settlement into one platform. Compresses traditional 30-day trade cycles to under 72 hours.',
          highlights: isZh
            ? [
                'AI 驱动供需撮合，实时匹配全球买卖双方',
                '智能谈判引擎，自动推进意向至成交',
                '电子合同生成与数字签署，全球法律合规',
                '履约追踪仪表板，实时可视化交货进度',
                '集成多链稳定币结算，支持 15+ 货币',
              ]
            : [
                'AI-powered supply-demand matching — real-time global pairing',
                'Smart negotiation engine — auto-advances intent to deal closure',
                'Electronic contract generation and digital signing — globally compliant',
                'Fulfillment tracking dashboard — real-time delivery visualization',
                'Integrated multi-chain stablecoin settlement — 15+ currencies',
              ],
        },
        {
          id: 'settlement',
          name: isZh ? '稳定币聚合结算平台' : 'Stablecoin Settlement Hub',
          tagline: isZh ? '多链稳定币跨境支付网络' : 'Multi-chain cross-border stablecoin payment network',
          desc: isZh
            ? '聚合 Ethereum、Tron、Solana 等主流公链上的 USDT、USDC、CNHC 等稳定币，为跨境贸易提供合规、低成本、T+0 到账的结算通道。'
            : 'Aggregates USDT, USDC, CNHC and more across Ethereum, Tron, Solana and other chains, providing compliant, low-cost, T+0 settlement channels for cross-border trade.',
          highlights: isZh
            ? [
                '支持 USDT / USDC / CNHC 等主流稳定币',
                '多链聚合：ETH / Tron / Solana / BNB Chain',
                'T+0 实时到账，无传统银行延迟',
                '合规 KYC/AML 嵌入结算流程',
                '与 TradeOS 深度集成，支付触发自动履约',
              ]
            : [
                'Supports USDT / USDC / CNHC and major stablecoins',
                'Multi-chain aggregation: ETH / Tron / Solana / BNB Chain',
                'T+0 real-time settlement — no traditional banking delays',
                'Compliant KYC/AML embedded in payment flows',
                'Deep TradeOS integration — payment triggers automatic fulfillment',
              ],
        },
        {
          id: 'rwa',
          name: 'RWA Tokenization Engine',
          tagline: isZh ? '真实贸易资产上链发行平台' : 'Real-world trade asset tokenization platform',
          desc: isZh
            ? '将电子提单（e-BL）、信用证（LC）、应收账款等真实贸易资产通过智能合约上链，转化为可交易的 RWA 资产包，连接贸易融资与 DeFi 流动性。'
            : 'Tokenizes real trade assets — e-BL, LC, receivables — via smart contracts, converting them into tradeable RWA packages that connect trade finance with DeFi liquidity.',
          highlights: isZh
            ? [
                '电子提单（e-BL）上链，资产真实性链上验证',
                '信用证与应收账款数字化，变现周期缩短 80%',
                '合规 SPV 结构，满足多司法管辖区监管要求',
                'DeFi 协议集成，RWA 资产可用于抵押融资',
                '机构级链上审计，降低金融机构尽调成本',
              ]
            : [
                'e-BL on-chain tokenization with blockchain-verified asset authenticity',
                'LC and receivables digitization — 80% faster liquidation',
                'Compliant SPV structure meeting multi-jurisdiction regulatory requirements',
                'DeFi protocol integration — RWA assets usable as collateral',
                'Institutional-grade on-chain audit trail — reduces due diligence costs',
              ],
        },
        {
          id: 'tradechain',
          name: 'TradeChain',
          tagline: isZh ? '专为贸易场景设计的公链' : 'A public blockchain purpose-built for trade',
          desc: isZh
            ? 'TradeChain 是 IBC 自研的贸易专用公链，针对跨境贸易的高并发、低延迟、合规性需求进行深度优化，支撑 TradeOS 及 RWA 引擎的所有链上操作。'
            : 'TradeChain is IBC\'s proprietary trade-purpose blockchain — deeply optimized for the high-concurrency, low-latency, and compliance demands of cross-border trade, underpinning all on-chain operations of TradeOS and the RWA engine.',
          highlights: isZh
            ? [
                '3 秒出块，支持万 TPS 级并发贸易交易',
                '内嵌合规模块：KYC、AML、OFAC 筛查',
                '与主流公链双向桥接：ETH / Solana / BNB Chain',
                '智能合同标准库：贸易合同、提单、信用证模板',
                '节点分布于 HK、SG、UAE、BVI，全球合规布局',
              ]
            : [
                '3-second block time, supporting 10,000+ TPS trade transactions',
                'Built-in compliance modules: KYC, AML, OFAC screening',
                'Two-way bridge to major chains: ETH / Solana / BNB Chain',
                'Smart contract template library: trade contracts, BL, LC templates',
                'Nodes in HK, SG, UAE, BVI — globally compliant deployment',
              ],
        },
        {
          id: 'enterprise',
          name: 'Enterprise Hub',
          tagline: isZh ? '企业入驻与全球可见度管理中心' : 'Enterprise onboarding and global visibility hub',
          desc: isZh
            ? 'Enterprise Hub 是企业进入 IBC 生态的统一入口，完成 KYC 认证、建立贸易档案、管理供需发布，并通过 AI 画像提升全球曝光度与撮合精准度。'
            : 'Enterprise Hub is the unified gateway into the IBC ecosystem — complete KYC, build trade profiles, manage supply/demand listings, and boost global exposure and matching precision through AI profiling.',
          highlights: isZh
            ? [
                '企业实名认证（KYC）+ 资质核验，全球互信基础',
                'AI 贸易画像：自动标签、能力图谱与信用评分',
                '供需发布管理：一键发布，AI 自动生成推荐描述',
                '国别馆专属展厅，覆盖 58 国全球可见度',
                '生态合作伙伴网络：物流、金融、合规一站接入',
              ]
            : [
                'Enterprise KYC + credential verification — global trust foundation',
                'AI trade profiling: automatic tagging, capability mapping & credit scoring',
                'Supply/demand management: one-click posting with AI-generated descriptions',
                'Country Pavilion dedicated showroom — global visibility across 58 countries',
                'Ecosystem partner network: one-stop access to logistics, finance & compliance',
              ],
        },
      ],
    },
    timeline: {
      title: isZh ? '发展历程' : 'Milestones',
      subtitle: isZh ? '从香港出发，连接全球' : 'From Hong Kong to the World',
      items: [
        {
          year: '2023',
          label: isZh ? '正式成立' : 'Founded',
          desc: isZh
            ? 'IBC 国际数字贸易中心于香港正式成立，获得天汇资本（SkyW Capital）创始股东注资，启动全球跨境贸易基础设施建设。'
            : 'IBC established in Hong Kong with founding investment from SkyW Capital. Global cross-border trade infrastructure development begins.',
          dot: 'bg-amber-400',
        },
        {
          year: '2025 Q2',
          label: isZh ? 'RWA 引擎上线' : 'RWA Engine Live',
          desc: isZh
            ? '首个基于电子提单（e-BL）的 RWA 资产包成功发行，连接中东与非洲市场，完成链上贸易资产流通闭环。'
            : 'First RWA asset package based on e-BL goes live, linking Middle East and Africa markets, closing the on-chain trade asset circulation loop.',
          dot: 'bg-blue-400',
        },
        {
          year: '2025 Q4',
          label: isZh ? 'TradeOS 1.0 发布' : 'TradeOS 1.0 Launch',
          desc: isZh
            ? '集成 AI 与公链的 TradeOS 1.0 正式发布，启动首批企业客户试点，覆盖采购→匹配→谈判→结算全链路。'
            : 'TradeOS 1.0 integrating AI and blockchain officially launched. First enterprise pilots begin covering procurement → matching → negotiation → settlement.',
          dot: 'bg-violet-400',
        },
        {
          year: '2026',
          label: isZh ? 'AI Trade OS 2.0 全面上线' : 'AI Trade OS 2.0 Full Launch',
          desc: isZh
            ? '六层架构全面落地：国际门户上线，AI 撮合引擎接入 58 国，稳定币结算网络覆盖 15+ 货币，生态合作伙伴超 200 家。'
            : 'Six-layer architecture fully live: international portal launched, AI matching engine connected to 58 countries, stablecoin settlement across 15+ currencies, 200+ ecosystem partners.',
          dot: 'bg-emerald-400',
        },
      ],
    },
    footer: {
      about: isZh ? '关于平台' : 'Platform',
      product: isZh ? '产品功能' : 'Products',
      company: isZh ? '公司' : 'Company',
      links: {
        about: [
          { label: isZh ? '平台介绍' : 'About IBC', href: '#' },
          { label: isZh ? '发展路线' : 'Roadmap', href: '#' },
          { label: isZh ? '行业洞察' : 'Insights', href: '#' },
        ],
        product: [
          { label: isZh ? '企业入驻' : 'Onboarding', href: `/${locale}/onboarding` },
          { label: isZh ? '发布供给' : 'Post Supply', href: `/${locale}/supply` },
          { label: isZh ? '发布需求' : 'Post Demand', href: `/${locale}/demand` },
          { label: isZh ? '国别馆' : 'Countries', href: `/${locale}/countries` },
        ],
        company: [
          { label: 'SkyW Capital', href: 'https://skyw.group' },
          { label: isZh ? '联系我们' : 'Contact Us', href: '#' },
          { label: isZh ? '隐私政策' : 'Privacy Policy', href: '#' },
          { label: isZh ? '服务条款' : 'Terms of Service', href: '#' },
        ],
      },
      tagline: isZh ? '由天汇资本（SkyW Capital）战略支持' : 'Strategically backed by SkyW Capital',
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd locale={locale} />
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-white font-black text-base tracking-tight">IBC</span>
            </div>
            <div>
              <span className="font-bold text-white text-sm leading-none block">IBC AI Trade OS</span>
              <span className="text-amber-400/70 text-[10px] tracking-widest uppercase leading-none">
                {isZh ? '全球跨境AI易货平台' : 'Global AI Barter Platform'}
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5">
            <a href={`/${locale}/onboarding`} className="text-slate-300 hover:text-white text-sm transition-colors">{t.nav.onboarding}</a>
            <a href={`/${locale}/supply`} className="text-slate-300 hover:text-white text-sm transition-colors">{t.nav.supply}</a>
            <a href={`/${locale}/demand`} className="text-slate-300 hover:text-white text-sm transition-colors">{t.nav.demand}</a>
            <a href={`/${locale}/countries`} className="text-slate-300 hover:text-white text-sm transition-colors">{t.nav.countries}</a>
            <a href={`/${locale}/opportunities`} className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">{isZh ? '商机池' : 'Opportunities'}</a>
            <a href={`/${locale}/workspace`} className="text-slate-300 hover:text-white text-sm transition-colors">{isZh ? '工作台' : 'Workspace'}</a>
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 border border-slate-700 rounded-lg overflow-hidden text-xs">
              <a href="/zh-CN" className={`px-2.5 py-1.5 transition-colors ${locale === 'zh-CN' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>简中</a>
              <a href="/en" className={`px-2.5 py-1.5 transition-colors ${locale === 'en' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>EN</a>
            </div>
            <a
              href={`/${locale}/login`}
              className="px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm rounded-lg transition-colors"
            >
              {isZh ? '登录' : 'Login'}
            </a>
            <a
              href={`/${locale}/onboarding`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-semibold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20"
            >
              {t.cta.primary}
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className='relative overflow-hidden'><ParticleBackground /><div className='relative overflow-hidden bg-slate-950'><ParticleBackground /><div className='relative overflow-hidden bg-slate-950'><ParticleBackground /><HeroClient locale={locale} t={t} /></div></div></div>

      {/* ── Core Value Propositions ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{t.coreValue.title}</h2>
            <p className="text-slate-500 text-lg">{t.coreValue.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.coreValue.cards.map((card, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] to-slate-800 p-8 border border-slate-700/50 hover:shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className="text-4xl mb-5">{card.emoji}</div>
                  <h3 className="text-xl font-black text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, j) => (
                      <span key={j} className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${card.color} bg-opacity-10 text-white/80 border border-white/10`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Globe — China Trade Network ── */}
      <GlobeSection isZh={isZh} />

      {/* ── Solutions ── */}
      <SolutionsSection
        title={t.solutions.title}
        subtitle={t.solutions.subtitle}
        roles={t.solutions.roles}
      />

      {/* ── Products & Platforms ── */}
      <ProductPlatform
        title={t.products.title}
        subtitle={t.products.subtitle}
        products={t.products.items}
        labelDetails={t.products.labelDetails}
      />

      {/* ── Features ── */}
      <FeaturesClient t={t} />

      {/* ── Country Pavilion Entry ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <a
            href={`/${locale}/countries`}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] to-indigo-900 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-2xl hover:shadow-indigo-900/30 transition-all duration-300"
          >
            {/* BG decorations */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 mb-4">
                <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  {isZh ? '全新上线' : 'New'}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                {isZh ? '🌏 国别馆' : '🌏 Country Pavilion'}
              </h3>
              <p className="text-slate-300 max-w-lg text-base">
                {isZh
                  ? '浏览 58 个国家与地区的供需信息，发现专属商机，直连全球贸易伙伴'
                  : 'Browse supply & demand across 58 countries, discover tailored opportunities, connect with global partners'}
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 px-8 py-4 bg-amber-500 group-hover:bg-amber-400 text-[#0f172a] font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/30 whitespace-nowrap">
              {isZh ? '进入国别馆' : 'Enter Pavilion'}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* ── Hot Opportunities ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-2">{t.hotOpportunities.title}</h2>
              <p className="text-slate-500">{t.hotOpportunities.subtitle}</p>
            </div>
            <a href={`/${locale}/supply`} className="hidden md:inline-flex items-center gap-1 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors">
              {isZh ? '查看全部' : 'View All'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.hotOpportunities.items.map((op, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-5 border border-slate-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${op.type === (isZh ? '供给' : 'Supply') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {op.type}
                  </span>
                  <span className="text-xl">{op.flag}</span>
                </div>
                <h4 className="font-bold text-[#0f172a] text-base mb-1 group-hover:text-amber-600 transition-colors">{op.tag}</h4>
                <p className="text-slate-400 text-xs mb-3">{op.country}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{op.qty}</span>
                  <span className="font-semibold text-[#0f172a]">{op.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Cases ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{t.cases.title}</h2>
            <p className="text-slate-500 text-lg">{t.cases.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.cases.items.map((c, i) => (
              <div
                key={i}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <div className="font-bold text-[#0f172a] text-sm">{c.company}</div>
                    <div className="text-slate-400 text-xs">{c.country} · {c.category}</div>
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-500 mb-3">{c.amount}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Credentials ── */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t.trust.title}</h2>
            <p className="text-slate-400 text-lg">{t.trust.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.trust.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-7 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-amber-500/30 hover:bg-slate-800 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-5 border border-amber-500/20">
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{t.industries.title}</h2>
            <p className="text-slate-500 text-lg">{t.industries.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.industries.items.map((ind, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-slate-50 hover:bg-white"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{ind.emoji}</span>
                <span className="font-bold text-[#0f172a] text-sm text-center">{ind.name}</span>
                <span className="text-xs text-amber-600 font-medium">{ind.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About IBC ── */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 mb-6">
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">{t.about.badge}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{t.about.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-10">{t.about.subtitle}</p>
              <div className="grid grid-cols-2 gap-4">
                {t.about.highlights.map((h, i) => (
                  <div key={i} className="rounded-xl bg-slate-800/60 border border-slate-700/60 px-5 py-4">
                    <div className="text-2xl font-black text-amber-400 mb-1">{h.value}</div>
                    <div className="text-slate-400 text-sm">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Divisions */}
            <div className="grid grid-cols-1 gap-3">
              {t.about.divisions.map((div, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all">
                  <span className="text-2xl flex-shrink-0">{div.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{div.name}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{div.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-3">{t.timeline.title}</h2>
            <p className="text-slate-500 text-lg">{t.timeline.subtitle}</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/60 via-blue-400/40 to-transparent" />
            <div className="space-y-12">
              {t.timeline.items.map((item, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#0f172a] mt-2 shadow-lg" style={{ background: '', boxShadow: '' }}>
                    <div className={`w-3 h-3 rounded-full ${item.dot}`} />
                  </div>
                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-24px)] rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-[#0f172a]">{item.year}</span>
                      <span className="font-bold text-[#0f172a] text-sm">{item.label}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-24px)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-2">{t.insights.title}</h2>
              <p className="text-slate-500">{t.insights.subtitle}</p>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-amber-600 hover:text-amber-500 font-semibold text-sm transition-colors">
              {t.insights.allArticles}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.insights.items.map((art, i) => (
              <article key={i} className="group flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 bg-white">
                {/* Top color bar */}
                <div className={`h-1 bg-gradient-to-r ${i === 0 ? 'from-amber-400 to-amber-600' : i === 1 ? 'from-blue-500 to-indigo-600' : 'from-emerald-500 to-teal-500'}`} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{art.tag}</span>
                    <span className="text-slate-400 text-xs">{art.date}</span>
                  </div>
                  <h3 className="font-bold text-[#0f172a] text-base mb-3 leading-snug group-hover:text-amber-600 transition-colors">{art.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{art.summary}</p>
                  <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    {t.insights.readMore}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 bg-[#070e1f] overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
              {isZh ? '立即开始 · 免费体验' : 'Start Now · Free Access'}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{t.cta.title}</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">{t.cta.subtitle}</p>

          {/* 3 Quick-Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a
              href={`/${locale}/supply`}
              className="group flex flex-col items-center gap-3 p-7 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">📦</span>
              <span className="font-bold text-white text-base">{isZh ? '发布供给' : 'Post Supply'}</span>
              <span className="text-xs text-slate-400 text-center leading-relaxed">
                {isZh ? '将商品推向全球买家，AI 自动撮合' : 'Reach global buyers with AI-powered matching'}
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                {isZh ? '立即发布' : 'Post Now'}
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href={`/${locale}/demand`}
              className="group flex flex-col items-center gap-3 p-7 rounded-2xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🎯</span>
              <span className="font-bold text-white text-base">{isZh ? '发布需求' : 'Post Demand'}</span>
              <span className="text-xs text-slate-400 text-center leading-relaxed">
                {isZh ? 'AI 为您精准匹配全球供应商' : 'AI precisely matches global suppliers for you'}
              </span>
              <span className="text-xs font-semibold text-violet-400 flex items-center gap-1">
                {isZh ? '发布采购' : 'Post RFQ'}
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href={`/${locale}/opportunities`}
              className="group flex flex-col items-center gap-3 p-7 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">🌐</span>
              <span className="font-bold text-white text-base">{isZh ? '浏览商机' : 'Browse Opportunities'}</span>
              <span className="text-xs text-slate-400 text-center leading-relaxed">
                {isZh ? 'AI 实时更新全球供需商机池' : 'Real-time AI-curated global opportunity pool'}
              </span>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                {isZh ? '查看商机' : 'Explore'}
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/${locale}/onboarding`}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-[#070e1f] font-bold text-lg rounded-xl transition-all shadow-xl shadow-amber-500/25 hover:-translate-y-0.5 hover:shadow-amber-500/40"
            >
              {t.cta.primary}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`/${locale}/opportunities`}
              className="inline-flex items-center gap-2 px-10 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold rounded-xl transition-all hover:-translate-y-0.5"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ── Enterprise Stats ── */}
      <EnterpriseStats isZh={isZh} />

      {/* ── Footer ── */}
      <footer className="bg-[#070e1f] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand col */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <span className="text-white font-black text-sm">IBC</span>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-none">IBC AI Trade OS</div>
                  <div className="text-amber-400/60 text-[10px] tracking-widest uppercase mt-0.5">ibcdx.com</div>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {isZh
                  ? '以AI、稳定币、RWA与公链，重构全球跨境贸易新基建。立足香港，连接全球。'
                  : 'Rebuilding global cross-border trade infrastructure with AI, stablecoins, RWA & blockchain. Based in Hong Kong.'}
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400/70 border border-amber-500/20 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {t.footer.tagline}
              </div>
            </div>
            {/* About */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-4">{t.footer.about}</h4>
              <ul className="space-y-2.5">
                {t.footer.links.about.map((l) => (
                  <li key={l.label}><a href={l.href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            {/* Product */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-4">{t.footer.product}</h4>
              <ul className="space-y-2.5">
                {t.footer.links.product.map((l) => (
                  <li key={l.label}><a href={l.href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-4">{t.footer.company}</h4>
              <ul className="space-y-2.5">
                {t.footer.links.company.map((l) => (
                  <li key={l.label}><a href={l.href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs">
              © 2026 IBC AI Trade OS (International Barter & Digital Trade Center). {isZh ? '版权所有。本网站内容仅供参考，不构成任何投资或法律建议。' : 'All rights reserved. Content for reference only, not investment or legal advice.'}
            </p>
            <div className="flex items-center gap-4 text-slate-600 text-xs">
              <a href="#" className="hover:text-slate-400 transition-colors">{isZh ? '隐私政策' : 'Privacy'}</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-400 transition-colors">{isZh ? '服务条款' : 'Terms'}</a>
              <span>·</span>
              <a href="#" className="hover:text-slate-400 transition-colors">Hong Kong SAR</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-700/60">
        <div className="grid grid-cols-5 gap-0">
          {[
            { href: `/${locale}`, label: isZh ? '首页' : 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { href: `/${locale}/opportunities`, label: isZh ? '商机' : 'Opps', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            { href: `/${locale}/supply`, label: isZh ? '供给' : 'Supply', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: `/${locale}/demand`, label: isZh ? '需求' : 'Demand', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
            { href: `/${locale}/onboarding`, label: isZh ? '入驻' : 'Join', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-3 gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
              </svg>
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
