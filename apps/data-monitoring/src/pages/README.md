| Layer          | 참조 가능한 레이어                     | 설명                                      |
|----------------|---------------------------------------|-------------------------------------------|
| app            | shared, entities, features, widgets, pages, processes | 애플리케이션 시작점, 전역 설정(라우터, 스타일 등) 관리. |
| pages          | shared, entities, features, widgets  | 앱의 개별 페이지 포함.                    |
| widgets        | shared, entities, features           | 재사용 가능한 UI 컴포넌트.                |
| features       | shared, entities                    | 비즈니스 기능(좋아요, 리뷰 등) 구현, 선택적. |
| entities       | shared                              | 비즈니스 데이터(사용자, 리뷰 등) 정의, 선택적. |
| shared         | -                                    | 로직과 무관한 공통 컴포넌트 및 유틸리티 제공. |

이 레이어에는 애플리케이션의 페이지가 포함됩니다.