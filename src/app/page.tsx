import Link from "next/link";
import { ArrowRight, Building2, Factory, Zap, Home as HomeIcon, Sun, BarChart3, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  const segments = [
    {
      title: "建築師 / 營造商 / 起造人 / 建設公司",
      description: "新建物光電規劃，打造合規且美觀的綠建築。",
      icon: Building2,
      href: "/new-buildings",
      color: "bg-blue-50 text-blue-700",
      hover: "hover:ring-blue-500",
    },
    {
      title: "老舊電廠擁有者",
      description: "案場汰舊換新，解決漏水與設備老化問題。",
      icon: Sun,
      href: "/revamping",
      color: "bg-amber-50 text-amber-700",
      hover: "hover:ring-amber-500",
    },
    {
      title: "工廠老闆 / 企業主",
      description: "電力顧問服務，用電分析與契約容量優化。",
      icon: Factory,
      href: "/consultancy",
      color: "bg-slate-50 text-slate-700",
      hover: "hover:ring-slate-500",
    },
    {
      title: "屋頂出租 / 自建電廠",
      description: "閒置屋頂變黃金，享受長期穩定的綠能收益。",
      icon: HomeIcon,
      href: "/self-built",
      color: "bg-green-50 text-green-700",
      hover: "hover:ring-green-500",
    },
    {
      title: "創新太陽能需求",
      description: "提供軟性、立面、雙面發電等創新太陽能板技術應用。",
      icon: Zap,
      href: "/special-projects",
      color: "bg-purple-50 text-purple-700",
      hover: "hover:ring-purple-500",
    },
  ];

  return (
    <div className="bg-white">
      {/* Reduced Hero Section */}
      <div className="relative isolate overflow-hidden bg-primary pt-14 pb-16">
        <div className="absolute inset-0 -z-10 bg-black/20"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              吉陽能源：AI 驅動的綠能專家
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-200">
              我們不只提供電力，更提供最聰明的用電計畫。
            </p>
          </div>
        </div>
      </div>

      {/* AI Value Proposition Section */}
      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* 1. AI Analysis */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center rounded-xl bg-blue-100 p-3 mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">數據分析 (AI Analysis)</h3>
              <p className="text-gray-600 leading-relaxed">
                利用科學化大數據與氣象模型，精準預測您的用電與發電需求。
              </p>
            </div>

            {/* 2. Custom Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center rounded-xl bg-amber-100 p-3 mb-6">
                <Settings className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">客製化方案 (Custom Solutions)</h3>
              <p className="text-gray-600 leading-relaxed">
                打破傳統規格，為您的企業量身打造專屬的能源配置方案。
              </p>
            </div>

            {/* 3. Value Creation */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center rounded-xl bg-green-100 p-3 mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">極大化效益 (Value Creation)</h3>
              <p className="text-gray-600 leading-relaxed">
                透過「虛擬電廠、儲能系統、綠電交易」，在永續經營的同時，為您創造實質的經濟收益。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Segmentation Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            請選擇您的身份
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            我們會為您推薦最適合的能源解決方案
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((segment) => (
            <Link
              key={segment.title}
              href={segment.href}
              className={`relative flex flex-col justify-between rounded-3xl p-8 ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${segment.hover} bg-white`}
            >
              <div>
                <div className={`inline-flex items-center justify-center rounded-xl p-3 ${segment.color} mb-6`}>
                  <segment.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold leading-7 text-gray-900">
                  {segment.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {segment.description}
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-semibold leading-6 text-accent">
                了解方案 <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}

          {/* Call to Action Card */}
          <div className="relative flex flex-col justify-center items-center rounded-3xl p-8 bg-primary text-white text-center ring-1 ring-primary shadow-lg">
            <h3 className="text-xl font-bold">還不確定嗎？</h3>
            <p className="mt-4 text-gray-200">
              直接填寫免費評估表單，由專人為您服務。
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              免費評估 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}
