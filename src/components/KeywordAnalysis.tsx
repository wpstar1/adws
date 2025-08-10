import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  Sparkles,
  MessageCircle,
  Loader2
} from 'lucide-react';

interface KeywordAnalysisProps {
  keyword: string;
  website?: string;
  onConsultationRequest: () => void;
}

interface AnalysisResult {
  relatedKeywords: string[];
  suggestedBudget: {
    min: number;
    max: number;
    recommended: number;
  };
  targetAudience: string[];
  competitionLevel: 'low' | 'medium' | 'high';
  expectedCPC: {
    min: number;
    max: number;
  };
  adSuggestions: {
    headline: string;
    description: string;
  }[];
  industryInsights: string[];
}

const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keyword, website, onConsultationRequest }) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 실제 환경에서는 API 호출로 대체
  const generateMockAnalysis = (keyword: string): AnalysisResult => {
    const keywordType = keyword.toLowerCase();
    
    // 키워드 유형별 분석 데이터
    const analysisData: Record<string, Partial<AnalysisResult>> = {
      '치킨': {
        relatedKeywords: ['치킨 배달', '후라이드 치킨', '양념치킨', '치킨 주문', '치킨집', '맛있는 치킨'],
        targetAudience: ['20-40대 직장인', '학생', '가족 고객', '야식 선호 고객'],
        competitionLevel: 'high' as const,
        industryInsights: ['배달 음식 시장 성장세', '야간 시간대 주문 증가', '온라인 주문 선호도 높음']
      },
      '영어': {
        relatedKeywords: ['영어 과외', '영어 회화', '영어 학원', '토익', 'IELTS', '비즈니스 영어'],
        targetAudience: ['학생', '직장인', '취업준비생', '학부모'],
        competitionLevel: 'medium' as const,
        industryInsights: ['온라인 수업 수요 증가', '맞춤형 교육 선호', '자격증 준비 과정 인기']
      },
      '카페': {
        relatedKeywords: ['카페 창업', '커피숍', '디저트 카페', '브런치 카페', '테이크아웃', '원두 커피'],
        targetAudience: ['20-30대 여성', '직장인', '학생', '커피 애호가'],
        competitionLevel: 'high' as const,
        industryInsights: ['특색있는 컨셉 카페 인기', '인스타그래머블 공간 중요', '테이크아웃 수요 증가']
      }
    };

    // 기본 분석 결과
    let baseAnalysis = analysisData[keyword] || {
      relatedKeywords: [`${keyword} 서비스`, `${keyword} 업체`, `${keyword} 전문`, `${keyword} 추천`],
      targetAudience: ['잠재 고객', '관심 고객', '지역 고객'],
      competitionLevel: 'medium' as const,
      industryInsights: ['시장 성장 가능성 있음', '온라인 마케팅 효과적', '고객 만족도 중요']
    };

    return {
      relatedKeywords: baseAnalysis.relatedKeywords || [],
      suggestedBudget: {
        min: 30000,
        max: 150000,
        recommended: 70000
      },
      targetAudience: baseAnalysis.targetAudience || [],
      competitionLevel: baseAnalysis.competitionLevel || 'medium',
      expectedCPC: {
        min: 150,
        max: 800
      },
      adSuggestions: [
        {
          headline: `${keyword} 전문 서비스 | 지금 바로 시작하세요`,
          description: `믿을 수 있는 ${keyword} 전문업체입니다. 고객 만족도 99%, 무료 상담 받아보세요.`
        },
        {
          headline: `최고의 ${keyword} 경험을 약속드립니다`,
          description: `10년 경력의 전문가가 직접 관리하는 ${keyword} 서비스. 합리적인 가격으로 만나보세요.`
        }
      ],
      industryInsights: baseAnalysis.industryInsights || []
    };
  };

  useEffect(() => {
    setIsLoading(true);
    
    // 실제 API 호출 시뮬레이션 (2초 지연)
    setTimeout(() => {
      const result = generateMockAnalysis(keyword);
      setAnalysis(result);
      setIsLoading(false);
    }, 2000);
  }, [keyword]);

  const getCompetitionColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCompetitionText = (level: string) => {
    switch(level) {
      case 'low': return '낮음 (진입 유리)';
      case 'medium': return '보통 (적절한 전략 필요)';
      case 'high': return '높음 (전문 관리 필요)';
      default: return '분석 중';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI가 키워드를 분석하고 있습니다</h3>
          <p className="text-gray-600">
            '{keyword}' 키워드에 대한 최적의 광고 전략을 준비 중입니다...
          </p>
          <div className="mt-4 text-sm text-gray-500">
            ✅ 관련 키워드 분석 중<br/>
            ✅ 시장 경쟁도 조사 중<br/>
            ✅ 예산 최적화 계산 중<br/>
            ✅ 타겟 고객층 분석 중
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-red-600">분석 중 오류가 발생했습니다. 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 분석 완료 헤더 */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CheckCircle className="w-8 h-8" />
          <h2 className="text-3xl font-bold">AI 분석 완료!</h2>
        </div>
        <p className="text-center text-xl">
          '<strong>{keyword}</strong>' 키워드에 대한 맞춤 광고 전략을 확인해보세요
        </p>
      </div>

      {/* 핵심 지표 */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-700">권장 예산</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{analysis.suggestedBudget.recommended.toLocaleString()}/일
          </div>
          <div className="text-sm text-gray-500">
            (₩{analysis.suggestedBudget.min.toLocaleString()} - ₩{analysis.suggestedBudget.max.toLocaleString()})
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-700">예상 CPC</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₩{analysis.expectedCPC.min}-{analysis.expectedCPC.max}
          </div>
          <div className="text-sm text-gray-500">클릭당 단가</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-700">경쟁 강도</h3>
          </div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(analysis.competitionLevel)}`}>
            {getCompetitionText(analysis.competitionLevel)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-700">타겟 그룹</h3>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {analysis.targetAudience.length}개 그룹
          </div>
          <div className="text-sm text-gray-500">세분화된 타겟팅</div>
        </div>
      </div>

      {/* 관련 키워드 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <span>AI가 발굴한 관련 키워드</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.relatedKeywords.map((kw, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {kw}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          💡 이 키워드들을 조합하여 더 효과적인 광고를 만들 수 있습니다
        </p>
      </div>

      {/* 타겟 고객층 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Users className="w-6 h-6 text-green-600" />
          <span>타겟 고객층 분석</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {analysis.targetAudience.map((audience, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{audience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 광고 문구 제안 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <MessageCircle className="w-6 h-6 text-purple-600" />
          <span>AI 생성 광고 문구 예시</span>
        </h3>
        <div className="space-y-4">
          {analysis.adSuggestions.map((ad, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="text-blue-600 font-bold text-lg mb-1">{ad.headline}</div>
              <div className="text-gray-700">{ad.description}</div>
              <div className="text-xs text-gray-500 mt-2">광고 {index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 업계 인사이트 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          <span>업계 트렌드 & 인사이트</span>
        </h3>
        <ul className="space-y-2">
          {analysis.industryInsights.map((insight, index) => (
            <li key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA - 상담 신청 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">
          🎯 이 분석 결과가 마음에 드시나요?
        </h3>
        <p className="text-xl mb-6">
          전문가와 1:1 상담을 통해 더 구체적인 광고 전략을 세워보세요
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
          <div className="bg-white/20 p-4 rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">빠른 상담</div>
            <div>24시간 내 연락</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <MessageCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">편리한 소통</div>
            <div>텔레그램/카카오톡</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">무료 상담</div>
            <div>부담 없이 문의하세요</div>
          </div>
        </div>

        <button
          onClick={onConsultationRequest}
          className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-xl hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span>1:1 무료 상담 신청하기</span>
        </button>
      </div>
    </div>
  );
};

export default KeywordAnalysis;