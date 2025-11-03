export const AccessEvent = {
    EventTime: "",          // 이벤트 발생 시간
    MainControllerId: "",   // 주장치 ID
    MainControllerName: "", // 주장치 이름
    ControllerNo: "",       // 컨트롤러 번호
    ControllerName: "",     // 컨트롤러 이름
    ConsoleNo: "",          // 인식기 번호
    ConsoleName: "",        // 인식기 이름
    DoorName: "",           // 출입문 이름
    DoorNo: "",             // 출입문 번호
    RESULT: "",             // 인증결과(0: 실패, 1: 성공, 2: 마스터)
    USER_TYPE: "",          // 사용자 타입(100: 임직원, 200: 방문자, 300: 관리자)
    USERNAME: "",           // 사용자 이름
    UserRemark: "",         // 사용자 비고
    ConsoleRemark: "",      // 인식기 비고
    CARDDATA: "",           // 카드번호(16자리)
    ACCESS_TYPE: "",        // 출입 타입(0:출입, 1:급식, 2:출근 3: 퇴근 4:외출 5:복귀 7/11:메뉴1 8/12:메뉴2 9/13:메뉴3 10/14:메뉴4 15:엘리베이터 16:순찰, 0x20:응급Acess(Only DX) 0x30: 경비중출입)
    FailureCode: "",        // 실패코드
    OrganizationId: "",     // 조직 ID
    Organization: "",       // 조직 이름
    MemberID: "",           // 사번
    Door_DID: "",           // 출입문 ID
    Site_SID: "",           // 사이트 ID
    ControllerID: "",       // 장치 ID
    ConsoleID: "",          // 인식기 ID
    Way: "",                // 출입인증방식(0:카드, 1: 지문, 5: 얼굴, 6: 모바일)
    Temperature: "",        // 체온
    ImageSID: "",           // 출입 이미지 ID
    ERROR_MSG: "",          // 에러 메시지
    nMask: ""               // 마스크 여부 (1: 마스크 착용, -1: 마스크 미착용, 0: 측정값 없음)
    
}