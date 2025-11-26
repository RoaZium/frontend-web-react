export const methodList = [
  {
    value: "GET",
  },
  {
    value: "POST",
  },
  {
    value: "CONNECT",
  },
  {
    value: "HEAD",
  },
  {
    value: "PUT",
  },
  {
    value: "DELETE",
  },
  {
    value: "OPTIONS",
  },
];

export const callList = [
  {
    value: 1,
    label: "텍스트 변수로 가져오기(웹 페이지의 경우)",
  },
  {
    value: 2,
    label: "디스크에 저장(파일의 경우)",
  },
];

export const menuDataList = {
  id: "root",
  name: "FlowService",
  children: [
    {
      id: 1,
      name: "실시간",
      children: [
        {
          id: 4,
          name: "출입",
        },
        {
          id: 5,
          name: "출입문",
        },
        {
          id: 6,
          name: "파티션(경비)",
        },
        {
          id: 7,
          name: "경보(알람)",
        },
      ],
    },
    {
      id: 2,
      name: "이력",
      children: [
        {
          id: 8,
          name: "근태",
        },
        {
          id: 9,
          name: "식수",
        },
        {
          id: 10,
          name: "출입",
        },
        {
          id: 11,
          name: "경보",
        },
      ],
    },
    {
      id: 3,
      name: "HTTP",
      children: [
        {
          id: 12,
          name: "웹 서비스 호출",
        },
      ],
    },
  ],
};
