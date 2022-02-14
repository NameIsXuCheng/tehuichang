import AgoraMeetingSDK from 'agora-meeting-sdk';
import { RtmTokenBuilder, RtmRole } from 'agora-access-token';
import MD5 from 'js-md5';

//  Please enter your appId
const appId = '700050eaaa2945088914a01c1bb39c9d';
//  Please enter your appCertificate
const appCertificate = '659e1cd801f947bb9817d883ded0f855';

//  Please enter any userName
const userName = 'user';
const userId = MD5(userName);

// Please enter any roomName
const roomName = '123456qwa';
const roomId = MD5(roomName);

const token = RtmTokenBuilder.buildToken(
  appId,
  appCertificate,
  userId,
  RtmRole.Rtm_User,
  0,
);

export default class App {
  constructor(elem) {
    if (!elem) return;
    this.elem = elem;
  }
  setupMeeting() {
    AgoraMeetingSDK.init({
      appId: appId,
    });
    AgoraMeetingSDK.launch(document.querySelector(`#${this.elem.id}`), {
      token: token,
      userName: userName,
      userId: userId,
      roomName: roomName,
      roomId: roomId,
      roomPassword: '',
      pretest: true,
      duration: 7200, //12个小时
      totalPeople: 1000,
      openCamera: true,
      openMic: true,
      userInOutNotificationLimitCount: 50,
      recordUrl: 'https://webdemo.agora.io/agorameeting/test/dev_apaas_meeting_1.0.1/record_page',
      listener: (evt) => {
        console.log('evt', evt);
      },
    });
  }
}
