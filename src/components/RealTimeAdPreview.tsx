import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Upload,
  X
} from 'lucide-react';

interface RealTimeAdPreviewProps {
  keyword: string;
  website: string;
  businessName: string;
  description: string;
  adImage?: string;
}

interface AdData {
  headline1: string;
  headline2: string;
  headline3: string;
  description1: string;
  description2: string;
  displayUrl: string;
  finalUrl: string;
}

const RealTimeAdPreview: React.FC<RealTimeAdPreviewProps> = ({ 
  keyword, 
  website, 
  businessName, 
  description,
  adImage 
}) => {
  const [adData, setAdData] = useState<AdData>({
    headline1: '',
    headline2: '',
    headline3: '',
    description1: '',
    description2: '',
    displayUrl: '',
    finalUrl: website
  });

  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  // 실시간으로 광고 데이터 생성 (AI 기반)
  useEffect(() => {
    if (keyword || businessName) {
      const generateAdData = () => {
        const domain = website ? (website.startsWith('http') ? new URL(website).hostname : website) : 'example.com';
        
        // AI로 생성된 description이 있으면 사용, 없으면 기본 템플릿
        const desc = description || `최고의 ${keyword || '서비스'} 경험을 약속드립니다.`;
        
        return {
          headline1: keyword ? `${keyword} 전문 서비스` : '전문 서비스',
          headline2: businessName || '믿을 수 있는 업체',
          headline3: '지금 바로 시작하세요',
          description1: desc,
          description2: '무료 상담 받아보세요. 합리적인 가격으로 만나보세요.',
          displayUrl: domain,
          finalUrl: website || 'https://example.com'
        };
      };

      setAdData(generateAdData());
    }
  }, [keyword, website, businessName, description]);

  const getDevicePreview = () => {
    switch (selectedDevice) {
      case 'mobile':
        return (
          <div className="w-full max-w-sm mx-auto">
            {/* 모바일 구글 검색 결과 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* 모바일 헤더 */}
              <div className="bg-gray-50 px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">광고</span>
                  </div>
                  <div className="text-xs text-gray-500">모바일</div>
                </div>
              </div>

              {/* 광고 내용 */}
              <div className="p-4">
                {/* 이미지가 있으면 표시 */}
                {adImage && (
                  <div className="mb-3">
                    <img 
                      src={adImage} 
                      alt="광고 이미지" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="mb-2">
                  <div className="text-blue-600 text-lg font-medium line-clamp-2">
                    {adData.headline1} | {adData.headline2}
                  </div>
                  <div className="text-green-700 text-sm mt-1">
                    {adData.displayUrl}
                  </div>
                </div>
                
                <div className="text-gray-700 text-sm leading-relaxed">
                  {adData.description1} {adData.description2}
                </div>

                {/* 모바일 광고 확장 */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    <Phone className="w-3 h-3 mr-1" />
                    전화하기
                  </div>
                  <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3 mr-1" />
                    길찾기
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tablet':
        return (
          <div className="w-full max-w-2xl mx-auto">
            {/* 태블릿 구글 검색 결과 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">광고</span>
                  </div>
                  <div className="text-xs text-gray-500">태블릿</div>
                </div>
              </div>

              <div className="p-6">
                {/* 이미지가 있으면 표시 */}
                {adImage && (
                  <div className="mb-4">
                    <img 
                      src={adImage} 
                      alt="광고 이미지" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <div className="text-blue-600 text-xl font-medium">
                    {adData.headline1} - {adData.headline2} - {adData.headline3}
                  </div>
                  <div className="text-green-700 text-base mt-1">
                    {adData.displayUrl}
                  </div>
                </div>
                
                <div className="text-gray-700 leading-relaxed mb-4">
                  {adData.description1} {adData.description2}
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4 mr-1" />
                    전화하기
                  </button>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <MapPin className="w-4 h-4 mr-1" />
                    길찾기
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default: // desktop
        return (
          <div className="w-full max-w-2xl mx-auto">
            {/* 데스크톱 구글 검색 결과 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* 광고 표시 */}
              <div className="bg-gray-50 px-6 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">광고</span>
                  </div>
                  <div className="text-xs text-gray-500">데스크톱</div>
                </div>
              </div>

              {/* 광고 내용 */}
              <div className="p-6">
                {/* 이미지가 있으면 표시 */}
                {adImage && (
                  <div className="mb-4">
                    <img 
                      src={adImage} 
                      alt="광고 이미지" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="text-blue-600 text-2xl font-medium hover:underline cursor-pointer">
                    {adData.headline1} - {adData.headline2} - {adData.headline3}
                  </div>
                  <div className="text-green-700 text-lg mt-1">
                    {adData.displayUrl}
                  </div>
                </div>
                
                <div className="text-gray-700 text-base leading-relaxed mb-4">
                  {adData.description1} {adData.description2}
                </div>

                {/* 광고 확장 기능 */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>전화: 010-1234-5678</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>서울시 강남구</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>영업시간: 09:00-18:00</span>
                  </div>
                </div>

                {/* 사이트링크 */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">서비스 소개</div>
                    <div className="text-gray-600 text-xs mt-1">전문 서비스 상세 정보</div>
                  </div>
                  <div>
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">가격 안내</div>
                    <div className="text-gray-600 text-xs mt-1">합리적인 가격 정책</div>
                  </div>
                  <div>
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">고객 후기</div>
                    <div className="text-gray-600 text-xs mt-1">만족한 고객들의 이야기</div>
                  </div>
                  <div>
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">무료 상담</div>
                    <div className="text-gray-600 text-xs mt-1">지금 바로 문의하세요</div>
                  </div>
                </div>

                {/* 별점 및 리뷰 */}
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">4.8 (127개 리뷰)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">🔍 실시간 광고 미리보기</h3>
        
        {/* 기기 선택 버튼 */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedDevice('desktop')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDevice === 'desktop' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>데스크톱</span>
          </button>
          
          <button
            onClick={() => setSelectedDevice('tablet')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDevice === 'tablet' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>태블릿</span>
          </button>
          
          <button
            onClick={() => setSelectedDevice('mobile')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDevice === 'mobile' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>모바일</span>
          </button>
        </div>
      </div>

      {/* 미리보기 영역 */}
      <div className="bg-gray-50 p-6 rounded-lg min-h-[400px] flex items-center justify-center">
        {keyword || website ? (
          getDevicePreview()
        ) : (
          <div className="text-center text-gray-500">
            <Globe className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">키워드나 웹사이트를 입력하세요</p>
            <p className="text-sm">입력하시면 실시간으로 광고 미리보기가 표시됩니다</p>
          </div>
        )}
      </div>

      {/* 광고 성과 예측 */}
      {(keyword || website) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">📊 예상 성과</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600">150-300</div>
              <div className="text-gray-600">일일 클릭 수</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">₩150-800</div>
              <div className="text-gray-600">클릭당 단가</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600">3.2%</div>
              <div className="text-gray-600">전환율</div>
            </div>
          </div>
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-700">
              ⚠️ CPC 값은 예상치이며 정확하지 않습니다. 실제 결과는 키워드 경쟁도, 품질점수, 입찰가 등에 따라 달라집니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAdPreview;