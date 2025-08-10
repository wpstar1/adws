import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  Eye,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Flame
} from 'lucide-react';

interface AdvancedAnalyticsProps {
  keyword: string;
  businessName: string;
  website: string;
}

interface Analytics {
  cpcAnalysis: {
    min: number;
    max: number;
    average: number;
    recommended: number;
    competitorAvg: number;
  };
  searchVolume: {
    monthly: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    seasonality: string[];
  };
  competition: {
    level: 'low' | 'medium' | 'high';
    score: number;
    competitors: string[];
    topBidders: number;
  };
  performancePrediction: {
    impressions: { min: number; max: number };
    clicks: { min: number; max: number };
    ctr: number;
    conversions: { min: number; max: number };
    conversionRate: number;
    costPerConversion: number;
  };
  budgetRecommendation: {
    starter: number;
    aggressive: number;
    premium: number;
    roi: { starter: number; aggressive: number; premium: number };
  };
  targetAudience: {
    demographics: { age: string; gender: string; income: string }[];
    interests: string[];
    searchBehavior: string[];
    peakHours: string[];
  };
  industryInsights: {
    avgCpc: number;
    avgConversionRate: number;
    bestPerformingAdTypes: string[];
    seasonalTrends: string[];
  };
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ keyword, businessName, website }) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'competition' | 'audience' | 'forecast'>('overview');

  // 실제 환경에서는 API 호출
  const generateAdvancedAnalytics = (keyword: string): Analytics => {
    // 키워드 기반 실제 데이터 시뮬레이션
    const keywordData: Record<string, Partial<Analytics>> = {
      '치킨': {
        cpcAnalysis: { min: 180, max: 950, average: 420, recommended: 350, competitorAvg: 480 },
        searchVolume: { monthly: 165000, trend: 'increasing' as const, seasonality: ['금요일 저녁', '주말', '배달 성수기'] },
        competition: { level: 'high' as const, score: 85, competitors: ['BBQ', '교촌치킨', 'BHC'], topBidders: 127 }
      },
      '영어': {
        cpcAnalysis: { min: 250, max: 1200, average: 650, recommended: 580, competitorAvg: 720 },
        searchVolume: { monthly: 89000, trend: 'stable' as const, seasonality: ['신학기', '방학 직전', '취업 시즌'] },
        competition: { level: 'medium' as const, score: 68, competitors: ['YBM', '해커스', '시원스쿨'], topBidders: 89 }
      },
      '카페': {
        cpcAnalysis: { min: 320, max: 1450, average: 780, recommended: 690, competitorAvg: 820 },
        searchVolume: { monthly: 124000, trend: 'increasing' as const, seasonality: ['봄/가을', '데이트 시즌', '브런치 트렌드'] },
        competition: { level: 'high' as const, score: 78, competitors: ['스타벅스', '이디야', '카페베네'], topBidders: 156 }
      }
    };

    const baseData = keywordData[keyword] || {
      cpcAnalysis: { min: 200, max: 800, average: 450, recommended: 380, competitorAvg: 520 },
      searchVolume: { monthly: 45000, trend: 'stable' as const, seasonality: ['일반적 트렌드'] },
      competition: { level: 'medium' as const, score: 60, competitors: ['경쟁업체'], topBidders: 45 }
    };

    return {
      cpcAnalysis: baseData.cpcAnalysis!,
      searchVolume: baseData.searchVolume!,
      competition: baseData.competition!,
      performancePrediction: {
        impressions: { min: 12000, max: 28000 },
        clicks: { min: 380, max: 980 },
        ctr: 3.2,
        conversions: { min: 18, max: 47 },
        conversionRate: 4.8,
        costPerConversion: 12500
      },
      budgetRecommendation: {
        starter: 100000,
        aggressive: 300000,
        premium: 500000,
        roi: { starter: 280, aggressive: 350, premium: 420 }
      },
      targetAudience: {
        demographics: [
          { age: '25-34세', gender: '남녀 균등', income: '중간 이상' },
          { age: '35-44세', gender: '여성 60%', income: '중상위층' }
        ],
        interests: [`${keyword} 관련 서비스`, '온라인 쇼핑', '리뷰 검색', '가격 비교'],
        searchBehavior: ['모바일 검색 70%', '저녁 시간대 활발', '리뷰 중시'],
        peakHours: ['19:00-21:00', '주말 오후', '점심시간']
      },
      industryInsights: {
        avgCpc: baseData.cpcAnalysis!.average,
        avgConversionRate: 4.2,
        bestPerformingAdTypes: ['검색 광고', '디스플레이', '쇼핑 광고'],
        seasonalTrends: baseData.searchVolume!.seasonality
      }
    };
  };

  useEffect(() => {
    if (keyword.trim()) {
      setIsLoading(true);
      
      // 실제 분석 시뮬레이션 (3초)
      setTimeout(() => {
        setAnalytics(generateAdvancedAnalytics(keyword));
        setIsLoading(false);
      }, 3000);
    } else {
      setAnalytics(null);
    }
  }, [keyword]);

  const formatNumber = (num: number) => num.toLocaleString();
  const formatCurrency = (num: number) => `₩${num.toLocaleString()}`;

  if (!keyword) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">고급 분석 대기 중</h3>
        <p className="text-gray-500">키워드를 입력하면 실시간 심화 분석이 시작됩니다</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">🔥 고급 분석 진행 중...</h3>
          <p className="text-gray-600">'{keyword}' 키워드 심화 분석</p>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center text-blue-600">
            <Zap className="w-4 h-4 mr-2" />
            <span>실시간 CPC 데이터 수집 중...</span>
          </div>
          <div className="flex items-center text-green-600">
            <Target className="w-4 h-4 mr-2" />
            <span>경쟁사 입찰 현황 분석 중...</span>
          </div>
          <div className="flex items-center text-purple-600">
            <Users className="w-4 h-4 mr-2" />
            <span>타겟 오디언스 프로파일링...</span>
          </div>
          <div className="flex items-center text-orange-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>성과 예측 모델 계산 중...</span>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* CPC 분석 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Flame className="w-6 h-6 text-orange-500 mr-2" />
          실시간 CPC 분석
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(analytics.cpcAnalysis.recommended)}</div>
            <div className="text-sm text-gray-600">권장 CPC</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{formatCurrency(analytics.cpcAnalysis.competitorAvg)}</div>
            <div className="text-sm text-gray-600">경쟁사 평균</div>
          </div>
          <div className="text-2xl font-bold text-blue-600 text-center">
            <div>{formatCurrency(analytics.cpcAnalysis.min)} - {formatCurrency(analytics.cpcAnalysis.max)}</div>
            <div className="text-sm text-gray-600">CPC 범위</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${analytics.cpcAnalysis.recommended < analytics.cpcAnalysis.competitorAvg ? 'text-green-600' : 'text-orange-600'}`}>
              {analytics.cpcAnalysis.recommended < analytics.cpcAnalysis.competitorAvg ? '🔥 유리' : '⚠️ 불리'}
            </div>
            <div className="text-sm text-gray-600">경쟁 상황</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">CPC 경쟁도</span>
            <span className="text-sm font-semibold">{analytics.competition.score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${
                analytics.competition.score > 70 ? 'bg-red-500' : 
                analytics.competition.score > 50 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{width: `${analytics.competition.score}%`}}
            ></div>
          </div>
        </div>
      </div>

      {/* 검색량 & 성과 예측 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="w-5 h-5 text-blue-500 mr-2" />
            월간 검색량 분석
          </h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {formatNumber(analytics.searchVolume.monthly)}
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className={`w-4 h-4 ${
              analytics.searchVolume.trend === 'increasing' ? 'text-green-500' :
              analytics.searchVolume.trend === 'decreasing' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <span className={`text-sm font-medium ${
              analytics.searchVolume.trend === 'increasing' ? 'text-green-600' :
              analytics.searchVolume.trend === 'decreasing' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {analytics.searchVolume.trend === 'increasing' ? '증가 추세' :
               analytics.searchVolume.trend === 'decreasing' ? '감소 추세' : '안정적'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            성수기: {analytics.searchVolume.seasonality.join(', ')}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 text-purple-500 mr-2" />
            월간 성과 예측
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">예상 클릭 수</span>
              <span className="font-bold text-purple-600">
                {formatNumber(analytics.performancePrediction.clicks.min)} - {formatNumber(analytics.performancePrediction.clicks.max)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">예상 전환 수</span>
              <span className="font-bold text-green-600">
                {analytics.performancePrediction.conversions.min} - {analytics.performancePrediction.conversions.max}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">전환당 비용</span>
              <span className="font-bold text-blue-600">
                {formatCurrency(analytics.performancePrediction.costPerConversion)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 예산 추천 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-6 h-6 text-green-500 mr-2" />
          💰 맞춤 예산 추천
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border-2 border-gray-200 hover:border-green-300 transition-colors">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">💚 10만원 이하</div>
              <div className="text-xs text-gray-500">월 광고비</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">💙 20만원 이하</div>
              <div className="text-xs text-gray-500">월 광고비</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border-2 border-purple-200 hover:border-purple-300 transition-colors">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">💜 30만원 이하</div>
              <div className="text-xs text-gray-500">월 광고비</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border-2 border-orange-200 hover:border-orange-300 transition-colors">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">🧡 50만원 이하</div>
              <div className="text-xs text-gray-500">월 광고비</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border-2 border-red-200 hover:border-red-300 transition-colors">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">❤️ 100만원 이하</div>
              <div className="text-xs text-gray-500">월 광고비</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 border-2 border-yellow-200 hover:border-yellow-300 transition-colors relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">👑</span>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900 mb-1">💰 상담후 결정</div>
              <div className="text-xs text-gray-500">맞춤 예산</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompetitionTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">🏆 경쟁 현황 분석</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">주요 경쟁사</h5>
            <div className="space-y-2">
              {analytics.competition.competitors.map((competitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{competitor}</span>
                  <span className="text-sm text-red-600">입찰 중</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">시장 현황</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>총 입찰 업체 수</span>
                <span className="font-bold text-red-600">{analytics.competition.topBidders}개</span>
              </div>
              <div className="flex justify-between">
                <span>경쟁 강도</span>
                <span className={`font-bold ${
                  analytics.competition.level === 'high' ? 'text-red-600' :
                  analytics.competition.level === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {analytics.competition.level === 'high' ? '매우 높음' :
                   analytics.competition.level === 'medium' ? '보통' : '낮음'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>업계 평균 CPC</span>
                <span className="font-bold text-blue-600">
                  {formatCurrency(analytics.industryInsights.avgCpc)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">👥 타겟 고객 프로필</h4>
          <div className="space-y-4">
            {analytics.targetAudience.demographics.map((demo, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">연령: </span>
                    <span className="font-medium">{demo.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">성별: </span>
                    <span className="font-medium">{demo.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">소득: </span>
                    <span className="font-medium">{demo.income}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">🕐 최적 광고 시간</h4>
          <div className="space-y-3">
            {analytics.targetAudience.peakHours.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">{time}</span>
                <Clock className="w-4 h-4 text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">🎯 고객 관심사 & 행동 패턴</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">주요 관심사</h5>
            <div className="flex flex-wrap gap-2">
              {analytics.targetAudience.interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-700 mb-3">검색 행동</h5>
            <div className="space-y-2">
              {analytics.targetAudience.searchBehavior.map((behavior, index) => (
                <div key={index} className="text-sm text-gray-600">• {behavior}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForecastTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Activity className="w-6 h-6 text-blue-500 mr-2" />
          📊 12개월 성과 예측
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(analytics.performancePrediction.impressions.min * 12)} - {formatNumber(analytics.performancePrediction.impressions.max * 12)}
            </div>
            <div className="text-sm text-gray-600">연간 노출 수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(analytics.performancePrediction.clicks.min * 12)} - {formatNumber(analytics.performancePrediction.clicks.max * 12)}
            </div>
            <div className="text-sm text-gray-600">연간 클릭 수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {analytics.performancePrediction.conversions.min * 12} - {analytics.performancePrediction.conversions.max * 12}
            </div>
            <div className="text-sm text-gray-600">연간 전환 수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(analytics.budgetRecommendation.aggressive * 12)}
            </div>
            <div className="text-sm text-gray-600">예상 연간 광고비</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h5 className="font-semibold mb-3">계절별 성과 예측</h5>
          <div className="space-y-2">
            {analytics.industryInsights.seasonalTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{trend}</span>
                <span className="text-sm font-medium text-green-600">+25% 성과 상승 예상</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">🎯 최적화 추천 전략</h4>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border-l-4 border-green-500">
            <h5 className="font-semibold text-green-800">1. 예산 배분 전략</h5>
            <p className="text-sm text-green-700 mt-1">
              검색 광고 70%, 디스플레이 20%, 쇼핑 광고 10% 배분으로 최적 ROI 달성
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h5 className="font-semibold text-blue-800">2. 시간대별 입찰 조정</h5>
            <p className="text-sm text-blue-700 mt-1">
              {analytics.targetAudience.peakHours.join(', ')} 시간대에 입찰가 30% 상향 조정 권장
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500">
            <h5 className="font-semibold text-purple-800">3. 광고 문구 최적화</h5>
            <p className="text-sm text-purple-700 mt-1">
              {analytics.industryInsights.bestPerformingAdTypes.join(', ')} 형태의 광고가 가장 효과적
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* 탭 헤더 */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: '종합 분석', icon: BarChart3 },
            { id: 'competition', label: '경쟁 분석', icon: Target },
            { id: 'audience', label: '고객 분석', icon: Users },
            { id: 'forecast', label: '성과 예측', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 탭 내용 */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'competition' && renderCompetitionTab()}
        {activeTab === 'audience' && renderAudienceTab()}
        {activeTab === 'forecast' && renderForecastTab()}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;