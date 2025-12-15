import 'dotenv/config';
declare const process: any;

import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';

const AUTH_FILE = `${process.cwd()}/auth.json`;

const VALID_ID = process.env.HOGANGNONO_ID;
const VALID_PASSWORD = process.env.HOGANGNONO_PASSWORD;

test.describe('호갱노노 로그인', () => {
    test('유효한 계정으로 로그인 성공해야 한다', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 유효한 아이디/비밀번호로 로그인
        await loginPage.login(VALID_ID, VALID_PASSWORD);

        // 성공 기준: /my 페이지로 이동 가능
        await loginPage.expectLoginSuccess();

        // 성공 시 로그인 세션을 저장하여 다른 테스트(알림 등)에서 재사용
        await page.context().storageState({ path: AUTH_FILE });
    });

    test('잘못된 비밀번호로 로그인 실패해야 한다', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 일부러 틀린 비밀번호 입력
        await loginPage.login(VALID_ID, VALID_PASSWORD + '-wrong');

        // 실패 기준: 에러 문구 노출
        await loginPage.expectLoginFailure();
    });
});


