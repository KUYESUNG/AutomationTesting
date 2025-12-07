import { Page } from '@playwright/test';

/**
 * 호갱노노 메인 페이지로 이동하는 공통 함수
 * @param page - Playwright Page 객체
 */
export async function gotoMainPage(page: Page): Promise<void> {
    await page.goto('https://hogangnono.com/');
}

