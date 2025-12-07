import { test } from '@playwright/test';
import { SearchPage } from '../../pages/search/searchPage';

test.describe('호갱노노 검색', () => {
    test('아파트 검색 후 상세 페이지로 이동해야 한다', async ({ page }) => {
        const searchPage = new SearchPage(page);

        // 검색어 입력 및 결과 선택
        await searchPage.searchAndSelect('반포자이', '반포동 반포자이');

        // 성공 기준: apt-detail 요소가 노출되어야 함
        await searchPage.expectSearchSuccess();
    });
});

