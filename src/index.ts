import RingCentral from 'ringcentral-extensible';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL!,
  token: {access_token: process.env.RINGCENTRAL_ACCESS_TOKEN!},
});

(async () => {
  const ext = rc
    .restapi()
    .account()
    .extension(process.env.RINGCENTRAL_EXTENSION_ID!);

  // const extInfo = await ext.get();
  // console.log(extInfo);

  // const phoneNumber = await ext.phoneNumber().get();
  // console.log(phoneNumber);

  // const callLogs = await ext.callLog().list();
  // console.log(JSON.stringify(callLogs, null, 2));

  const callLogs = await ext.callLogSync().get({
    syncType: ['FSync'],
    recordCount: 10,
  });
  // console.log(JSON.stringify(callLogs, null, 2));

  const callLogs2 = await ext.callLogSync().get({
    syncType: ['ISync'],
    recordCount: 10,
    syncToken: callLogs.syncInfo!.syncToken,
  });
  console.log(JSON.stringify(callLogs2, null, 2));
})();
