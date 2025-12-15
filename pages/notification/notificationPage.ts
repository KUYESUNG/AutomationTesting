import { Page, expect } from '@playwright/test';

export class NotificationPage {
    constructor(private readonly page: Page) { }

    // 알림 설정 진입 버튼
    get notifyButton() {
        return this.page.getByRole('button', { name: '알림설정', exact: true });
    }

    // 완료 버튼
    get completeButton() {
        return this.page.getByRole('button', { name: '알림 설정 완료하기' });
    }

    // 해제 시 선택할 옵션들
    get saleButton() {
        // 동일한 이름을 가진 버튼이 여러 개 있을 수 있어 첫 번째 매칭만 사용
        return this.page.getByRole('button', { name: '매물', exact: true }).first();
    }

    get tradeButton() {
        return this.page.getByRole('button', { name: '실거래' });
    }

    get storyButton() {
        return this.page.getByRole('button', { name: '이야기' });
    }

    async openNotificationDialog() {
        await this.notifyButton.click();
    }

    async completeNotificationSetting() {
        await this.completeButton.click();
    }

    async expectSettingToast() {
        await expect(
            this.page.getByText('알림 설정이 완료 되었습니다.', { exact: false }).first()
        ).toBeVisible();
    }

    async disableAllNotifications() {
        await this.notifyButton.click();
        await this.saleButton.click();
        await this.tradeButton.click();
        await this.storyButton.click();
        await this.completeButton.click();
    }

    async expectDisabledToast() {
        await expect(
            this.page.getByText('알림을 받지 않습니다.', { exact: false }).first()
        ).toBeVisible();
    }
}


