class MockServiceClass {
  campaignList = []

  constructor() {
    this.initialData()
  }

  initialData() {
    for (let i = 0; i < 30; i++) {
      const obj = {
        id: i + 1,
        name: "Chiến dịch " + (i + 1),
        audioFile: "audio" + (i + 1) + ".wav",
        startDate: "02/01/22",
        endDate: "02/03/22",
        status: 0,
      };
      this.campaignList.push(obj);
    }
  }
  
  getData (params) {
    const returnData = [];
    const pageSize = params.pageSize ? params.pageSize : 10;

    const totalResult = this.campaignList.filter((element) =>
      element.name.includes(params.search)
    );
    for (
      let i = (params.page - 1) * pageSize;
      i < params.page * pageSize;
      i++
    ) {
      returnData.push(totalResult[i]);
    }
    const result = {
      data: returnData,
      total: totalResult.length,
    };

    return result;
  }

  addData (name, audioFile, startDate, endDate) {
    this.campaignList.push({
      id: this.campaignList.length,
      name,
      audioFile,
      startDate,
      endDate,
      status: 0,
    })
  }
};

const MockServe = new MockServiceClass()

export default MockServe;
