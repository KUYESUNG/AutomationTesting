import 'dotenv/config';
declare const process: any;

import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search/searchPage';
import { NotificationPage } from '../../pages/notification/notificationPage';
import { gotoMainPage } from '../../utils/navigation';

// __dirname 경고를 피하기 위해 process.cwd() 기반으로 경로 생성
const AUTH_FILE = `${process.cwd()}/auth.json`;

test.describe('호갱노노 알림 설정/해제', () => {
    test.use({ storageState: AUTH_FILE });

    test('알림 설정 후 해제까지 성공해야 한다', async ({ page }) => {
        const searchPage = new SearchPage(page);
        const notificationPage = new NotificationPage(page);

        // 메인 진입 후 검색 → 상세 페이지 진입
        await gotoMainPage(page);
        await searchPage.searchAndSelect('반포자이', '반포동 반포자이');

        // 알림 설정
        await notificationPage.openNotificationDialog();
        await notificationPage.completeNotificationSetting();
        await notificationPage.expectSettingToast();

        // 알림 해제 (매물/실거래/이야기 모두 해제 후 완료)
        await notificationPage.disableAllNotifications();
        await notificationPage.expectDisabledToast();
    });
});


