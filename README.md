# 구글 애드워즈 대행 서비스

키워드만 입력하면 전문가가 직접 Google Ads 광고를 설정해드리는 대행 서비스입니다.

## 🎯 서비스 개요

복잡한 Google Ads 설정이 어려운 사업자분들을 위해 만든 **AI 키워드 분석** + **전문가 직접 대행** 서비스입니다.

### 주요 특징
- **AI 키워드 분석**: 입력한 키워드를 AI가 즉시 분석하여 최적의 광고 전략 제안
- **1:1 맞춤 상담**: 텔레그램, 카카오톡을 통한 편리한 전문가 상담
- **전문가 직접 관리**: 계정 설정부터 최적화까지 모든 것을 전문가가 관리
- **성과 보장**: 데이터 기반 최적화로 광고 성과 지속 개선

## 🚀 서비스 프로세스

1. **키워드 분석**: AI가 키워드를 분석하여 최적의 광고 전략 제안
2. **1:1 상담**: 전문가와 직접 상담하여 맞춤형 광고 전략 확정  
3. **광고 대행**: 전문가가 직접 계정 설정부터 광고 운영까지 모든 것을 관리

## 💻 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** - 현대적인 UI 디자인
- **Lucide React** - 아이콘 라이브러리
- **Vite** - 빠른 개발 환경

### 주요 컴포넌트
- `App.tsx` - 메인 애플리케이션 컴포넌트
- `KeywordAnalysis.tsx` - AI 키워드 분석 결과 표시
- `ConsultationForm.tsx` - 1:1 상담 신청 폼

## 🛠 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 빌드 미리보기
```bash
npm run preview
```

## 📱 주요 기능

### AI 키워드 분석
- 입력한 키워드 기반 관련 키워드 자동 생성
- 타겟 고객층 분석
- 경쟁 강도 및 예상 CPC 분석  
- 업계 트렌드 및 인사이트 제공
- AI 생성 광고 문구 예시

### 1:1 상담 시스템
- 텔레그램/카카오톡/전화 선택 가능
- 안전한 개인정보 처리 (민감 정보는 온라인 미수집)
- 24시간 내 전문가 연락 보장
- 무료 상담 제공

### 보안 기능
- 카드 정보나 계정 비밀번호는 온라인으로 절대 수집하지 않음
- 모든 민감한 정보는 1:1 상담 후 안전한 방법으로 전달

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **직관적 인터페이스**: 비전문가도 쉽게 사용할 수 있는 간단한 UI
- **실시간 피드백**: 사용자 행동에 따른 즉각적인 피드백 제공
- **시각적 데이터**: 차트와 그래프로 분석 결과 직관적 표시

## 🔧 커스터마이징

### 환경 변수
`.env` 파일 생성하여 다음 변수들 설정:

```env
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_API_BASE_URL=your-backend-api-url
```

### 키워드 분석 로직 수정
`src/components/KeywordAnalysis.tsx`의 `generateMockAnalysis` 함수에서 키워드별 분석 데이터를 커스터마이징할 수 있습니다.

## 📊 분석 데이터 구조

```typescript
interface AnalysisResult {
  relatedKeywords: string[];        // 관련 키워드 목록
  suggestedBudget: {               // 권장 예산
    min: number;
    max: number; 
    recommended: number;
  };
  targetAudience: string[];        // 타겟 고객층
  competitionLevel: 'low' | 'medium' | 'high';  // 경쟁 강도
  expectedCPC: {                   // 예상 CPC
    min: number;
    max: number;
  };
  adSuggestions: {                 // 광고 문구 제안
    headline: string;
    description: string;
  }[];
  industryInsights: string[];      // 업계 인사이트
}
```

## 🚀 배포 가이드

### Vercel 배포
```bash
npm run build
# Vercel CLI 또는 GitHub 연동으로 배포
```

### Netlify 배포  
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 📞 연락처

서비스 관련 문의:
- 전화: 010-1234-5678
- 텔레그램: @your_telegram
- 이메일: contact@example.com

## 🔮 향후 계획

- [ ] 실제 Google Ads API 연동
- [ ] 고객 관리 시스템 구축
- [ ] 성과 리포트 자동화
- [ ] 다국어 지원
- [ ] 모바일 앱 개발

---

**구글 애드워즈 대행 서비스** - 복잡한 광고 설정은 전문가에게, 성과는 확실하게! 🎯