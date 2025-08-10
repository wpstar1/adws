import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Globe, 
  Building, 
  Phone, 
  MessageCircle,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Upload,
  X,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import RealTimeAdPreview from './components/RealTimeAdPreview';
import AdvancedAnalytics from './components/AdvancedAnalytics';

interface FormData {
  keyword: string;
  website: string;
  businessName: string;
  description: string;
  phone: string;
  location: string;
  adImage?: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    keyword: '',
    website: '',
    businessName: '',
    description: '',
    phone: '',
    location: '서울시',
    adImage: undefined
  });

  // 긴급성 강화 상태
  const [todayApplied, setTodayApplied] = useState(0);
  const [remainingSlots, setRemainingSlots] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // 실시간 카운터 업데이트
  useEffect(() => {
    // 오늘 신청자 수 (랜덤하게 늘어나게)
    const baseApplied = 23;
    const randomIncrement = Math.floor(Math.random() * 3);
    setTodayApplied(baseApplied + randomIncrement);

    // 남은 슬롯 수
    const baseSlots = 7;
    const randomDecrement = Math.floor(Math.random() * 2);
    setRemainingSlots(Math.max(1, baseSlots - randomDecrement));

    // 타이머 설정 (오늘 자정까지)
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(23, 59, 59, 999);
      
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleKakaoChat = () => {
    window.open('https://open.kakao.com/o/sYNvVY9g', '_blank');
  };

  // AI로 자동 설명 생성
  const generateDescription = async (keyword: string, businessName: string) => {
    if (!keyword && !businessName) return '';
    
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      // API 키가 없으면 기본 템플릿 사용
      return `전문 ${keyword || '서비스'} 업체입니다. ${businessName || '저희 업체'}와 함께 최고의 결과를 경험해보세요.`;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: '당신은 구글 광고 카피라이터입니다. 한국어로 간결하고 매력적인 광고 설명을 작성해주세요. 90자 이내로 작성하고, 전문성과 신뢰성을 강조해주세요.'
            },
            {
              role: 'user',
              content: `키워드: ${keyword}, 업체명: ${businessName}에 대한 구글 광고 설명을 작성해주세요.`
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content.trim();
      }
    } catch (error) {
      console.error('AI 설명 생성 실패:', error);
    }

    // AI 호출 실패 시 기본 템플릿
    return `전문 ${keyword || '서비스'} 업체입니다. ${businessName || '저희 업체'}와 함께 최고의 결과를 경험해보세요.`;
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 이미지를 Base64로 변환
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          adImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);

    // 키워드나 업체명이 변경되면 자동으로 설명 생성
    if (name === 'keyword' || name === 'businessName') {
      const description = await generateDescription(
        name === 'keyword' ? value : newFormData.keyword,
        name === 'businessName' ? value : newFormData.businessName
      );
      
      setFormData(prev => ({
        ...prev,
        description
      }));
    }
  };

  const handleConsultationRequest = () => {
    window.open('https://btg1.net/bbs/board.php?bo_table=5001&wr_id=81', '_blank');
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.reload()}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">구글 애드워즈 대행 서비스</h1>
              <p className="text-sm text-gray-500">실시간 미리보기로 확인하며 만드세요</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 입력 폼 */}
          <div className="space-y-6">
            {/* 긴급성 알림 */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">오늘 신청: {todayApplied}명</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">남은 슬롯: {remainingSlots}자리</span>
                </div>
              </div>
              <div className="text-center mt-2 bg-black bg-opacity-20 rounded p-2">
                <p className="text-sm font-bold">
                  ⏰ 특가 종료까지: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-bold text-red-900">🔥 무료 광고 미리보기</h2>
              </div>
              <div className="space-y-2">
                <p className="text-red-800 font-semibold">
                  ⚡ 지금 바로 확인해보세요! 당신의 광고가 구글에서 어떻게 보일지
                </p>
                <p className="text-sm text-gray-700">
                  정보 입력하면 실시간 미리보기 제공 → 카톡상담 → 15만원으로 완성!
                </p>
                <div className="bg-yellow-100 p-2 rounded border border-yellow-300 text-center">
                  <p className="text-xs font-bold text-red-600">
                    💡 혼자 하면 90% 실패 vs 전문가와 함께하면 98% 성공!
                  </p>
                </div>
              </div>
            </div>

            {/* 입력 폼 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                📝 광고 정보 입력
              </h3>

              <div className="space-y-5">
                {/* 키워드 */}
                <div>
                  <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 mb-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>주요 키워드 *</span>
                  </label>
                  <input
                    type="text"
                    name="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    placeholder="예: 치킨 배달, 영어 과외, 웹사이트 제작"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    💡 판매하고 싶은 상품이나 서비스를 입력하세요
                  </p>
                </div>

                {/* 사업명 */}
                <div>
                  <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 mb-2">
                    <Building className="w-4 h-4 text-green-500" />
                    <span>사업명/업체명</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="예: 맛있는치킨집, ABC영어학원, 김철수 개발자"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                  />
                </div>

                {/* 웹사이트 */}
                <div>
                  <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 mb-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span>웹사이트 주소</span>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                  />
                </div>


                {/* 연락처 */}
                <div>
                  <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>연락처</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                  />
                </div>

                {/* 이미지 업로드 */}
                <div>
                  <label className="flex items-center space-x-2 text-base font-semibold text-gray-700 mb-2">
                    <Upload className="w-4 h-4 text-orange-500" />
                    <span>광고 이미지 (선택사항)</span>
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
                    />
                    {formData.adImage && (
                      <div className="relative inline-block">
                        <img 
                          src={formData.adImage} 
                          alt="업로드된 이미지" 
                          className="w-32 h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, adImage: undefined }))}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          type="button"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    📷 JPG, PNG 파일만 지원합니다. 최대 5MB
                  </p>
                </div>

                {/* 신청 버튼들 */}
                <div className="pt-4 space-y-3">
                  {/* 카카오톡 상담 버튼 */}
                  <button
                    onClick={handleKakaoChat}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-lg text-lg transition-colors flex items-center justify-center space-x-2 border-2 border-yellow-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>💬 카카오톡 1:1 상담 (즉시응답)</span>
                  </button>
                  
                  {/* 전문가 대행 신청 버튼 */}
                  <button
                    onClick={handleConsultationRequest}
                    disabled={!formData.keyword}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>🚀 15만원 전문가 대행 신청</span>
                  </button>
                  
                  <div className="text-center text-sm">
                    <p className="text-yellow-600 font-bold">⚡ 카톡상담 → 당일 견적 → 24시간 내 작업시작</p>
                    <p className="text-gray-500 mt-1">승인안되면 100% 환불보장</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 서비스 특징 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
              <div className="text-center mb-6">
                <h4 className="font-bold text-2xl text-red-600 mb-2">🔥 구글애드워즈 광고 승인 전문가</h4>
                <p className="text-lg font-semibold text-gray-900">승인잘되는 홈페이지 제작부터 원스톱 애드워즈 광고승인은 "워프스타"</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3 bg-yellow-50 p-3 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-gray-900">90% 실패하는 이유를 아시나요?</p>
                    <p className="text-sm text-gray-700">홈페이지가 구글 심사 기준을 모르고 만들어졌기 때문입니다</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-800"><strong>유료광고 CPC 낮추는 방법</strong> 노하우 보유</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-800"><strong>비승인 우회방법</strong> 전문가 솔루션 제공</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-800"><strong>승인률 98%</strong> 검증된 홈페이지 제작 노하우</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-800">홈페이지 제작부터 승인까지 <strong>원스톱 서비스</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-5 rounded-lg text-center mb-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold animate-bounce">
                  HOT 🔥
                </div>
                <p className="text-xl font-bold mb-2">💰 오늘만 특가 💰</p>
                <p className="text-2xl font-bold">홈페이지 제작부터 승인까지</p>
                <p className="text-3xl font-bold text-yellow-300">단 15만원!</p>
                <p className="text-sm mt-1 bg-black bg-opacity-20 rounded px-2 py-1 inline-block">
                  ⏰ 남은 시간: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </p>
              </div>
              
              <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
                <p className="text-xl font-bold mb-1">🎯 100% 결과 보장</p>
                <p className="text-lg"><strong>승인안되면 돈 안받습니다!</strong></p>
                <p className="text-sm mt-2 opacity-90">전문가에게 맡기세요. 시간 낭비 하지 마세요.</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 실시간 미리보기 */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <RealTimeAdPreview 
              keyword={formData.keyword}
              website={formData.website}
              businessName={formData.businessName}
              description={formData.description}
              adImage={formData.adImage}
            />

            {/* 고급 분석 */}
            {formData.keyword && (
              <div className="mt-6">
                <AdvancedAnalytics 
                  keyword={formData.keyword}
                  businessName={formData.businessName}
                  website={formData.website}
                />
              </div>
            )}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 text-center border-4 border-yellow-400">
          <div className="animate-pulse">
            <h3 className="text-3xl font-bold mb-2 text-yellow-300">
              ⏰ 지금 바로 신청하세요!
            </h3>
            <p className="text-xl font-bold mb-4">
              더 늦기 전에 전문가에게 맡기세요
            </p>
          </div>
          
          <div className="bg-yellow-400 text-black p-4 rounded-lg mb-6 font-bold relative">
            <div className="absolute top-1 right-1 text-xs bg-red-500 text-white px-2 py-1 rounded animate-pulse">
              {remainingSlots}자리 남음
            </div>
            <p className="text-lg">🔥 오늘만 특가 🔥</p>
            <p className="text-2xl">일반 업체 50만원 → <span className="text-red-600">워프스타 15만원</span></p>
            <p className="text-sm mt-1">승인 실패시 100% 환불!</p>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">종료까지: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm mb-6">
            <div className="flex flex-col items-center">
              <TrendingUp className="w-8 h-8 mb-2" />
              <span className="font-bold">24시간 내</span>
              <span>작업 시작</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 mb-2" />
              <span className="font-bold">98% 승인률</span>
              <span>검증된 노하우</span>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-8 h-8 mb-2" />
              <span className="font-bold">CPC 50%</span>
              <span>광고비 절약</span>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-4 rounded-lg">
            <p className="text-lg font-bold mb-2">⚡ 왜 시간 낭비하시나요?</p>
            <p>직접 하다 실패하면 시간도 돈도 다 잃습니다</p>
            <p className="font-bold text-yellow-300">전문가가 한 번에 해결해드립니다!</p>
          </div>
        </div>

        {/* 전문가 서비스 상세 */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 전문가가 직접 설정하는 필수 요소들
            </h3>
            <p className="text-gray-600">
              일반인은 모르는 구글 애드워즈 고급 설정들을 전문가가 완벽하게 처리합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 광고 확장 기능 */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3">📈 광고 확장 기능</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✅ 광고에 콜아웃 추가</li>
                <li>✅ 구조화된 스니펫 추가</li>
                <li>✅ 서비스 머릿글 추가</li>
                <li>✅ 광고에 사이트링크 추가</li>
              </ul>
            </div>

            {/* 비즈니스 최적화 */}
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 mb-3">🚀 비즈니스 최적화</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✅ 비즈니스 성장 도모하기</li>
                <li>✅ 자동적용 클릭 설정</li>
                <li>✅ 확장검색 키워드 추가</li>
                <li>✅ 클릭수 최대화 입찰 전략</li>
              </ul>
            </div>

            {/* 고급 타겟팅 */}
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3">🎯 고급 타겟팅</h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>✅ CPA 타겟 조정</li>
                <li>✅ 타겟 ROAS 조정</li>
                <li>✅ 디스플레이 네트워크 기능</li>
                <li>✅ 효율적 입찰 전략 수립</li>
              </ul>
            </div>
          </div>

          {/* 차별화 포인트 */}
          <div className="mt-8 bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4 text-center">
              🤔 왜 대부분의 사람들이 실패할까요?
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-100 p-4 rounded border-l-4 border-red-500">
                <h5 className="font-bold text-red-800 mb-2">❌ 일반인의 실수</h5>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 콜아웃, 사이트링크 설정 누락</li>
                  <li>• 구조화된 스니펫 미적용</li>
                  <li>• 잘못된 입찰 전략 선택</li>
                  <li>• CPA/ROAS 타겟 설정 오류</li>
                  <li>• 확장검색 키워드 누락</li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded border-l-4 border-green-500">
                <h5 className="font-bold text-green-800 mb-2">✅ 전문가의 차이</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 모든 확장 기능 완벽 설정</li>
                  <li>• 업종별 최적화된 구조화 스니펫</li>
                  <li>• 데이터 기반 입찰 전략</li>
                  <li>• 성과 목표에 맞는 CPA/ROAS</li>
                  <li>• 롱테일 키워드까지 완벽 커버</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 최종 CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
            <p className="text-lg font-bold mb-2">
              💡 이 모든 것을 15만원에 완벽하게 해드립니다
            </p>
            <p className="text-sm opacity-90">
              혼자 하면 몇 주 걸리고 실패 확률 90% vs 전문가와 함께하면 3일 완성, 성공률 98%
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;