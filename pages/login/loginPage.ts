import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginDropdownButton: Locator;
    readonly loginButtonInHeader: Locator;
    readonly otherLoginMethodButton: Locator;
    readonly idInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // 상단 로그인 영역 및 버튼들 (codegen에서 추출된 셀렉터 그대로 사용)
        this.loginDropdownButton = page.locator('.css-1f4xy77');
        this.loginButtonInHeader = page.getByTitle('로그인');
        this.otherLoginMethodButton = page.locator('span:nth-child(3) > .css-0');

        // 입력 필드
        this.idInput = page.getByPlaceholder('아이디 (휴대전화/이메일)');
        this.passwordInput = page.getByPlaceholder('비밀번호');

        // 로그인 버튼 (폼 안 텍스트 기준)
        this.submitButton = page.locator('form').getByText('로그인');
    }

    async goto() {
        await this.page.goto('https://hogangnono.com/');
    }

    async openLoginForm() {
        await this.loginDropdownButton.click();
        await this.loginButtonInHeader.click();
        await this.otherLoginMethodButton.click();
    }

    async fillCredentials(id: string, password: string) {
        await this.idInput.fill(id);
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }

    /**
     * 전체 로그인 플로우를 한 번에 수행
     */
    async login(id: string, password: string) {
        await this.goto();
        await this.openLoginForm();
        await this.fillCredentials(id, password);
        await this.submit();
    }

    /**
     * 로그인 성공 시: 마이페이지로 진입 가능한지 검증
     * - 요구사항: 로그인 성공 후 `await page.goto('https://hogangnono.com/my');` 로 이동 가능해야 함
     */
    async expectLoginSuccess() {
        await this.page.goto('https://hogangnono.com/my');
        await expect(this.page).toHaveURL(/\/my/);
    }

    /**
     * 로그인 실패 시: 에러 문구 노출 여부 검증
     * - 요구사항: `아이디나 비밀번호가 올바르지 않습니다. (실패횟수:` 텍스트가 화면에 보여야 함
     */
    async expectLoginFailure() {
        await expect(
            this.page.getByText('아이디나 비밀번호가 올바르지 않습니다. (실패횟수:')
        ).toBeVisible();
    }
}


