export const FlowData = [
  {
    flow_id: 1,
    flow_name: "실시간이벤트전송하기",
    flow_type: 0,
    flow_list: [
      {
        flow_order: 0,
        work_id: 1,
        item_id: 0,
        item_name: "실시간이벤트가져오기",
        properties: {
          kafka_ip: "127.0.0.1",
          kafka_port: 9092,
          topic: "access",
          group_name: "testgroup",
        },
      },
      {
        flow_order: 1,
        work_id: 1,
        item_id: 1,
        item_name: "맵핑하기!!",
        properties: {
          data: [
            {
              ATime: "EventTime",
            },
            {
              DoorName: "DoorName",
            },
            {
              UserName: "USERNAME",
            },
            {
              Way: "Way",
            },
            {
              CardInfo: "CARDDATA",
            },
          ],
        },
      },
      {
        flow_order: 2,
        work_id: 1,
        item_id: 2,
        item_name: "api전송하기",
        properties: {
          url: "http://localhost:8080/rest/v1/event/entry",
          method: "post",
          headers: [
            {
              type: "json",
            },
            {
              time: "utc",
            },
          ],
        },
      },
    ],
  },
];
